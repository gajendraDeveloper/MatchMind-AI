import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Instantiate the Gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { resumeText, jobDesc } = await req.json();

        if (!resumeText || !jobDesc) {
            return NextResponse.json(
                { error: "Resume text and job description are required" },
                { status: 400 }
            );
        }

        const prompt = `
You are an expert AI recruiter. Your task is to analyze the following resume against the provided job description and extract key insights.
You must return your analysis strictly as a JSON object with the following schema:

{
  "score": <number 0-100 representing the overall match percentage>,
  "ats_score": <number 0-100 representing Keyword Optimization/ATS Score>,
  "matched_skills": [<array of string, list of skills from the job description that the resume explicitly mentions>],
  "missing_skills": [<array of string, list of critical skills from the job description that the resume lacks>],
  "improvement_suggestions": [<array of strings, actionable advice on how to improve the resume for this role>],
  "skill_radar": [
    { "skill": "Frontend", "value": <number 0-100> },
    { "skill": "Backend", "value": <number 0-100> },
    { "skill": "Databases", "value": <number 0-100> },
    { "skill": "Soft Skills", "value": <number 0-100> },
    { "skill": "DevOps/Tools", "value": <number 0-100> }
  ],
  "experience_analysis": [
    { "year": "<string, e.g., '2020'>", "value": <number 1-10, representing responsibility or skill level> },
    { "year": "<string, e.g., '2021'>", "value": <number 1-10> }
    // generate a brief chronological timeline based on the resume
  ],
  "summary": "<string, a 2-3 sentence summary of the candidate's fit for the role>",
  "interview_questions": [<array of strings, 10-15 interview questions based on the job description and resume to help the candidate prepare>]
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDesc}
`;

        // Helper for retry logic
        const fetchGenerate = async (retries = 3, backoff = 1000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    return await ai.models.generateContent({
                        model: "gemini-2.5-flash-lite", // Using lite version for better availability
                        contents: prompt,
                        config: {
                            responseMimeType: "application/json",
                            temperature: 0,
                        }
                    });
                } catch (error: any) {
                    const isBusy = error.status === 503 || error.message?.includes("high demand") || error.status === 429;
                    if (isBusy && i < retries - 1) {
                        await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
                        continue;
                    }
                    throw error;
                }
            }
            throw new Error("Failed to reach Gemini after retries");
        };

        const response = await fetchGenerate();
        if (!response) throw new Error("No response from Gemini");

        const dataStr = response.text;
        if (!dataStr) {
            throw new Error("Failed to generate analysis from Gemini");
        }

        const jsonAnalysis = JSON.parse(dataStr);
        return NextResponse.json(jsonAnalysis);

    } catch (error: any) {
        let errorMessage = error.message || "Failed to analyze resume";
        try {
            // If the error message is a JSON string (common with Gemini SDK), parse it for a cleaner response
            const parsed = JSON.parse(errorMessage);
            if (parsed.error?.message) errorMessage = parsed.error.message;
        } catch (e) {
            // Not a JSON string, keep original
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: error.status || 500 }
        );
    }
}

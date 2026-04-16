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
  "summary": "<string, a 2-3 sentence summary of the candidate's fit for the role>"
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDesc}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0, // Set to 0 for completely deterministic analysis
            }
        });

        const dataStr = response.text;
        if (!dataStr) {
            throw new Error("Failed to generate analysis from Gemini");
        }

        const jsonAnalysis = JSON.parse(dataStr);
        return NextResponse.json(jsonAnalysis);

    } catch (error: any) {
        console.error("Analysis API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to analyze resume" },
            { status: 500 }
        );
    }
}

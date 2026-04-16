"use client";

import React, { useState } from "react";
import { parsePDF, parseDOCX } from "@/utils/parser";
import toast from "react-hot-toast";

import FileUpload from "./FileUpload";
import JobDescriptionBox from "./JobDescriptionBox";
import AnalyzeButton from "./AnalyzeButton";
import { useRouter } from "next/navigation";
import { Target, FileSearch, Lightbulb } from "lucide-react";
import ScoreChart from "./charts/ScoreChart";
import SkillsPieChart from "./charts/SkillsPieChart";
import ExperienceChart from "./charts/ExperienceChart";

const dummyResult = {
    score: 85,
    ats_score: 92,
    matched_skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    missing_skills: ["GraphQL", "AWS"],
    experience_analysis: [
        { year: "2019", value: 3 },
        { year: "2020", value: 5 },
        { year: "2021", value: 6 },
        { year: "2022", value: 8 },
        { year: "2023", value: 9 },
    ]
};

const ResumeAnalyzer = () => {
    const router = useRouter();
    const [resumeText, setResumeText] = useState("");
    const [fileName, setFileName] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (file: File) => {
        setFileName(file.name);

        try {
            let text = "";

            if (file.type === "application/pdf") {
                text = await parsePDF(file);
            } else if (file.type.includes("wordprocessingml.document")) {
                text = await parseDOCX(file);
            } else {
                text = await file.text();
            }

            setResumeText(text);
        } catch (error) {
            console.error("File parse error:", error);
            toast.error("Failed to parse file. Please make sure the file is valid and try again.");
            setFileName("");
            setResumeText("");
        }
    };

    const analyzeResume = async () => {
        if (!resumeText || !jobDesc) return;

        setLoading(true);

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDesc }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server returned ${res.status}: ${errorText}`);
            }

            const data = await res.json();

            if (typeof window !== "undefined") {
                localStorage.setItem("lastAnalysis", JSON.stringify(data));
            }

            toast.success("Resume analyzed successfully!");
            router.push("/result");
        } catch (err: any) {
            console.error(err);
            toast.error("Failed to analyze resume:" + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-mono md:text-4xl font-extrabold text-ternary drop-shadow-sm">
                    AI Resume Analyzer
                </h1>
                <p className="text-muted-foreground font-medium">
                    Upload your resume and the job description to analyze the match
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch pt-4">
                <FileUpload
                    fileName={fileName}
                    onUpload={handleFileUpload}
                />

                <JobDescriptionBox
                    value={jobDesc}
                    onChange={setJobDesc}
                />
            </div>

            <AnalyzeButton
                loading={loading}
                onClick={analyzeResume}
            />

            {/* Features Preview Section */}
            <div className="mt-24 pt-16 border-t border-border">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-extrabold text-foreground">What's Inside Your Report?</h2>
                    <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
                        Get deep, actionable insights on your resume. We simulate an advanced ATS system
                        to give you the exact metrics recruiters see.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-ternary mb-6 font-bold shadow-inner border border-secondary/20">
                            <Target size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Match & ATS Score</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            See exactly how well your resume matches the job description with our precise compatibility scoring.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-ternary mb-6 font-bold shadow-inner border border-secondary/20">
                            <FileSearch size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Skill Gap Analysis</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We instantly identify missing critical skills and keywords that are crucial for getting past automated screening filters.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-ternary mb-6 font-bold shadow-inner border border-secondary/20">
                            <Lightbulb size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Actionable Suggestions</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Receive highly tailored, step-by-step advice on how to tweak your bullet points and impact statements.
                        </p>
                    </div>
                </div>

                {/* Dummy Charts Preview Section */}
                <div className="mt-20 relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
                    {/* Overlay to give it a"preview"vibe */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none flex items-end justify-center pb-10 z-10">
                        <span className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-bold shadow-xl tracking-wide flex items-center gap-2">
                            Example Report Dashboard
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pb-12">
                        {/* Score */}
                        <ScoreChart score={dummyResult.score} />

                        {/* ATS Score */}
                        <div className="p-6 rounded-2xl border border-border shadow bg-card flex flex-col items-center">
                            <h3 className="font-semibold mb-2 self-start w-full text-foreground">Keyword Optimization</h3>
                            <div className="flex-1 flex flex-col justify-center items-center w-full">
                                <p className="text-5xl font-extrabold text-ternary">
                                    {dummyResult.ats_score}<span className="text-2xl">%</span>
                                </p>
                                <p className="text-sm text-muted-foreground font-medium mt-3">ATS Compatibility</p>

                                <div className="w-full bg-background rounded-full h-3 mt-6 overflow-hidden border border-border">
                                    <div
                                        className="bg-ternary h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${dummyResult.ats_score}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <SkillsPieChart
                            matched={dummyResult.matched_skills}
                            missing={dummyResult.missing_skills}
                        />

                        {/* Experience */}
                        <ExperienceChart data={dummyResult.experience_analysis} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;

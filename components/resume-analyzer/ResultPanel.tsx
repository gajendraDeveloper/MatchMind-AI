"use client";

import React, { useRef } from"react";
import SkillTags from"./SkillTags";
import SummaryBox from"./SummaryBox";
import ScoreChart from"./charts/ScoreChart";
import SkillsPieChart from"./charts/SkillsPieChart";
import RadarSkillChart from"./charts/RadarSkillChart";
import ExperienceChart from"./charts/ExperienceChart";
import { Download } from"lucide-react";
import toast from"react-hot-toast";
import InterviewQuestions from "./InterviewQuestions";


type Props = {
 result: any;
};

const ResultPanel = ({ result }: Props) => {
 const printRef = useRef<HTMLDivElement>(null);

 const downloadPDF = async () => {
 const element = printRef.current;
 if (!element) return;

        const loadingToast = toast.loading("Generating PDF...");

        try {
            const html2canvasModule = (await import("html2canvas"));
            const html2canvas = html2canvasModule.default || html2canvasModule;
            const jsPDFModule = (await import("jspdf"));
            const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;

            // Small delay to ensure charts (especially Recharts animations) are fully rendered
            await new Promise(resolve => setTimeout(resolve, 800));

            const canvas = await html2canvas(element as HTMLElement, { 
                scale: 2, 
                useCORS: true,
                backgroundColor: "#1b1d1a",
                logging: false,
            });
            const imgData = canvas.toDataURL("image/png");
            
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
 
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Resume_Analysis_Report.pdf");
 
 toast.dismiss(loadingToast);
 toast.success("PDF downloaded successfully!");
 } catch (err) {
            toast.dismiss(loadingToast);
            console.error("PDF generation fell back to browser print:", err);
            setTimeout(() => window.print(), 200);
        }
 };

 if (!result) return null;

    return (
        <div className="space-y-6 pb-20">
            <div className="flex justify-end print:hidden">
                <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 bg-gradient-to-r from-secondary to-ternary hover:from-ternary hover:to-secondary text-background px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    <Download size={20} />
                    Download Report PDF
                </button>
            </div>

            <div ref={printRef} className="grid md:grid-cols-2 gap-6 bg-card p-4 sm:p-8 rounded-3xl shadow-sm border border-border">
                
                {/* Score */}
                <ScoreChart score={result.score} />

                {/* ATS Score */}
                {result.ats_score !== undefined && (
                    <div className="p-6 rounded-2xl shadow bg-card border border-border flex flex-col items-center">
                        <h3 className="font-semibold mb-2 self-start w-full text-foreground">Keyword Optimization</h3>
                        <div className="flex-1 flex flex-col justify-center items-center w-full">
                            <p className="text-5xl font-extrabold text-ternary">
                                {result.ats_score}<span className="text-2xl">%</span>
                            </p>
                            <p className="text-sm text-muted-foreground font-medium mt-3">ATS Compatibility</p>
                            
                            <div className="w-full bg-background border border-border rounded-full h-3 mt-6 overflow-hidden">
                                <div 
                                    className="bg-ternary h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${result.ats_score}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

 {/* Pie Chart */}
 <SkillsPieChart
 matched={result.matched_skills || []}
 missing={result.missing_skills || []}
 />

 {/* Radar */}
 <RadarSkillChart data={result.skill_radar || []} />

 {/* Experience */}
 <ExperienceChart data={result.experience_analysis || []} />

 {/* Skills */}
 <SkillTags
 matched={result.matched_skills || []}
 missing={result.missing_skills || []}
 />

 {/* Summary */}
 <div className="md:col-span-2">
 <SummaryBox summary={result.summary} />
 </div>

                {/* Improvement Suggestions */}
                {result.improvement_suggestions && result.improvement_suggestions.length > 0 && (
                    <div className="md:col-span-2 p-6 rounded-2xl shadow bg-secondary/10 border-l-4 border-ternary">
                        <h3 className="font-semibold text-ternary mb-4 whitespace-nowrap text-lg">
                            Actionable Advice to Improve
                        </h3>
                        <ul className="list-disc pl-6 space-y-3 text-foreground">
                            {result.improvement_suggestions.map((sug: string, i: number) => (
                                <li key={i} className="leading-relaxed">{sug}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Interview Questions */}
                <InterviewQuestions questions={result.interview_questions} />
            </div>

 </div>
 );
};

export default ResultPanel;
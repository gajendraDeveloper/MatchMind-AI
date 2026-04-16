"use client";

import React, { useEffect, useState } from "react";
import ResultPanel from "@/components/resume-analyzer/ResultPanel";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ShimmerLoader from "@/components/ShimmerLoader";

export default function ResultPage() {
    const [result, setResult] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("lastAnalysis");
        if (stored) {
            setResult(JSON.parse(stored));
        } else {
            router.push("/");
        }
    }, [router]);

    if (!result) return <ShimmerLoader />;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-3xl shadow-sm border border-border">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 text-ternary hover:text-secondary font-medium transition-colors bg-secondary/10 hover:bg-secondary/20 px-4 py-2 rounded-xl"
                >
                    <ArrowLeft size={20} /> Back to Scanner
                </button>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex-1 sm:text-right">
                    AI-Powered Career Report
                </h1>
            </div>
            <ResultPanel result={result} />
        </div>
    );
}

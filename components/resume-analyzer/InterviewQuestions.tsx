"use client";

import React from "react";
import { MessageSquareText } from "lucide-react";

type Props = {
    questions: string[];
};

const InterviewQuestions = ({ questions }: Props) => {
    if (!questions || questions.length === 0) return null;

    return (
        <div className="md:col-span-2 p-6 rounded-3xl shadow-sm bg-card border border-border">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-ternary/10 rounded-xl flex items-center justify-center text-ternary">
                    <MessageSquareText size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                    Recommended Interview Questions
                </h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
                {questions.map((question, index) => (
                    <div 
                        key={index} 
                        className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-ternary/30 transition-colors group"
                    >
                        <div className="flex gap-3">
                            <span className="text-ternary font-bold text-sm mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <p className="text-foreground/90 font-medium leading-relaxed">
                                {question}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewQuestions;

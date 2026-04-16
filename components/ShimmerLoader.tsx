"use client";

import React from "react";

export default function ShimmerLoader() {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8 w-full animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-3xl shadow-sm border border-border">
                <div className="h-10 w-32 bg-secondary/20 rounded-xl"></div>
                <div className="h-8 w-1/3 bg-secondary/20 rounded-xl"></div>
            </div>
            
            <div className="flex justify-end">
                <div className="h-12 w-48 bg-secondary/20 rounded-2xl"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-card p-4 sm:p-8 rounded-3xl shadow-sm border border-border">
                {/* Score Placeholder */}
                <div className="md:col-span-2 h-[300px] bg-secondary/10 rounded-2xl"></div>
                
                {/* Two smaller charts */}
                <div className="h-[250px] bg-secondary/10 rounded-2xl"></div>
                <div className="h-[250px] bg-secondary/10 rounded-2xl"></div>
                
                {/* Large sections */}
                <div className="md:col-span-2 h-[200px] bg-secondary/10 rounded-2xl"></div>
                <div className="md:col-span-2 h-[150px] bg-secondary/10 rounded-2xl"></div>
            </div>
        </div>
    );
}

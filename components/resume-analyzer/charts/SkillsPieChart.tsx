"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#c7a97c", "#4e534c"];

const SkillsPieChart = ({
    matched,
    missing
}: {
    matched: string[];
    missing: string[];
}) => {
    const data = [
        { name: "Matched", value: matched.length },
        { name: "Missing", value: missing.length }
    ];

    return (
        <div className="p-6 rounded-2xl shadow bg-card border border-border">
            <h3 className="font-semibold mb-4 text-foreground">Skills Breakdown</h3>

            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data} dataKey="value" outerRadius={80} stroke="none">
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: "#222521", color: "#ffffff", border: "1px solid #333631" }} 
                        itemStyle={{ color: "#ffffff" }}
                    />
                </PieChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center gap-6 mt-2 pb-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-ternary"></div>
                    <span className="text-sm font-medium text-foreground">Matched: {matched.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <span className="text-sm font-medium text-foreground">Missing: {missing.length}</span>
                </div>
            </div>
        </div>
    );
};

export default SkillsPieChart;
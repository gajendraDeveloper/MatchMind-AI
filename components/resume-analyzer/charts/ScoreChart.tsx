"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const ScoreChart = ({ score }: { score: number }) => {
    // Generate data for a half pie chart (gauge)
    const data = [
        { name: "Score", value: score },
        { name: "Remaining", value: 100 - score }
    ];

    const getColor = (val: number) => {
        if (val >= 80) return "#c7a97c"; /* ternary gold */
        if (val >= 60) return "#9b8664"; /* secondary gold */
        return "#4e534c"; /* muted */
    };

    const COLORS = [getColor(score), "#1b1d1a"]; // background track

    return (
        <div className="p-6 rounded-2xl shadow bg-card border border-border flex flex-col">
            <h3 className="font-semibold mb-4 text-left text-foreground">Match Score</h3>

            <div className="relative w-full h-[180px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={100}
                            outerRadius={130}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: "#222521", color: "#ffffff", border: "1px solid #333631" }} 
                            itemStyle={{ color: "#ffffff" }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Score text positioned in the center of the gauge arc */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-2">
                    <p className="text-5xl font-extrabold text-ternary">
                        {score}<span className="text-2xl">%</span>
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Match Level</p>
                </div>
            </div>
        </div>
    );
};

export default ScoreChart;
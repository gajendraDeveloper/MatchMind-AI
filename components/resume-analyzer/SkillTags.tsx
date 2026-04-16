"use client";

import React from "react";

const SkillTags = ({
    matched,
    missing
}: {
    matched: string[];
    missing: string[];
}) => {
    return (
        <>
            <div className="p-4 bg-card border border-border shadow rounded-2xl">
                <h3 className="font-semibold mb-2 text-foreground">Matched Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {matched.map((skill, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-sm bg-ternary text-secondary-foreground font-bold border border-ternary/50 rounded-full shadow-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-card border border-border shadow rounded-2xl">
                <h3 className="font-semibold mb-2 text-foreground">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {missing.map((skill, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-sm bg-background/50 text-muted-foreground border border-border rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SkillTags;
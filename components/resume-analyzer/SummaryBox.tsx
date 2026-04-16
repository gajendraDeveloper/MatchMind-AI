"use client";

import React from "react";

const SummaryBox = ({ summary }: { summary: string }) => {
    return (
        <div className="p-4 bg-card border border-border shadow rounded-2xl md:col-span-2">
            <h3 className="font-semibold mb-2 text-foreground">AI Summary</h3>

            <p className="text-sm text-muted-foreground">
                {summary}
            </p>
        </div>
    );
};

export default SummaryBox;
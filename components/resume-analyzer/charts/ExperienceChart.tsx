import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function ExperienceChart({
    data
}: {
    data: { year: string; value: number }[];
}) {
    return (
        <div className="p-6 rounded-2xl shadow bg-card border border-border">
            <h3 className="font-semibold mb-4 text-foreground">Experience Trend</h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="year" stroke="#4e534c" />
                    <YAxis stroke="#4e534c" />
                    <Tooltip 
                        contentStyle={{ backgroundColor: "#222521", color: "#ffffff", border: "1px solid #333631" }} 
                        itemStyle={{ color: "#ffffff" }}
                        labelStyle={{ color: "#c7a97c", fontWeight: "bold" }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#c7a97c" strokeWidth={3} dot={{ r: 4, fill: "#9b8664" }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
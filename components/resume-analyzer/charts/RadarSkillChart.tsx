import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts";

export default function RadarSkillChart({
    data
}: {
    data: { skill: string; value: number }[];
}) {
    return (
        <div className="p-6 rounded-2xl shadow bg-card border border-border">
            <h3 className="font-semibold mb-4 text-foreground">Skill Analysis (Radar)</h3>

            <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data}>
                    <PolarGrid stroke="#4e534c" />
                    <PolarAngleAxis dataKey="skill" stroke="#9b8664" />
                    <Radar dataKey="value" stroke="#c7a97c" fill="#c7a97c" fillOpacity={0.5} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: "#222521", color: "#ffffff", border: "1px solid #333631" }} 
                        itemStyle={{ color: "#ffffff" }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
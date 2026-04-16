export default function JobDescriptionBox({
    value,
    onChange
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <div className="flex flex-col rounded-3xl p-6 md:p-8 bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 h-full min-h-[350px]">
            <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-ternary text-sm font-bold border border-secondary/30">2</span>
                Job Description
            </h3>

            <textarea
                placeholder="Paste the job description or role requirements here..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 w-full h-full p-5 rounded-2xl border-2 border-border bg-background focus:bg-background focus:border-secondary focus:ring-4 focus:ring-secondary/10 text-foreground transition-all duration-300 resize-none outline-none shadow-inner placeholder:text-muted-foreground"
            />
        </div>
    );
}
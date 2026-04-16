"use client";

export default function FileUpload({
    fileName,
    onUpload
}: {
    fileName: string;
    onUpload: (file: File) => void;
}) {
    return (
        <div className="flex flex-col rounded-3xl p-6 md:p-8 bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-ternary text-sm font-bold border border-secondary/30">1</span>
                Upload Resume
            </h3>

            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl h-64 md:h-72 cursor-pointer hover:bg-background/50 hover:border-secondary transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-4 rounded-full bg-background border border-border text-muted-foreground group-hover:text-ternary shadow-sm group-hover:shadow transition-all duration-300 mb-4 z-10">
                    <svg className="w-10 h-10 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                </div>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="opacity-0 w-0 h-0 absolute pointer-events-none"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            onUpload(e.target.files[0]);
                        }
                    }}
                />

                <span className="text-foreground font-medium z-10 text-center px-4 mb-2">
                    Drag & drop your file here, or <span className="text-ternary group-hover:underline">browse</span>
                </span>

                <span className="text-xs text-muted-foreground z-10 font-medium">
                    Supports PDF, DOCX, TXT
                </span>

                {fileName && (
                    <div className="mt-6 px-4 py-2 bg-background text-ternary rounded-xl text-sm font-semibold shadow-sm border border-secondary/20 flex items-center gap-2 z-10 animate-in fade-in zoom-in duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {fileName}
                    </div>
                )}
            </label>
        </div>
    );
}
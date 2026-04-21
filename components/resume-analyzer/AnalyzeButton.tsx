export default function AnalyzeButton({
    loading,
    onClick
}: {
    loading: boolean;
    onClick: () => void;
}) {
    return (
        <div className="text-center pt-8 pb-4">
            <button
                onClick={onClick}
                disabled={loading}
                className="relative inline-flex cursor-pointer items-center justify-center w-full sm:w-auto sm:min-w-[300px] px-10 py-5 font-bold text-background transition-all duration-300 bg-gradient-to-r from-secondary via-ternary to-secondary rounded-2xl hover:from-ternary hover:via-secondary hover:to-ternary focus:outline-none focus:ring-4 focus:ring-secondary/30 shadow-xl shadow-secondary/20 hover:shadow-2xl hover:shadow-secondary/40 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
                {/* Shine effect - pointer-events-none to ensure it doesn't block clicks */}
                <span className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-background/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none"></span>
                
                <span className="relative flex items-center justify-center gap-3 text-lg tracking-wide pointer-events-none w-full">
                    {loading ? (
                        <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Resume...
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            Analyze Resume Now
                        </>
                    )}
                </span>
            </button>
        </div>
    );
}
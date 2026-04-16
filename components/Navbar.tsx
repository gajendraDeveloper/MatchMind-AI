import React from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
    return (
        <div className="w-full sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Left Section */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Icon */}
                        <button className="md:hidden p-2 rounded-lg hover:bg-card transition text-ternary">
                            <Menu size={20} />
                        </button>

                        {/* Brand */}
                        <h1 className="text-lg sm:text-xl font-bold text-ternary drop-shadow-sm tracking-wide">
                            MatchMind AI
                        </h1>
                    </div>

                    {/* Center Tagline */}
                    <div className="hidden sm:block">
                        <p className="text-xs bg-card border border-border text-secondary sm:text-sm font-medium tracking-wide px-4 py-1.5 rounded-full shadow-sm">
                            ✨ AI Resume Screener
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
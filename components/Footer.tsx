"use client";

import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full border-t border-border bg-card mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:justify-between gap-6">

                    {/* Brand + Description */}
                    <div>
                        <h2 className="text-lg font-bold text-ternary drop-shadow-sm">
                            MatchMind AI
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                            AI-powered resume screener that helps you analyze job fit, identify skill gaps, and improve your chances of landing interviews.
                        </p>
                    </div>

                    {/* Links / Actions */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">

                        {/* Quick Info */}
                        <div>
                            <h3 className="text-sm font-medium text-foreground mb-2">
                                Features
                            </h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>Resume Analysis</li>
                                <li>Skill Matching</li>
                                <li>AI Suggestions</li>
                                <li>Score Dashboard</li>
                            </ul>
                        </div>

                        {/* Social / Contact */}
                        <div>
                            <h3 className="text-sm font-medium text-foreground mb-2">
                                Connect
                            </h3>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://github.com/gajendraDeveloper"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-md hover:bg-background transition text-muted-foreground hover:text-foreground"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={18} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/gajendra-singh-rathore-7868612b4?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-md hover:bg-background transition text-muted-foreground hover:text-foreground"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                                <a
                                    href="mailto:gajendrasrathore20@gmail.com?subject=Hello&body=I want to connect with you"
                                    className="p-2 rounded-md hover:bg-background transition text-muted-foreground hover:text-foreground"
                                >
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-xs text-secondary text-center sm:text-left">
                        © {new Date().getFullYear()} MatchMind AI. All rights reserved.
                    </p>

                    <p className="text-xs text-secondary text-center sm:text-right">
                        Built with <span className="animate-pulse">❤️</span> by Gajendra Rathore.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
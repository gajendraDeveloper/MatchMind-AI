"use client";

// PDF is parsed server-side via API route to avoid pdfjs-dist Webpack issues
export async function parsePDF(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(`PDF parsing failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.text as string;
}

export async function parseDOCX(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-docx", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(`DOCX parsing failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.text as string;
}
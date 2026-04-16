import { NextRequest, NextResponse } from "next/server";
// Use pdf2json, which is highly reliable in Next.js/Vercel serverless functions
import PDFParser from "pdf2json";

export const runtime = "nodejs"; // ensure Node.js runtime, not Edge

export const maxDuration = 60; // Allow up to 60 seconds for large PDFs on Vercel

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<NextResponse>((resolve) => {
      // 1 means return text content only
      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error("PDF parse error:", errData.parserError);
        resolve(
          NextResponse.json(
            { error: "Failed to parse PDF file" },
            { status: 500 }
          )
        );
      });

      pdfParser.on("pdfParser_dataReady", () => {
        const text = pdfParser.getRawTextContent();
        resolve(NextResponse.json({ text }));
      });

      pdfParser.parseBuffer(buffer);
    });
  } catch (err: any) {
    console.error("PDF parse error:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed to parse PDF" },
      { status: 500 }
    );
  }
}

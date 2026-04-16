import { NextRequest, NextResponse } from "next/server";
// require instead of import due to commonjs mismatch in Next.js
const { PDFParse } = require("pdf-parse");
export const runtime = "nodejs"; // ensure Node.js runtime, not Edge

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

    const parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    await parser.destroy();

    return NextResponse.json({ text: parsed.text });
  } catch (err: any) {
    console.error("PDF parse error:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
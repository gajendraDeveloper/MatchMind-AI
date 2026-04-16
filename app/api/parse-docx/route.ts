import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export const runtime = "nodejs";

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

    const result = await mammoth.extractRawText({ buffer });

    return NextResponse.json({ text: result.value });
  } catch (err: any) {
    console.error("DOCX parse error:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed to parse DOCX" },
      { status: 500 }
    );
  }
}


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyBgz3ccAmLeGix-6UWcMqNpPYn5LPqokqQ",
});

async function testGenerate() {
    try {
        console.log("Testing generation with gemini-2.5-flash-lite...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: "Say hello!",
        });
        console.log("Response:", response.text);
    } catch (error: any) {
        console.error("Error during generation:", error.message);
        if (error.status) console.error("Status:", error.status);
    }
}

testGenerate();

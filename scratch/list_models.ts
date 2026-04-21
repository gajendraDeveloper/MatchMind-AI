
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
    apiKey: "AIzaSyBgz3ccAmLeGix-6UWcMqNpPYn5LPqokqQ",
});

async function listModels() {
    try {
        console.log("Listing models...");
        const result = await ai.models.list();
        const fs = await import("node:fs");
        fs.writeFileSync("scratch/models_full.json", JSON.stringify(result, null, 2));
        console.log("Full list written to scratch/models_full.json");
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();

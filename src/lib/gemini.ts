import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AnalysisResult {
  issueType: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  authority: string;
  description: string;
  legalComplaint: string;
  location: string;
}

export async function analyzeCivicIssue(imageBase64: string): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: "Analyze this image of a civic problem (pothole, broken light, trash, etc.). Identify the issue, its severity, the likely responsible city authority, a brief description, and draft a professional, legal-grade complaint citing general civic ordinances. Return the result in JSON format." },
          { inlineData: { mimeType: "image/jpeg", data: imageBase64.split(',')[1] || imageBase64 } }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          issueType: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
          authority: { type: Type.STRING },
          description: { type: Type.STRING },
          legalComplaint: { type: Type.STRING },
          location: { type: Type.STRING }
        },
        required: ["issueType", "severity", "authority", "description", "legalComplaint", "location"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

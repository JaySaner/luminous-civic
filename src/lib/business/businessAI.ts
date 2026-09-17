// ============================================================
// Luminous Civic — Business AI Analysis Service
// Powered by Gemini AI with intelligent fallbacks
// ============================================================

import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessAIAnalysis, FormField, IssuePriority } from "./types";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function analyzeBusinessReportAI(
  title: string,
  description: string,
  imageBase64?: string,
  industryType?: string
): Promise<BusinessAIAnalysis> {
  if (ai && apiKey) {
    try {
      const prompt = `Analyze this business/industry customer or internal report.
Title: ${title}
Description: ${description}
Industry: ${industryType || 'General Business'}
Identify: category, priority (Low, Medium, High, Critical), summary, suggested resolution steps, estimated resolution hours, and key tags. Return JSON format.`;

      const parts: any[] = [{ text: prompt }];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64.split(',')[1] || imageBase64
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
              summary: { type: Type.STRING },
              suggestedAction: { type: Type.STRING },
              estimatedHoursToResolve: { type: Type.NUMBER },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["category", "priority", "summary", "suggestedAction", "estimatedHoursToResolve", "tags"]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          ...parsed,
          priority: parsed.priority as IssuePriority
        };
      }
    } catch (err) {
      console.warn("Gemini Business AI call failed, using intelligent analyzer fallback:", err);
    }
  }

  return getFallbackBusinessAI(title, description, industryType);
}

export async function generateAIFormFields(industryName: string, formPurpose: string): Promise<FormField[]> {
  if (ai && apiKey) {
    try {
      const prompt = `Generate a modern dynamic form field configuration for a business in the ${industryName} industry for purpose: ${formPurpose}.
Return array of field objects with id, label, type (text, textarea, select, file, rating, email, phone), required (boolean), placeholder, options (if select).`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      if (response.text) {
        return JSON.parse(response.text);
      }
    } catch (e) {
      console.warn("AI form generation failed, using standard template", e);
    }
  }

  // Fallback form template
  return [
    { id: 'f_title', label: 'Issue Title / Subject', type: 'text', required: true, placeholder: 'Briefly describe the issue' },
    { id: 'f_desc', label: 'Detailed Description', type: 'textarea', required: true, placeholder: 'Provide full context or details' },
    { id: 'f_location', label: 'Location / Branch / Department', type: 'text', required: false, placeholder: 'e.g. Floor 2, Main Store' },
    { id: 'f_priority', label: 'Perceived Priority', type: 'select', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
    { id: 'f_images', label: 'Upload Photo Evidences', type: 'file', required: false }
  ];
}

function getFallbackBusinessAI(title: string, description: string, industryType?: string): BusinessAIAnalysis {
  const lower = (title + ' ' + description).toLowerCase();
  
  let priority: IssuePriority = 'Medium';
  if (lower.includes('urgent') || lower.includes('hazard') || lower.includes('fire') || lower.includes('leak') || lower.includes('crash')) {
    priority = 'Critical';
  } else if (lower.includes('broken') || lower.includes('failed') || lower.includes('damage') || lower.includes('refund')) {
    priority = 'High';
  } else if (lower.includes('feedback') || lower.includes('suggestion') || lower.includes('minor')) {
    priority = 'Low';
  }

  let category = 'Operational Inquiry';
  if (lower.includes('clean') || lower.includes('sanitat') || lower.includes('trash')) category = 'Sanitation & Cleanliness';
  else if (lower.includes('staff') || lower.includes('service') || lower.includes('rude')) category = 'Customer Service';
  else if (lower.includes('billing') || lower.includes('payment') || lower.includes('charge')) category = 'Billing & Payment';
  else if (lower.includes('equip') || lower.includes('machine') || lower.includes('light')) category = 'Equipment Maintenance';

  return {
    category,
    priority,
    summary: `AI Automated Analysis: ${title} categorized as ${category} with ${priority} urgency level.`,
    suggestedAction: `Dispatch on-duty supervisor or department manager to assess reported condition within SLA timeframe. Notify customer upon status update.`,
    estimatedHoursToResolve: priority === 'Critical' ? 4 : priority === 'High' ? 12 : priority === 'Medium' ? 24 : 48,
    tags: [category.toLowerCase().replace(/\s+/g, '-'), priority.toLowerCase(), industryType ? industryType.toLowerCase() : 'business']
  };
}

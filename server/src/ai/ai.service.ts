import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {

  async imageClassifier(file: Express.Multer.File) {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const tools = [
      {
        googleSearch: {},
      },
    ];
    const config = { tools };
    const model = 'gemini-2.0-flash';

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `
Role: You are an AI waste classification engine for "RecycleHub".

Task: Analyze the provided image of a single waste item and output a single, raw JSON object (no extra text).

Input: An image of a discarded object.

Output JSON schema:
{
  "category": (String) One of: "plastic", "glass", "metal", "paper_cardboard", "e-waste", "other",
  "confidence": (Float) 0.0–1.0 (certainty of classification),
  "environmental_impact": (Float) 0.0–1.0 (negative impact if not recycled; 1.0=very high, 0.0=very low),
  "reward_points": (Integer) 1–100 (higher for high-impact/value items)
  "recycling_tips": (Array of Strings) A list containing 2-4 short, actionable suggestions on how to properly prepare the item for high-quality recycling or reuse. If the item is not recyclable, provide proper disposal instructions.
}

Examples:
{
  "category": "metal",
  "confidence": 0.99,
  "environmental_impact": 0.75,
  "reward_points": 25,
  "recycling_tips": [
    "Empty any remaining liquid from the bottle.",
    "Rinse the bottle lightly with water to remove residue.",
    "Remove and discard the cap, as it's often a different type of plastic.",
    "Crush the bottle to save space for collection."
  ]
}
{
  "category": "other",
  "confidence": 0.92,
  "environmental_impact": 0.4,
  "reward_points": 1,
  "recycling_tips": [
    "Food and grease contaminate the paper recycling process.",
    "Tear off and recycle any clean, non-greasy parts of the lid or box.",
    "The soiled, greasy portions should be placed in general waste or composted.",
    "Never put greasy cardboard in the recycling bin."
  ]
}

Your Turn:
Output only the JSON object.
        `,
          },
          {
            inlineData: {
              mimeType: file.mimetype,
              data: file.buffer.toString('base64'),
            },
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let description = '';
    for await (const chunk of response) {
      description += chunk.text;
    }

    // Remove code block markers and whitespace
    const cleaned = description
      .replace(/```json|```/g, '')
      .replace(/```/g, '')
      .trim();

    let jsonData;
    try {
      jsonData = JSON.parse(cleaned);
    } catch (error) {
      throw new Error('AI response is not valid JSON');
    }

    return jsonData;
  }
}

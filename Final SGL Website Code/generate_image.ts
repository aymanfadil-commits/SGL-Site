import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function generateImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const prompt = "A photorealistic, documentary-quality portrait of a Black East African man in his 40s or 50s with dark skin. He is wearing a well-tailored dark suit and standing outside in a modern East African city like Nairobi or Addis Ababa. Glass office buildings and a busy urban street are visible in the background. He is not looking at the camera, with a calm, upright, and authoritative posture. Natural daylight. The subject is specifically a Black African man, not light-skinned or mixed.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:5",
        },
      },
    });

    for (const part of response.candidates![0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync("generated_image.txt", base64Data);
        console.log("Image generated and saved to generated_image.txt");
        return;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generateImage();

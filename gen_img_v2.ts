import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function run() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("No API key found");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
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
          imageSize: "512px"
        },
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part && part.inlineData) {
      fs.writeFileSync("generated_image.txt", part.inlineData.data);
      console.log("SUCCESS");
    } else {
      console.log("NO_IMAGE_PART");
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

run();

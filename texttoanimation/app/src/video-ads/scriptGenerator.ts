/**
 * LLM Script Generator
 * Converts user prompts into structured video scripts for Fast Wan
 */

import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export interface VideoScriptScene {
  sceneNumber: number;
  duration: number; // seconds
  visualDescription: string;
  textOverlay?: string;
  audioDescription?: string;
}

export interface VideoScript {
  title: string;
  totalDuration: number; // seconds
  scenes: VideoScriptScene[];
  style: string;
  colorScheme?: string;
}

let openAi: OpenAI | null = null;

function setUpOpenAi(): OpenAI {
  if (openAi) {
    return openAi;
  }
  if (OPENAI_API_KEY) {
    openAi = new OpenAI({ apiKey: OPENAI_API_KEY });
    return openAi;
  } else {
    throw new Error('OPENAI_API_KEY or GROQ_API_KEY environment variable is not set');
  }
}

/**
 * Generate a video script from a user prompt using GPT-3.5-turbo
 */
export async function generateAdScript(userPrompt: string): Promise<VideoScript> {
  try {
    const openai = setUpOpenAi();

    const systemPrompt = `You are an expert video ad scriptwriter. Your job is to create engaging, scroll-stopping promotional video scripts optimized for social media platforms like Instagram Reels, TikTok, and YouTube Shorts.

Create a structured script with multiple scenes that:
1. Hook viewers in the first 3 seconds
2. Clearly communicate the value proposition
3. Include visual descriptions that are vivid and cinematic
4. Use text overlays for key messages
5. End with a strong call-to-action
6. Total duration should be 15-60 seconds

Return the script as JSON with this structure:
{
  "title": "Ad title",
  "totalDuration": 30,
  "style": "Modern, energetic, professional",
  "colorScheme": "Bright and vibrant",
  "scenes": [
    {
      "sceneNumber": 1,
      "duration": 5,
      "visualDescription": "Detailed visual description",
      "textOverlay": "Bold text for overlay",
      "audioDescription": "Audio/music description"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Create a promotional video script for: ${userPrompt}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const script = JSON.parse(content) as VideoScript;
    
    // Validate and ensure scenes are properly structured
    if (!script.scenes || !Array.isArray(script.scenes)) {
      throw new Error('Invalid script structure: missing scenes');
    }

    // Ensure total duration matches sum of scene durations
    const totalDuration = script.scenes.reduce((sum, scene) => sum + scene.duration, 0);
    script.totalDuration = totalDuration;

    return script;
  } catch (error) {
    console.error('Script generation error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate script: ${error.message}`);
    }
    throw new Error('Failed to generate script: Unknown error');
  }
}

/**
 * Convert structured script to Fast Wan prompt format
 */
export function scriptToFastWanPrompt(script: VideoScript): string {
  const scenesDescriptions = script.scenes
    .map(
      (scene) =>
        `Scene ${scene.sceneNumber} (${scene.duration}s): ${scene.visualDescription}${
          scene.textOverlay ? ` [Text: "${scene.textOverlay}"]` : ''
        }`
    )
    .join('\n');

  return `Create an engaging promotional video with the following scenes:\n${scenesDescriptions}\n\nStyle: ${script.style}${
    script.colorScheme ? `\nColor Scheme: ${script.colorScheme}` : ''
  }`;
}


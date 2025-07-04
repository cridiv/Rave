import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

export interface PreprocessedGoal {
  goal: string;
  known: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  formatPreference?: 'video' | 'article' | 'project' | 'mixed';
}

@Injectable()
export class GoalPreprocessorService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async preprocess(message: string): Promise<PreprocessedGoal> {
    const systemPrompt = `
You are an expert assistant that extracts a clean learning goal from messy input.

From the user message below, return a JSON object in this exact format:

{
  "goal": "What the user wants to learn",
  "known": ["Known skills/tools"],
  "experienceLevel": "beginner" | "intermediate" | "advanced",
  "formatPreference": "video" | "article" | "project" | "mixed"
}

If some fields are missing in the message, infer them from context. Output JSON ONLY.
`;

    const userPrompt = `User message:\n"""${message}"""`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const content = response.choices[0].message?.content ?? '';

    try {
      const jsonMatch = content.match(/({[\s\S]+})/);
      const json = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(json.trim());
    } catch (e) {
      console.error('❌ Failed to parse GPT response:', content);
      throw new Error(`Could not parse goal preprocessor response: ${(e as Error).message}`);
    }
  }
}

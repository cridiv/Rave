import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { buildRoadmapPrompt } from '@rave/utils';
import { ParsedRoadmap } from '@rave/types';
import { GoalPreprocessorService } from '../preprocessor/goal-preprocessor.service'; 
@Injectable()
export class ChatService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(
    private readonly goalPreprocessor: GoalPreprocessorService,
  ) {}

  async generateRoadmap(userMessage: string): Promise<ParsedRoadmap> {

    const { goal, known, experienceLevel } = await this.goalPreprocessor.preprocess(userMessage);

    const prompt = buildRoadmapPrompt(goal, known, experienceLevel);

    console.log('🚀 GOAL:', goal);
console.log('✅ KNOWN:', known);
console.log('🧠 PROMPT SENT TO GPT:\n', prompt);


const completion = await this.openai.chat.completions.create({
  model: 'gpt-4o',
  temperature: 0.7,
  messages: [
    {
      role: 'system',
      content: `
You are an expert roadmap builder. You MUST return ONLY a JSON array of roadmap stages. No explanations, no logs, no Markdown.

If the input is unclear, make your best guess. You MUST output valid JSON like this:

[
  {
    "id": "stage-1",
    "title": "Stage title",
    "nodes": [
      {
        "id": "node-1",
        "title": "Topic",
        "description": "Explanation",
        "resources": [
          {
            "type": "video" | "article" | "project",
            "title": "Resource Title",
            "link": "https://..."
          }
        ]
      }
    ]
  }
]
`.trim(),
    },
    {
      role: 'user',
      content: prompt,
    },
  ],
});

    const content = completion.choices[0].message?.content ?? '';

    console.log('📦 RAW GPT RESPONSE:', content);

    try {
      const json = this.extractJson(content);
      return JSON.parse(json);
    } catch (err) {
      console.error('❌ Failed to parse:', content);
      throw new Error('Could not parse roadmap output as valid JSON');
    }
  }

  private extractJson(text: string): string {
    text = text.trim();

    const block = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (block) return block[1].trim();

    const direct = text.match(/(\{[\s\S]+\}|\[[\s\S]+\])/);
    if (direct) return direct[1].trim();

    if ((text.startsWith('[') && text.endsWith(']')) || (text.startsWith('{') && text.endsWith('}'))) {
      return text;
    }

    throw new Error('No valid JSON found in output');
  }
}

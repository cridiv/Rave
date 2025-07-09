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

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `
You are an expert roadmap builder and learning specialist. You MUST return ONLY a JSON array of roadmap stages. No explanations, no logs, no Markdown.

IMPORTANT REQUIREMENTS:
- Each node description should be 2-3 sentences that explain WHY this topic is important and HOW it fits into the overall learning journey
- Provide exactly 3 high-quality resources per node: mix of videos, articles, and hands-on projects
- Resources should be from reputable sources (MDN, official docs, well-known educators, etc.)
- Include brief introductory context for each stage

If the input is unclear, make your best guess. You MUST output valid JSON like this:

[
  {
    "id": "stage-1",
    "title": "Stage Title",
    "description": "2-3 sentence brief introduction explaining what this stage covers and why it's important in the learning journey",
    "nodes": [
      {
        "id": "node-1",
        "title": "Topic Name",
        "description": "Detailed 2-3 sentence explanation of why this topic is crucial, what specific skills you'll gain, and how it connects to other concepts in your learning path. This should be educational and motivating.",
        "resources": [
          {
            "type": "video",
            "title": "Comprehensive Video Tutorial Title",
            "link": "https://youtube.com/watch?v=example",
            "description": "Brief explanation of what makes this resource valuable"
          },
          {
            "type": "article",
            "title": "In-depth Article/Documentation Title",
            "link": "https://example.com/article",
            "description": "Why this article is particularly helpful for understanding the concept"
          },
          {
            "type": "project",
            "title": "Hands-on Project Title",
            "link": "https://github.com/example/project",
            "description": "What you'll build and the skills you'll practice"
          }
        ]
      }
    ]
  }
]

RESOURCE QUALITY GUIDELINES:
- Videos: Prefer channels like FreeCodeCamp, Traversy Media, The Net Ninja, official channels
- Articles: Prefer MDN, official documentation, Dev.to, Medium articles by recognized experts
- Projects: Include GitHub repos, interactive coding challenges, or guided project tutorials
- Ensure links are realistic and follow common patterns for these platforms
`.trim(),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0].message?.content ?? '';


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
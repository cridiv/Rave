export function buildRoadmapPrompt(userMessage: string): string {
  return `
You are an expert AI roadmap builder.

Take the user's message and generate a learning roadmap broken into STAGES.
Each stage should contain NODES with:
- title
- short description
- 1–3 resources (video, article, project) with title + link

Respond strictly in this JSON format:
[
  {
    "id": "stage-1",
    "title": "Intro to Mobile Development",
    "nodes": [
      {
        "id": "node-1",
        "title": "What is a Mobile Developer?",
        "description": "A mobile dev builds apps for Android/iOS...",
        "resources": [
          {
            "type": "video",
            "title": "Intro to Mobile Dev",
            "link": "https://youtube.com/..."
          }
        ]
      }
    ]
  }
]

User Message: """${userMessage}"""
`.trim();
}

"use client";
import React from "react";

interface Resource {
  type: string;
  title: string;
  link: string;
}

interface Node {
  id: string | number;
  title: string;
  description: string;
  resources: Resource[];
}

interface Stage {
  id: string | number;
  title: string;
  nodes: Node[];
}

const ResourceLink: React.FC<{ resource: Resource }> = ({ resource }) => {
  return (
    <a
      href={resource.link}
      className="text-sky-400 hover:underline flex items-center group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="inline-block w-1.5 h-1.5 bg-sky-400 rounded-full mr-2 group-hover:bg-sky-300 transition-colors"></span>
      <span>
        <span className="text-gray-300">[{resource.type}]</span>{" "}
        {resource.title}
      </span>
    </a>
  );
};

const NodeItem: React.FC<{ node: Node }> = ({ node }) => {
  return (
    <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-sky-500/20 transition-all duration-300 hover:bg-gradient-to-r from-transparent to-sky-950/20">
      <h4 className="text-base font-medium text-white mb-1">{node.title}</h4>
      <p className="text-gray-400 text-sm mb-3">{node.description}</p>

      {node.resources.length > 0 && (
        <div className="ml-1 space-y-1.5">
          <h5 className="text-xs uppercase text-gray-500 mb-1.5 tracking-wider">
            Resources
          </h5>
          <ul className="space-y-1.5">
            {node.resources.map((res, idx) => (
              <li key={idx}>
                <ResourceLink resource={res} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const StageSection: React.FC<{ stage: Stage; index: number }> = ({
  stage,
  index,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center text-white font-medium text-sm shadow-lg shadow-sky-500/20">
          {index + 1}
        </div>
        <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
      </div>

      <div className="ml-4 border-l-2 border-sky-500/20 pl-6 space-y-3">
        {stage.nodes.map((node) => (
          <NodeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

const RoadmapDisplay: React.FC<{ roadmap: Stage[] | string }> = ({
  roadmap,
}) => {
  // If roadmap is a string (error message or simple text)
  if (typeof roadmap === "string") {
    return (
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
        <p className="text-gray-300">{roadmap}</p>
      </div>
    );
  }

  // If roadmap is an array (actual roadmap data)
  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      <h2 className="text-xl font-bold text-center mb-8 bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent">
        Your Learning Roadmap
      </h2>

      {roadmap.map((stage, index) => (
        <StageSection key={stage.id} stage={stage} index={index} />
      ))}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 mb-3">
          Ready to start your learning journey?
        </p>
        <button className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5">
          Save Roadmap
        </button>
      </div>
    </div>
  );
};

// Helper function to generate sample roadmap data for testing
export const generateSampleRoadmap = (): Stage[] => {
  return [
    {
      id: "stage1",
      title: "Fundamentals of Web Development",
      nodes: [
        {
          id: "node1",
          title: "HTML Foundations",
          description: "Learn the building blocks of web pages and documents",
          resources: [
            {
              type: "Course",
              title: "HTML Full Course - Build a Website Tutorial",
              link: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
            },
            {
              type: "Doc",
              title: "MDN HTML Guide",
              link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            },
            {
              type: "Practice",
              title: "HTML Interactive Exercises",
              link: "https://www.w3schools.com/html/html_exercises.asp",
            },
          ],
        },
        {
          id: "node2",
          title: "CSS Styling",
          description: "Master styling and layout techniques for web pages",
          resources: [
            {
              type: "Course",
              title: "CSS Crash Course For Absolute Beginners",
              link: "https://www.youtube.com/watch?v=yfoY53QXEnI",
            },
            {
              type: "Tool",
              title: "CSS Grid Generator",
              link: "https://cssgrid-generator.netlify.app/",
            },
          ],
        },
      ],
    },
    {
      id: "stage2",
      title: "JavaScript Programming",
      nodes: [
        {
          id: "node3",
          title: "JavaScript Basics",
          description: "Learn fundamental programming concepts with JavaScript",
          resources: [
            {
              type: "Book",
              title: "Eloquent JavaScript",
              link: "https://eloquentjavascript.net/",
            },
            {
              type: "Course",
              title: "JavaScript - The Complete Guide 2023",
              link: "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/",
            },
          ],
        },
        {
          id: "node4",
          title: "DOM Manipulation",
          description:
            "Learn to interact with webpage elements using JavaScript",
          resources: [
            {
              type: "Tutorial",
              title: "JavaScript DOM Manipulation Course",
              link: "https://www.youtube.com/watch?v=5fb2aPlgoys",
            },
            {
              type: "Practice",
              title: "10 JavaScript Projects in 1 Hour",
              link: "https://www.youtube.com/watch?v=8GPPJpiLqHk",
            },
          ],
        },
      ],
    },
    {
      id: "stage3",
      title: "React Framework",
      nodes: [
        {
          id: "node5",
          title: "React Fundamentals",
          description: "Learn component-based UI development with React",
          resources: [
            {
              type: "Docs",
              title: "React Official Documentation",
              link: "https://reactjs.org/docs/getting-started.html",
            },
            {
              type: "Course",
              title: "React JS Crash Course",
              link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            },
          ],
        },
        {
          id: "node6",
          title: "State Management",
          description: "Master React state management with hooks and context",
          resources: [
            {
              type: "Guide",
              title: "A Complete Guide to useEffect",
              link: "https://overreacted.io/a-complete-guide-to-useeffect/",
            },
            {
              type: "Tutorial",
              title: "React Context & Hooks Tutorial",
              link: "https://www.youtube.com/watch?v=6RhOzQciVwI",
            },
          ],
        },
      ],
    },
  ];
};

export default RoadmapDisplay;

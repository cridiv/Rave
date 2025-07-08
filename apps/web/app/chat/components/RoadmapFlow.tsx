"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  NodeProps,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";

// Import React Flow styles
import "reactflow/dist/style.css";

// Types from existing roadmap component
interface Resource {
  type: string;
  title: string;
  link: string;
}

interface RoadmapNode {
  id: string | number;
  title: string;
  description: string;
  resources: Resource[];
}

interface Stage {
  id: string | number;
  title: string;
  nodes: RoadmapNode[];
}

// CSS animations
const animationStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.react-flow__node {
  transition: all 0.3s ease;
}

.react-flow__edge path {
  stroke-width: 2;
  transition: all 0.3s ease;
}
`;

// Resource Link Component
const ResourceLink: React.FC<{ resource: Resource }> = ({ resource }) => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "course":
        return (
          <svg
            className="w-3 h-3 mr-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-6" />
          </svg>
        );
      case "doc":
      case "docs":
      case "documentation":
        return (
          <svg
            className="w-3 h-3 mr-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      case "tool":
        return (
          <svg
            className="w-3 h-3 mr-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "practice":
      case "exercise":
        return (
          <svg
            className="w-3 h-3 mr-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-3 h-3 mr-1.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
    }
  };

  return (
    <a
      href={resource.link}
      className="text-sky-400 hover:text-sky-300 flex items-center group px-3 py-1.5 rounded-md hover:bg-sky-900/20 transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center text-sky-400 group-hover:text-sky-300">
        {getResourceIcon(resource.type)}
      </div>
      <span>
        <span className="text-gray-400 text-xs">{resource.type}</span>{" "}
        <span className="group-hover:underline">{resource.title}</span>
      </span>
    </a>
  );
};

// Custom node components
const StageNode: React.FC<NodeProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { totalNodes, completedCount, title, stageIndex } = data;
  const completionPercentage =
    totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-4 w-[300px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-sky-500"
      />

      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 
              flex items-center justify-center text-white font-medium shadow-lg shadow-sky-500/20 z-10"
          >
            {stageIndex + 1}
          </div>

          {/* Progress ring around stage number */}
          <svg
            className="absolute top-0 left-0 w-10 h-10 -rotate-90 z-0"
            viewBox="0 0 36 36"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-sky-900/30"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-sky-500"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - completionPercentage}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div className="flex items-center text-xs text-gray-400 gap-1.5">
              <span>
                {completedCount}/{totalNodes} completed
              </span>
              <div
                className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Stage progress bar */}
          <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-sky-500"
      />
    </div>
  );
};

const TopicNode: React.FC<NodeProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, description, resources, isCompleted, onToggleCompletion } =
    data;

  return (
    <div
      className={`
      rounded-lg transition-all duration-300 w-[280px]
      ${
        isCompleted
          ? "bg-gradient-to-r from-transparent to-emerald-950/10 border border-emerald-500/20"
          : "bg-white/5 border border-white/5 hover:border-sky-500/20 hover:bg-gradient-to-r from-transparent to-sky-950/20"
      }
    `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-sky-500"
      />

      <div
        className="p-4 cursor-pointer flex items-start justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {/* Completion checkbox */}
          <div
            className={`
              w-5 h-5 rounded-full flex-shrink-0 border cursor-pointer
              transition-all duration-300 flex items-center justify-center
              ${
                isCompleted
                  ? "bg-emerald-500 border-emerald-400"
                  : "border-sky-500/50 bg-transparent hover:bg-sky-900/20"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompletion();
            }}
          >
            {isCompleted && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>

          <h4
            className={`text-base font-medium ${isCompleted ? "text-emerald-300" : "text-white"}`}
          >
            {title}
          </h4>
        </div>

        <div
          className={`text-gray-400 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div
        className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <div className="px-4 pb-4">
          <p className="text-gray-400 text-sm mb-4 ml-8">{description}</p>

          {resources.length > 0 && (
            <div className="ml-8 space-y-1">
              <h5 className="text-xs uppercase text-gray-500 mb-2 tracking-wider flex items-center gap-1.5">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                Resources
              </h5>
              <ul className="space-y-1">
                {resources.map((res: Resource, idx: number) => (
                  <li
                    key={idx}
                    className="animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <ResourceLink resource={res} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-sky-500"
      />
    </div>
  );
};

// Main Flow Component
const Flow: React.FC<{
  roadmap: Stage[];
  completedNodes: Set<string | number>;
  onToggleCompletion: (nodeId: string | number) => void;
}> = ({ roadmap, completedNodes, onToggleCompletion }) => {
  // Convert roadmap data to React Flow nodes and edges
  const initialNodes = useMemo(() => {
    const nodes: Node[] = [];
    let yOffset = 0;
    const xCenter = 400;
    const stageGap = 300;
    const topicGap = 200;
    const topicWidth = 280;

    roadmap.forEach((stage, stageIndex) => {
      // Stage node
      const totalNodes = stage.nodes.length;
      const completedCount = stage.nodes.filter((node) =>
        completedNodes.has(node.id)
      ).length;

      // Add stage node
      nodes.push({
        id: `stage-${stage.id}`,
        type: "stageNode",
        position: { x: xCenter, y: yOffset },
        data: {
          title: stage.title,
          stageIndex,
          totalNodes,
          completedCount,
        },
      });

      yOffset += stageGap;

      // Calculate positions for topic nodes in this stage
      const stageTopics = stage.nodes.length;
      const topicsYStart = yOffset - 100;

      // Add topic nodes
      stage.nodes.forEach((node, nodeIndex) => {
        nodes.push({
          id: `topic-${node.id}`,
          type: "topicNode",
          position: {
            x: xCenter,
            y: topicsYStart + nodeIndex * topicGap,
          },
          data: {
            ...node,
            isCompleted: completedNodes.has(node.id),
            onToggleCompletion: () => onToggleCompletion(node.id),
          },
        });
      });

      // Update yOffset for next stage
      yOffset = topicsYStart + stageTopics * topicGap + 100;
    });

    return nodes;
  }, [roadmap, completedNodes, onToggleCompletion]);

  const initialEdges = useMemo(() => {
    const edges: Edge[] = [];

    // Connect stages
    for (let i = 0; i < roadmap.length - 1; i++) {
      edges.push({
        id: `stage-${roadmap[i].id}-to-stage-${roadmap[i + 1].id}`,
        source: `stage-${roadmap[i].id}`,
        target: `stage-${roadmap[i + 1].id}`,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#0ea5e9" },
      });
    }

    // Connect stages to their topics
    roadmap.forEach((stage) => {
      stage.nodes.forEach((node) => {
        edges.push({
          id: `stage-${stage.id}-to-topic-${node.id}`,
          source: `stage-${stage.id}`,
          target: `topic-${node.id}`,
          type: "smoothstep",
          style: { stroke: "#0ea5e9", opacity: 0.5 },
        });
      });
    });

    // Connect topics within the same stage
    roadmap.forEach((stage) => {
      for (let i = 0; i < stage.nodes.length - 1; i++) {
        edges.push({
          id: `topic-${stage.nodes[i].id}-to-topic-${stage.nodes[i + 1].id}`,
          source: `topic-${stage.nodes[i].id}`,
          target: `topic-${stage.nodes[i + 1].id}`,
          type: "smoothstep",
          style: { stroke: "#0ea5e9", opacity: 0.3 },
        });
      }
    });

    return edges;
  }, [roadmap]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  // Update nodes when completedNodes changes
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.type === "topicNode") {
          const topicId = node.id.replace("topic-", "");
          return {
            ...node,
            data: {
              ...node.data,
              isCompleted: completedNodes.has(topicId),
            },
          };
        }
        if (node.type === "stageNode") {
          const stageId = node.id.replace("stage-", "");
          const stage = roadmap.find((s) => s.id.toString() === stageId);
          if (stage) {
            const totalNodes = stage.nodes.length;
            const completedCount = stage.nodes.filter((n) =>
              completedNodes.has(n.id)
            ).length;

            return {
              ...node,
              data: {
                ...node.data,
                totalNodes,
                completedCount,
              },
            };
          }
        }
        return node;
      })
    );
  }, [completedNodes, roadmap, setNodes]);

  useEffect(() => {
    // Fit the view to show all nodes
    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 100);
  }, [fitView]);

  // Custom node types
  const nodeTypes = useMemo(
    () => ({
      stageNode: StageNode,
      topicNode: TopicNode,
    }),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.5}
      maxZoom={1.5}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      className="bg-transparent"
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#ffffff10" gap={24} />
      <Controls className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg" />
      <MiniMap
        nodeStrokeWidth={3}
        nodeColor={(node) => {
          if (node.type === "topicNode" && node.data?.isCompleted) {
            return "#10b981"; // emerald-500
          }
          return "#0ea5e9"; // sky-500
        }}
        maskColor="rgba(0, 0, 0, 0.7)"
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
      />
    </ReactFlow>
  );
};

// Wrap with ReactFlowProvider for context
const RoadmapFlow: React.FC<{ roadmap: Stage[] | string }> = ({ roadmap }) => {
  const [completedNodes, setCompletedNodes] = useState<Set<string | number>>(
    new Set()
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleNodeCompletion = useCallback((nodeId: string | number) => {
    setCompletedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // If roadmap is a string (error message or simple text)
  if (typeof roadmap === "string") {
    return (
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
        <p className="text-gray-300">{roadmap}</p>
      </div>
    );
  }

  // Calculate overall progress
  const totalNodes = roadmap.reduce(
    (sum, stage) => sum + stage.nodes.length,
    0
  );
  const completedCount = completedNodes.size;
  const progressPercentage =
    totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0;

  return (
    <div
      className={`p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Inject animation styles */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent">
        Your Learning Roadmap
      </h2>

      {/* Overall progress bar */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>
            {completedCount} of {totalNodes} topics completed
          </span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-end">
          <span className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full bg-sky-900/30 text-sky-300">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* Roadmap Flow */}
      <div id="roadmap-flow-container" className="h-[800px] w-full">
        <ReactFlowProvider>
          <Flow
            roadmap={roadmap}
            completedNodes={completedNodes}
            onToggleCompletion={toggleNodeCompletion}
          />
        </ReactFlowProvider>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4 4 4-4m0 0v-8m0 8h8m-8 0H4"
            />
          </svg>
          Export as PNG
        </button>

        <button
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export as PDF
        </button>

        <button
          onClick={() => setCompletedNodes(new Set())}
          className="px-6 py-2 border border-sky-500/30 hover:border-sky-500/50 text-sky-400 hover:text-sky-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-sky-900/20 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset Progress
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

export default RoadmapFlow;

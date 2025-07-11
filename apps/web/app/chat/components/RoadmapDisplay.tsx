"use client";
import React, { useState, useRef } from "react";
import { exportAsImage, exportAsPDF } from "./RoadmapExport";

// Import types from shared package if available
import {
  Resource,
  RoadmapNode as Node,
  RoadmapStage as Stage,
} from "@rave/types/roadmap-types";

// Fallback interfaces in case the imports fail
interface ResourceFallback {
  type: string;
  title: string;
  link: string;
}

interface NodeFallback {
  id: string | number;
  title: string;
  description: string;
  resources: ResourceFallback[];
}

interface StageFallback {
  id: string | number;
  title: string;
  nodes: NodeFallback[];
}

const ResourceLink: React.FC<{ resource: Resource | ResourceFallback }> = ({
  resource,
}) => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return (
          <svg
            className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0"
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
      case "article":
        return (
          <svg
            className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0"
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
      case "project":
        return (
          <svg
            className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0"
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
      default:
        return (
          <svg
            className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0"
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
      className="text-sky-400 hover:text-sky-300 flex items-center group px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-sky-900/20 transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center text-sky-400 group-hover:text-sky-300 flex-shrink-0">
        {getResourceIcon(resource.type)}
      </div>
      <span className="min-w-0 flex-1">
        <span className="text-gray-400 text-xs">{resource.type}</span>{" "}
        <span className="group-hover:underline break-words">
          {resource.title}
        </span>
      </span>
    </a>
  );
};

const NodeItem: React.FC<{
  node: Node | NodeFallback;
}> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-3 sm:mb-4 rounded-lg transition-all duration-300 bg-white/5 border border-white/5 hover:border-sky-500/20 hover:bg-gradient-to-r from-transparent to-sky-950/20">
      <div
        className="p-3 sm:p-4 cursor-pointer flex items-start justify-between gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-sm sm:text-base font-medium text-white break-words">
          {node.title}
        </h4>

        <div
          className={`text-gray-400 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} flex-shrink-0`}
        >
          <svg
            width="18"
            height="18"
            className="sm:w-5 sm:h-5"
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
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
            {node.description}
          </p>

          {node.resources.length > 0 && (
            <div className="space-y-1">
              <h5 className="text-xs uppercase text-gray-500 mb-2 tracking-wider flex items-center gap-1.5">
                <svg
                  className="w-3 h-3 flex-shrink-0"
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
                {node.resources.map((res, idx) => (
                  <li key={idx}>
                    <ResourceLink resource={res} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StageSection: React.FC<{
  stage: Stage | StageFallback;
  index: number;
  totalStages: number;
}> = ({ stage, index, totalStages }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8 sm:mb-12 relative">
      {/* Stage header */}
      <div
        className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="relative">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 
               flex items-center justify-center text-white font-medium shadow-lg shadow-sky-500/20 z-10 text-sm sm:text-base"
          >
            {index + 1}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-white break-words">
              {stage.title}
            </h3>
            <div
              className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} flex-shrink-0`}
            >
              <svg
                width="14"
                height="14"
                className="sm:w-4 sm:h-4"
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
      </div>

      {/* Connecting line between stages */}
      {index < totalStages - 1 && (
        <div className="absolute left-4 sm:left-5 top-12 sm:top-16 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-sky-500/50 to-sky-500/10 z-0"></div>
      )}

      {/* Node container */}
      <div
        className={`
        ml-8 sm:ml-12 space-y-3 sm:space-y-4 relative overflow-hidden transition-all duration-500 ease-in-out
        ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        {stage.nodes.map((node, nodeIndex) => (
          <NodeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

const RoadmapDisplay: React.FC<{
  roadmap: (Stage | StageFallback)[] | string;
  title?: string;
  className?: string;
  onExportStatusChange?: (
    status: "processing" | "complete" | "error",
    message?: string
  ) => void;
}> = ({ roadmap, title = "Roadmap", className = "", onExportStatusChange }) => {
  const [exportStatus, setExportStatus] = useState<{
    status: "idle" | "processing" | "complete" | "error";
    message?: string;
  }>({ status: "idle" });
  const roadmapRef = useRef<HTMLDivElement>(null);

  // If roadmap is a string (error message or simple text)
  if (typeof roadmap === "string") {
    return (
      <div
        className={`p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center ${className}`}
      >
        <p className="text-gray-300 text-sm sm:text-base">{roadmap}</p>
      </div>
    );
  }
  // Replace these handler functions in your RoadmapDisplay component:

  const handleExportAsImage = () => {
    if (roadmapRef.current) {
      exportAsImage(roadmapRef.current, {
        filename: `${title.toLowerCase().replace(/\s+/g, "-")}.png`,
        onStatusChange: (status, message) => {
          setExportStatus({ status, message });
          if (onExportStatusChange) {
            onExportStatusChange(status, message);
          }
        },
      });
    }
  };

  const handleExportAsPDF = () => {
    if (roadmapRef.current) {
      exportAsPDF(roadmapRef.current, {
        filename: `${title.toLowerCase().replace(/\s+/g, "-")}.pdf`,
        onStatusChange: (status, message) => {
          setExportStatus({ status, message });
          if (onExportStatusChange) {
            onExportStatusChange(status, message);
          }
        },
      });
    }
  };
  // If roadmap is an array (actual roadmap data)
  return (
    <div
      ref={roadmapRef}
      className={`p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 ${className}`}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent">
        {title}
      </h2>

      {/* Roadmap Stages */}
      <div className="relative mt-8 sm:mt-12">
        {roadmap.map((stage, index) => (
          <StageSection
            key={stage.id}
            stage={stage}
            index={index}
            totalStages={roadmap.length}
          />
        ))}
      </div>

      {/* Export buttons */}
      <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-2 w-full sm:w-auto">
          <button
            onClick={handleExportAsPDF}
            className="px-4 sm:px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={exportStatus.status === "processing"}
          >
            {exportStatus.status === "processing" &&
            exportStatus.message?.includes("PDF") ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
            {exportStatus.status === "processing" &&
            exportStatus.message?.includes("PDF")
              ? "Processing PDF..."
              : "Export as PDF"}
          </button>

          <button
            onClick={handleExportAsImage}
            className="px-4 sm:px-6 py-2 border border-sky-500/30 hover:border-sky-500/50 text-sky-400 hover:text-sky-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-sky-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={exportStatus.status === "processing"}
          >
            {exportStatus.status === "processing" &&
            exportStatus.message?.includes("image") ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-sky-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
            {exportStatus.status === "processing" &&
            exportStatus.message?.includes("image")
              ? "Processing image..."
              : "Export as Image"}
          </button>
        </div>

        {/* Status messages */}
        {exportStatus.status === "complete" && (
          <div className="text-sm text-green-400 flex items-center gap-1.5 animate-fadeOut">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {exportStatus.message}
          </div>
        )}

        {exportStatus.status === "error" && (
          <div className="text-sm text-red-400 flex items-center gap-1.5 animate-fadeOut">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            {exportStatus.message}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoadmapDisplay;

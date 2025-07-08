"use client";

import React, { useState, useEffect } from "react";
import RoadmapDisplay, {
  generateSampleRoadmap,
} from "../components/RoadmapDisplay";
import { RoadmapStage } from "@rave/types/roadmap-types";

// Mock API function to simulate fetching from backend
const fetchRoadmapFromBackend = async (): Promise<RoadmapStage[]> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return the sample data (in a real app, this would be an API call)
  return generateSampleRoadmap() as RoadmapStage[];
};

const RoadmapTestPage: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapStage[] | string>(
    "Loading roadmap..."
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRoadmapFromBackend();
        setRoadmap(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setRoadmap("Failed to load roadmap. Please try again later.");
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Roadmap Test Page</h1>
        <p className="text-gray-400 mb-6">
          This page demonstrates how to integrate the RoadmapDisplay component
          with a backend API.
        </p>

        <div className="p-4 bg-gray-800 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Backend Integration Example
          </h3>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            {`// Fetch roadmap data from your API
const fetchRoadmap = async () => {
  const response = await fetch('/api/roadmap');
  if (!response.ok) {
    throw new Error('Failed to fetch roadmap');
  }
  return await response.json();
};

// In your component
const [roadmap, setRoadmap] = useState([]);

useEffect(() => {
  fetchRoadmap()
    .then(data => setRoadmap(data))
    .catch(err => console.error(err));
}, []);

return <RoadmapDisplay roadmap={roadmap} title="My Custom Roadmap" />;`}
          </pre>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      ) : (
        <RoadmapDisplay roadmap={roadmap} title="Web Development Roadmap" />
      )}
    </div>
  );
};

export default RoadmapTestPage;

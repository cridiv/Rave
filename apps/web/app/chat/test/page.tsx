"use client";
import React from "react";
import RoadmapDisplay from "../components/RoadmapDisplay";

const TestPage = () => {
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 text-transparent bg-clip-text">
          Roadmap Display Test
        </h1>

        <div className="mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
          <h2 className="text-lg font-medium mb-2">Test Controls</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              className="px-4 py-2 bg-sky-600 rounded-md text-sm hover:bg-sky-700 transition-colors"
              onClick={() =>
                alert(
                  "This would load the sample roadmap data (already displayed below)"
                )
              }
            >
              Load Sample Data
            </button>
            <button
              className="px-4 py-2 bg-emerald-600 rounded-md text-sm hover:bg-emerald-700 transition-colors"
              onClick={() =>
                alert("This would save the roadmap to your account")
              }
            >
              Test Save
            </button>
            <button
              className="px-4 py-2 bg-amber-600 rounded-md text-sm hover:bg-amber-700 transition-colors"
              onClick={() => alert("This would show an error message")}
            >
              Test Error Display
            </button>
          </div>
        </div>

        <div className="mt-12 mb-10">
          <h2 className="text-lg font-medium mb-4">Error State Test:</h2>
          <RoadmapDisplay roadmap="⚠️ This is how an error message would display to the user. It could be an API error, connection issue, or other problem." />
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Test page for the Roadmap Display component. This page uses dummy
            data to preview the component.
          </p>
          <a
            href="/chat"
            className="inline-block mt-4 text-sky-400 hover:text-sky-300 transition-colors"
          >
            ← Back to Chat
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

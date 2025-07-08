# Roadmap Display Component Documentation

The `RoadmapDisplay` component is a production-ready, CSS-based roadmap visualizer designed to be easily integrated with backend APIs. This document explains how to use the component in your application with real-time data.

## Features

- **Generic Roadmap Visualization**: Works with any roadmap structure, not specific to learning paths
- **Collapsible Stages and Nodes**: Interactive UI with expandable/collapsible sections
- **Export Functionality**: Built-in PDF and PNG export capabilities
- **Backend Integration Ready**: Easy to connect with API data sources
- **Responsive Design**: Works well on different screen sizes
- **Minimal Dependencies**: Uses html2canvas and jsPDF for export functionality

## Component Props

| Prop                   | Type                       | Required | Description                                    |
| ---------------------- | -------------------------- | -------- | ---------------------------------------------- |
| `roadmap`              | `RoadmapStage[] \| string` | Yes      | The roadmap data array or error message string |
| `title`                | `string`                   | No       | Title of the roadmap (default: "Roadmap")      |
| `className`            | `string`                   | No       | Additional CSS classes for the container       |
| `onExportStatusChange` | `function`                 | No       | Callback for export status updates             |

## Data Structure

The component expects data in the following format:

```typescript
// Roadmap structure
interface RoadmapStage {
  id: string;
  title: string;
  nodes: RoadmapNode[];
}

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
}

interface Resource {
  type: "video" | "article" | "project";
  title: string;
  link: string;
}
```

## Backend Integration Guide

### 1. Set up your API endpoint

Create an API endpoint that returns data in the format expected by the component:

```typescript
// Example API route in Next.js (pages/api/roadmap.ts)
import type { NextApiRequest, NextApiResponse } from "next";
import { RoadmapStage } from "@rave/types/roadmap-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoadmapStage[] | { error: string }>
) {
  try {
    // Fetch data from your database or external API
    const roadmapData = await fetchRoadmapFromDatabase();
    res.status(200).json(roadmapData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roadmap data" });
  }
}
```

### 2. Connect the component to your API

```tsx
"use client";

import { useState, useEffect } from "react";
import RoadmapDisplay from "../components/RoadmapDisplay";
import { RoadmapStage } from "@rave/types/roadmap-types";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapStage[] | string>(
    "Loading roadmap..."
  );
  const [exportStatus, setExportStatus] = useState({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch("/api/roadmap");

        if (!response.ok) {
          throw new Error("Failed to fetch roadmap data");
        }

        const data = await response.json();
        setRoadmap(data);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setRoadmap("Failed to load roadmap. Please try again later.");
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <RoadmapDisplay
        roadmap={roadmap}
        title="Development Roadmap"
        onExportStatusChange={(status, message) => {
          setExportStatus({ status, message: message || "" });
        }}
      />

      {/* Optional: Display export status somewhere else in your UI */}
      {exportStatus.status === "processing" && (
        <div className="mt-4 text-center text-amber-400">
          {exportStatus.message}
        </div>
      )}
    </div>
  );
}
```

### 3. Real-time updates (if needed)

If you want to implement real-time updates to the roadmap, consider using WebSockets or polling:

```tsx
// Using a simple polling approach
useEffect(() => {
  const fetchRoadmap = async () => {
    // Fetch implementation as shown above
  };

  // Initial fetch
  fetchRoadmap();

  // Set up polling every 30 seconds
  const intervalId = setInterval(fetchRoadmap, 30000);

  return () => clearInterval(intervalId);
}, []);
```

## Export Functionality

The component provides built-in export functionality:

- **PDF Export**: Creates a PDF file from the roadmap visualization
- **Image Export**: Creates a PNG image of the roadmap

You can customize the export filename by changing the `title` prop.

## Customization

The component uses Tailwind CSS classes and can be customized:

- Pass additional classes via the `className` prop
- Modify the component's styles directly in `RoadmapDisplay.tsx`
- Use custom theme colors that match your application

## Performance Considerations

- The roadmap rendering is optimized for performance with CSS-based animations
- Large roadmaps with many stages/nodes may impact export performance
- Consider implementing pagination or lazy loading for very large roadmaps

## Browser Compatibility

- Tested and compatible with modern browsers (Chrome, Firefox, Safari, Edge)
- Export functionality uses html2canvas and jsPDF which have good cross-browser support

## Troubleshooting

If you encounter issues:

1. Ensure your data structure matches the expected format
2. Check the browser console for any errors
3. Verify that the required dependencies (html2canvas, jsPDF) are installed
4. For export issues, ensure your server allows downloading files

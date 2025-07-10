"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import RoadmapDisplay from "../../chat/components/RoadmapDisplay";
import Sidenav from "../../chat/components/Sidenav/Sidenav";
import {
  ArrowLeft,
  Calendar,
  Target,
  Share2,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

// Define types for the roadmap data
type Resource = {
  type: string;
  title: string;
  link: string;
};

type Node = {
  id: string | number;
  title: string;
  description: string;
  resources: Resource[];
};

type Stage = {
  id: string | number;
  title: string;
  nodes: Node[];
};

type RoadmapData = {
  id: string;
  title: string;
  goal: string;
  roadmap: Stage[];
  created_at: string;
  user_id: string;
  is_public: boolean;
};

// Helper function to get API URL
const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return apiUrl;
};

const RoadmapPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get user and fetch roadmap data
  useEffect(() => {
    const fetchRoadmap = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        console.error("❌ No user found:", authError);
        setError("Authentication required");
        setLoading(false);
        return;
      }

      setUserId(user.id);

      try {
        const apiUrl = getApiUrl();
        const res = await fetch(
          `${apiUrl}/roadmap/${params.id}?userId=${user.id}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            setError("Roadmap not found");
          } else if (res.status === 403) {
            setError("You don't have permission to view this roadmap");
          } else {
            setError("Failed to load roadmap");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setRoadmapData(data);
      } catch (err) {
        console.error("❌ Error fetching roadmap:", err);
        setError("Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRoadmap();
    }
  }, [params.id]);

  // Handle roadmap deletion
  const handleDelete = async () => {
    if (!roadmapData || !userId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this roadmap? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(
        `${apiUrl}/roadmap/${roadmapData.id}?userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.push("/chat");
      } else {
        console.error("❌ Failed to delete roadmap");
        alert("Failed to delete roadmap. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error deleting roadmap:", err);
      alert("Error deleting roadmap. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle sharing toggle
  const handleTogglePublic = async () => {
    if (!roadmapData || !userId) return;

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/roadmap/${roadmapData.id}/public`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          isPublic: !roadmapData.is_public,
        }),
      });

      if (res.ok) {
        setRoadmapData((prev) =>
          prev ? { ...prev, is_public: !prev.is_public } : null
        );
      } else {
        console.error("❌ Failed to toggle public status");
        alert("Failed to update sharing settings. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error toggling public status:", err);
      alert("Error updating sharing settings. Please try again.");
    }
  };

  // Copy share link to clipboard
  const handleCopyLink = async () => {
    if (!roadmapData) return;

    const shareUrl = `${window.location.origin}/roadmap/${roadmapData.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("❌ Error copying to clipboard:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Link copied to clipboard!");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Sidenav currentRoadmapId={params.id as string} />
        <div className="ml-16 flex items-center justify-center h-screen p-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-b-2 border-sky-400"></div>
            <span className="text-base sm:text-lg">Loading roadmap...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Sidenav currentRoadmapId={params.id as string} />
        <div className="ml-16 flex items-center justify-center h-screen p-4">
          <div className="text-center max-w-md">
            <div className="text-red-400 text-5xl sm:text-6xl mb-4">⚠️</div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Error</h1>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => router.push("/chat")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Sidenav currentRoadmapId={params.id as string} />
        <div className="ml-16 flex items-center justify-center h-screen p-4">
          <div className="text-center max-w-md">
            <div className="text-gray-400 text-5xl sm:text-6xl mb-4">📋</div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">No Roadmap Found</h1>
            <p className="text-gray-400 mb-6">
              The requested roadmap could not be found.
            </p>
            <button
              onClick={() => router.push("/chat")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Sidenav currentRoadmapId={params.id as string} />

      <div className="ml-16 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-start sm:items-center gap-3 md:gap-4">
            <button
              onClick={() => router.push("/chat")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/30 transition-all duration-200 group flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-sky-400" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 break-words">
                {roadmapData.title}
              </h1>
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  {formatDate(roadmapData.created_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 flex-shrink-0" />
                  <span className="break-words">{roadmapData.goal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative mt-2 sm:mt-0">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/30 transition-all duration-200"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-white/10 z-50">
                <div className="p-2">
                  <button
                    onClick={handleTogglePublic}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{roadmapData.is_public ? "Make Private" : "Make Public"}</span>
                  </button>

                  {roadmapData.is_public && (
                    <button
                      onClick={handleCopyLink}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Copy Share Link</span>
                    </button>
                  )}

                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{isDeleting ? "Deleting..." : "Delete Roadmap"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status indicator */}
        {roadmapData.is_public && (
          <div className="mb-4 md:mb-6 p-3 bg-sky-900/20 border border-sky-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-sky-400">
              <Share2 className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                This roadmap is public and can be shared with others
              </span>
            </div>
          </div>
        )}

        {/* Roadmap Display */}
        <RoadmapDisplay
          roadmap={roadmapData.roadmap}
          title={roadmapData.title}
          className="w-full max-w-4xl mx-auto"
        />
      </div>

      {/* Click outside to close actions menu */}
      {showActions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default RoadmapPage;

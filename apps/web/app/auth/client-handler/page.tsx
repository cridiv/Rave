"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientAuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Processing your authentication...");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Debug what's in the URL
    console.log("URL in client handler:", window.location.href);
    console.log("Hash in client handler:", window.location.hash);

    const handleAuth = async () => {
      try {
        // Get URL components that might contain auth data
        const hash = window.location.hash;
        const error = searchParams.get("error");

        // Initialize Supabase client
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // First check if there's already a valid session
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          console.log("Already have a valid session");
          router.push("/chat");
          return;
        }

        // Check for errors in URL
        if (error) {
          console.error("Auth error from URL:", error);
          setMessage(`Authentication error: ${error}`);
          setIsProcessing(false);
          return;
        }

        // Check for hash-based auth data (#access_token=...)
        if (hash && hash.includes("access_token")) {
          console.log("Found hash with access_token");

          try {
            // Parse the hash to extract params (remove the leading #)
            const hashParams = new URLSearchParams(hash.substring(1));
            const accessToken = hashParams.get("access_token");
            const refreshToken = hashParams.get("refresh_token");

            if (!accessToken) {
              console.error("No access token found in hash");
              setMessage("No access token found in URL");
              setIsProcessing(false);
              return;
            }

            console.log("Found access token, setting session");

            // Set the session using the token from the hash
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });

            if (sessionError) {
              console.error("Error setting session:", sessionError);
              setMessage(`Error establishing session: ${sessionError.message}`);
              setIsProcessing(false);
              return;
            }

            // Success! Redirect to the chat page
            console.log("Successfully authenticated, redirecting to chat");
            router.push("/chat");
          } catch (hashError) {
            console.error("Error processing hash auth:", hashError);
            setMessage(
              `Error processing authentication data: ${hashError instanceof Error ? hashError.message : String(hashError)}`
            );
            setIsProcessing(false);
          }
        } else {
          // No auth data found
          console.log("No authentication data found");
          setMessage("No authentication data found in URL");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error in client auth handler:", error);
        setMessage(
          `Authentication error occurred: ${error instanceof Error ? error.message : String(error)}`
        );
        setIsProcessing(false);
      }
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-semibold mb-4">Authentication</h1>
      <p className="mb-4">{message}</p>
      {isProcessing ? (
        <div className="animate-pulse text-blue-500">Please wait...</div>
      ) : (
        <button
          onClick={() => router.push("/signin")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Return to Sign In
        </button>
      )}
    </div>
  );
}

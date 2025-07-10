"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function HandleAuthTokenPage() {
  const router = useRouter();

  useEffect(() => {
    const handleHashAuth = async () => {
      try {
        // Check if there's a hash with an access token
        const hash = window.location.hash;
        if (!hash || !hash.includes("access_token")) {
          // No hash or no access token, redirect to sign in
          router.push("/signin");
          return;
        }

        console.log("Found hash with access_token in home page");

        // Parse the hash to extract params (remove the leading #)
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (!accessToken) {
          console.error("No access token found in hash");
          router.push("/signin?error=no_access_token");
          return;
        }

        // Initialize Supabase client
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Set the session using the token from the hash
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || "",
        });

        if (sessionError) {
          console.error("Error setting session:", sessionError);
          router.push(
            `/signin?error=${encodeURIComponent(sessionError.message)}`
          );
          return;
        }

        // Success! Redirect to the chat page
        console.log(
          "Successfully authenticated via hash in home page, redirecting to chat"
        );
        router.push("/chat");
      } catch (error) {
        console.error("Error handling hash auth in home page:", error);
        router.push("/signin?error=auth_error");
      }
    };

    handleHashAuth();
  }, [router]);

  // Simple loading state while processing
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-semibold mb-4">Processing Authentication</h1>
      <div className="animate-pulse text-blue-500">Please wait...</div>
    </div>
  );
}

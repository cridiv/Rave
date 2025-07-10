"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function ClientAuthHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleHashBasedAuth = async () => {
      try {
        // This page handles hash-based authentication
        const hash = window.location.hash;

        if (hash && hash.includes("access_token")) {
          console.log("Processing hash-based authentication");

          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );

          // The hash contains the access token and other auth parameters
          // Supabase can directly handle this through setSession
          const { error } = await supabase.auth.getSession();

          if (error) {
            console.error("Error handling hash auth:", error);
            router.push("/signin?error=hash_auth_failed");
            return;
          }

          console.log("Successfully authenticated via hash");
          router.push("/chat");
        } else {
          console.log("No hash-based auth data found");
          router.push("/signin?error=no_auth_data");
        }
      } catch (error) {
        console.error("Error in client auth handler:", error);
        router.push("/signin?error=client_auth_error");
      }
    };

    handleHashBasedAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-semibold mb-4">
        Processing Authentication...
      </h1>
      <p>Please wait while we complete your sign-in.</p>
    </div>
  );
}

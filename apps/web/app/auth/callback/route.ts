import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Auth callback route called");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("Auth code:", code);
  console.log("Full URL:", requestUrl.toString());
  console.log("Search params:", requestUrl.searchParams.toString());

  if (code) {
    try {
      // Create a simplified version that works with Next.js cookies API
      const cookieStore = cookies();

      // Use a simpler pattern for the Supabase client
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name) {
              // Use type assertion to avoid TypeScript error
              return (cookieStore as any).get?.(name)?.value;
            },
            set: () => {}, // We'll handle cookies manually in the response
            remove: () => {}, // We'll handle cookies manually in the response
          },
        }
      );

      console.log("Attempting to exchange code for session");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code:", error);
        return NextResponse.redirect(
          new URL("/signin?error=auth_error", requestUrl.origin)
        );
      }

      console.log(
        "Successfully exchanged code for session:",
        data.session?.user?.email
      );

      // Create a response with the redirect
      const response = NextResponse.redirect(
        new URL("/chat", requestUrl.origin)
      );

      // For Next.js route handlers we need to return the response directly
      return response;
    } catch (error) {
      console.error("Error in auth callback:", error);
      return NextResponse.redirect(
        new URL("/signin?error=auth_callback_failed", requestUrl.origin)
      );
    }
  } else {
    console.log("No auth code found in URL");

    // When we don't have a code, we need to redirect directly to /auth/client-handler
    // without any additional logic, since we can't access the hash on the server

    // Redirect to client handler to process any hash fragments that might be present
    return NextResponse.redirect(
      new URL("/auth/client-handler", requestUrl.origin)
    );
  }
}

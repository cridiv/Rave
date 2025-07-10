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

    // When we don't have a code, we need to redirect directly to the client handler
    // without any additional logic, since we can't access the hash on the server

    // Check for special cases in the request URL
    const requestUrlString = request.url;

    // If this is already a signin page with error AND potentially a hash fragment,
    // we want to send to a special page that can handle direct token processing
    if (
      requestUrlString.includes("/signin") &&
      requestUrlString.includes("error=")
    ) {
      console.log(
        "Detected a signin page with error params - redirecting to token handler"
      );
      return NextResponse.redirect(
        new URL("/auth/handle-token", requestUrl.origin)
      );
    }

    // Get the URL of the client handler
    const clientHandlerUrl = new URL("/auth/client-handler", requestUrl.origin);

    // Preserve any query parameters from the original request
    // This ensures error parameters and other info is passed along
    requestUrl.searchParams.forEach((value, key) => {
      if (key !== "code") {
        // Skip the code param since we already know it's not there
        clientHandlerUrl.searchParams.set(key, value);
      }
    });

    // Redirect to client handler to process any hash fragments that might be present
    return NextResponse.redirect(clientHandlerUrl);
  }
}

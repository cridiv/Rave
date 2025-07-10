import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChatContainer from "./components/ChatContainer";
import Sidenav from "./components/Sidenav";

export default async function ChatPage() {
  // Use createServerClient from @supabase/ssr instead of createServerComponentClient
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          // Use type assertion to avoid TypeScript error
          return (cookieStore as any).get?.(name)?.value;
        },
        set: () => {}, // Not needed for this page
        remove: () => {}, // Not needed for this page
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex h-screen">
      <Sidenav />
      <div className="flex-1">
        <ChatContainer userId={user.id} />
      </div>
    </div>
  );
}

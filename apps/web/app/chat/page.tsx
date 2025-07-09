import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChatContainer from "./components/ChatContainer";
import Sidenav from "./components/Sidenav";

export default async function ChatPage() {
  const supabase = createServerComponentClient({ cookies });
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
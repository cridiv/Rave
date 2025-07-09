"use client";

import { Suspense } from "react";
import ChatContent from "./components/ChatContent";

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}

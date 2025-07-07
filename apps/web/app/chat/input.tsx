"use client";
import ChatContainer from "./components/ChatContainer";
import Sidenav from "./components/Sidenav";

const ChatPage = () => {
  return (
    <div className="flex h-screen relative">
      <Sidenav
        chatHistory={[
          { id: "1", title: "Frontend Developer Roadmap", date: "2023-05-15" },
          { id: "2", title: "Machine Learning Basics", date: "2023-05-20" },
          { id: "3", title: "Full-Stack Development Path", date: "2023-06-01" },
        ]}
      />
      <div className="flex-1 lg:ml-16 transition-all duration-300">
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatPage;

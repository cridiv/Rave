"use client";
import ChatContainer from "./components/ChatContainer";
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Sidenav from "./components/Sidenav";
import { useEffect, useState } from 'react';

const ChatPage = () => {
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get('roadmapId');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // First, check if there's a hash in the URL (OAuth callback)
        if (window.location.hash) {
          console.log('Processing hash authentication:', window.location.hash);
          
          // Extract the hash parameters
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken) {
            // Set the session manually
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });
            
            if (error) {
              console.error('Error setting session:', error);
              setLoading(false);
              return;
            }
            
            if (data.session?.user) {
              console.log('User authenticated successfully:', data.session.user);
              setUserId(data.session.user.id);
              setLoading(false);
              
              // Clean up the URL hash
              window.history.replaceState({}, document.title, window.location.pathname);
              return;
            }
          }
        }

        // If no hash, try to get existing session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setLoading(false);
          return;
        }

        if (data.session?.user) {
          console.log('User found in existing session:', data.session.user);
          setUserId(data.session.user.id);
        } else {
          console.log('No user in session');
          setUserId(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error handling auth:', error);
        setLoading(false);
      }
    };

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session);
        
        if (event === 'SIGNED_IN' && session) {
          setUserId(session.user.id);
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setUserId(null);
          setLoading(false);
        }
      }
    );

    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      handleAuth();
    }, 100);

    return () => subscription.unsubscribe();
  }, [supabase]);

  console.log('Current state - loading:', loading, 'userId:', userId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-4">Please log in to continue</p>
          <button 
            onClick={() => router.push('/signin')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen relative">
      <Sidenav
        initialChatHistory={[
          { id: "1", title: "Frontend Developer Roadmap", date: "2023-05-15" },
          { id: "2", title: "Machine Learning Basics", date: "2023-05-20" },
          { id: "3", title: "Full-Stack Development Path", date: "2023-06-01" },
        ]}
      />
      <div className="flex-1 lg:ml-16 transition-all duration-300">
        <ChatContainer userId={userId} roadmapId={roadmapId} />
      </div>
    </div>
  );
};

export default ChatPage;
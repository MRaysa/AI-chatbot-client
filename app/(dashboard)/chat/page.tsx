'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ChatProvider>
      <div className="flex h-screen overflow-hidden relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile, slide-in drawer */}
        <div
          className={`
            fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 transition-transform duration-300 ease-in-out
          `}
        >
          <ChatSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatWindow onMenuClick={() => setSidebarOpen(true)} />
        </div>
      </div>
    </ChatProvider>
  );
}

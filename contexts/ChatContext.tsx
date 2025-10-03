'use client';

import React, { createContext, useContext, useState } from 'react';
import { Chat, Message, ChatContextType } from '@/types/chat.types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const deleteChat = (chatId: string) => {
    setChats(chats.filter((c) => c.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(chats[0] || null);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentChat) {
      createNewChat();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Add user message
    const updatedChat = {
      ...currentChat!,
      messages: [...(currentChat?.messages || []), userMessage],
      title: currentChat?.messages.length === 0 ? content.slice(0, 30) : currentChat?.title || 'New Chat',
      updatedAt: new Date(),
    };

    setCurrentChat(updatedChat);
    setChats(chats.map((c) => (c.id === updatedChat.id ? updatedChat : c)));

    setLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated AI response to: "${content}". \n\nIn production, this will be replaced with actual AI responses from OpenAI or your chosen AI model.`,
        timestamp: new Date(),
      };

      const chatWithAI = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiMessage],
        updatedAt: new Date(),
      };

      setCurrentChat(chatWithAI);
      setChats(chats.map((c) => (c.id === chatWithAI.id ? chatWithAI : c)));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        loading,
        sendMessage,
        createNewChat,
        selectChat,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

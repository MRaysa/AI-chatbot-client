'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chat, Message, ChatContextType } from '@/types/chat.types';
import api from '@/lib/api';
import { useAuth } from './AuthContext';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load chats from backend
  const loadChats = async () => {
    try {
      const response = await api.get('/chats');
      const backendChats = response.data.data.chats.map((chat: any) => ({
        id: chat.id,
        title: chat.title,
        messages: [],
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
      }));
      setChats(backendChats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  };

  // Load messages for a chat
  const loadChatMessages = async (chatId: string) => {
    try {
      const response = await api.get(`/chats/${chatId}/messages`);
      return response.data.data.messages.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
      }));
    } catch (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
  };

  // Load chats on mount
  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  const createNewChat = async () => {
    try {
      const response = await api.post('/chats', { title: 'New Chat' });
      const newChat: Chat = {
        id: response.data.data.chat.id,
        title: response.data.data.chat.title,
        messages: [],
        createdAt: new Date(response.data.data.chat.createdAt),
        updatedAt: new Date(response.data.data.chat.updatedAt),
      };
      setChats([newChat, ...chats]);
      setCurrentChat(newChat);
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  const selectChat = async (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      // Load messages if not already loaded
      if (chat.messages.length === 0) {
        const messages = await loadChatMessages(chatId);
        chat.messages = messages;
        setChats(chats.map((c) => (c.id === chatId ? chat : c)));
      }
      setCurrentChat(chat);
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      await api.delete(`/chats/${chatId}`);
      setChats(chats.filter((c) => c.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(chats.length > 1 ? chats[0] : null);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const sendMessage = async (content: string) => {
    let chatToUse = currentChat;

    // Create new chat if none exists
    if (!chatToUse) {
      try {
        const response = await api.post('/chats', { title: 'New Chat' });
        chatToUse = {
          id: response.data.data.chat.id,
          title: response.data.data.chat.title,
          messages: [],
          createdAt: new Date(response.data.data.chat.createdAt),
          updatedAt: new Date(response.data.data.chat.updatedAt),
        };
        setChats([chatToUse, ...chats]);
        setCurrentChat(chatToUse);
      } catch (error) {
        console.error('Failed to create chat:', error);
        return;
      }
    }

    setLoading(true);

    try {
      // Send message to backend
      const response = await api.post(`/chats/${chatToUse.id}/messages`, {
        content,
      });

      const { userMessage, aiMessage, chat: updatedChatData } = response.data.data;

      // Create message objects
      const newUserMessage: Message = {
        id: userMessage.id,
        role: userMessage.role,
        content: userMessage.content,
        timestamp: new Date(userMessage.timestamp),
      };

      const newAiMessage: Message = {
        id: aiMessage.id,
        role: aiMessage.role,
        content: aiMessage.content,
        timestamp: new Date(aiMessage.timestamp),
      };

      // Update chat with new messages
      const updatedChat = {
        ...chatToUse,
        messages: [...chatToUse.messages, newUserMessage, newAiMessage],
        title: updatedChatData.title,
        updatedAt: new Date(updatedChatData.updatedAt),
      };

      setCurrentChat(updatedChat);
      setChats(chats.map((c) => (c.id === updatedChat.id ? updatedChat : c)));
    } catch (error: any) {
      console.error('Failed to send message:', error);

      // Show error message in chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Error: ${error.response?.data?.message || 'Failed to get AI response. Please try again.'}`,
        timestamp: new Date(),
      };

      if (chatToUse) {
        const updatedChat = {
          ...chatToUse,
          messages: [...chatToUse.messages, errorMessage],
        };
        setCurrentChat(updatedChat);
        setChats(chats.map((c) => (c.id === updatedChat.id ? updatedChat : c)));
      }
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

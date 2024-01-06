'use client';

import { useState, useEffect } from 'react';
import { NavbarNested } from '@/components/NavBarNested/NavbarNested';
import { ChatInstance } from '@/components/ChatInstance/ChatInstance';
import styles from './ChannelsPage.module.css';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  isFlaggedBully: boolean;
  chatUsers: ChatUser[];
  messages: Message[];
}

export interface ChatUser {
  userId: number;
  user: User;
  chatInstanceId: number;
  chatInstance: ChatInstance;
}

export interface Message {
  id: number;
  content: string;
  createdAt: Date;
  userId: number;
  user: User;
  chatInstanceId: number;
  chatInstance: ChatInstance;
  isScanned: boolean;
  isBully: boolean;
}

export interface ChatInstance {
  id: number;
  chatUsers: ChatUser[];
  messages: Message[];
}

export default function ChannelsPage() {
  const [currentChat, setCurrentChat] = useState<ChatInstance | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    const fetchChatInstance = async () => {
      if (selectedChatId === null) return;
      const response = await fetch(`/api/channels/${selectedChatId}`);
      const chatInstance = await response.json();
      setCurrentChat(chatInstance);
    };

    const intervalId = setInterval(fetchChatInstance, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedChatId]);

  const handleChatSelect = (chatData: ChatInstance) => {
    setSelectedChatId(chatData.id);
  };

  return (
    <div className={styles.container}>
      <NavbarNested onChatSelect={handleChatSelect} />
      {currentChat && <ChatInstance currentChat={currentChat} />}
    </div>
  );
}

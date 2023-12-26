'use client';

import React, { useState } from 'react';
import { Button, TextInput, ActionIcon, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { MessageHistory } from '@/components/MessageHistory/MessageHistory';
import styles from './ChatInstance.module.css';
import type { ChatInstance } from '@/app/channels/page';

export function ChatInstance(props: { currentChat: ChatInstance }) {
  const { currentChat } = props;
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')!));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from being submitted

    // Send a POST request with the chat ID and the message
    const response = await fetch(`/api/channels/${currentChat.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentChat, message, currentUser  }),
    });

    // Handle the response
    if (response.ok) {
      const isBully = await response.json();
      if (isBully) {
        alert('This message is considered bullying');
      }
      console.log('Message sent');
    } else {
      console.error('Failed to send message');
    }

    setMessage('');
  };

  return (
    <div className={styles.container}>
      <MessageHistory messages={currentChat.messages} />
      <form onSubmit={handleSendMessage}>
        <TextInput
          radius="xl"
          size="md"
          placeholder="Type your message"
          rightSectionWidth={42}
          rightSection={
            <ActionIcon size={32} radius="xl" variant="filled" onClick={handleSendMessage}>
              <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
          onChange={handleInputChange}
          value={message}
        />
        <Button type="submit" style={{ display: 'none' }}>
          Submit
        </Button>
      </form>
    </div>
  );
}

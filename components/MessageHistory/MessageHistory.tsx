import React from 'react';
import { Message } from '@/app/channels/page';

export function MessageHistory({ messages }: { messages: Message[] }) {
  return (
    <div>
      {messages && messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
    </div>
  );
}

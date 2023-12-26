'use client';

import React, { useEffect, useState } from 'react';
import { Group, Code, ScrollArea, rem } from '@mantine/core';
import Link from 'next/link';
import { IconGauge } from '@tabler/icons-react';
import { UserButton } from '@/components/UserButton/UserButton';
import { LinksGroup } from '@/components/NavbarLinksGroup/NavbarLinksGroup';
import { Logo } from './Logo';
import classes from './NavbarNested.module.css';
import { ChatInstance } from '@/app/channels/page';

const mockdata = [{ label: 'Chat Instance with User 2', icon: IconGauge }];

export function NavbarNested({ onChatSelect }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [chatInstances, setChatInstances] = useState<[] | ChatInstance[]>([]);

  useEffect(() => {
    const fetchChatInstances = async () => {
      const response = await fetch('/api/channels');
      const data = await response.json();

      // Get current user ID from localStorage
      const currentUserId = user.id;

      const modifiedData = data
        .filter((item) => item.chatUsers.some((user) => user.user.id === currentUserId))
        .map((item) => {
          // Find the other user in the chat
          const otherUser = item.chatUsers.find((user) => user.user.id !== currentUserId);

          return {
            label: otherUser ? `Chat Instance with User ${otherUser.user.id}` : 'Chat Instance',
            icon: IconGauge,
            id: item.id,
          };
        });

      setChatInstances(modifiedData);
    };

    fetchChatInstances();
  }, []);

  const links = chatInstances.map((item) => (
    <div
      onClick={() => onChatSelect(item)}
      onKeyDown={() => {}}
      key={item.id}
      role="button"
      tabIndex={0}
    >
      <LinksGroup {...item} />
    </div>
  ));

  if (chatInstances.length === 0) {
    return null;
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Link href="/">
            <Logo style={{ width: rem(120) }} />
          </Link>
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}

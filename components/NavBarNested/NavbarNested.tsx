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
  const [chatInstances, setChatInstances] = useState<[] | ChatInstance[]>([]);

  useEffect(() => {
    const fetchChatInstances = async () => {
      const response = await fetch('/api/channels');
      const data = await response.json();
      const modifiedData = data.map((item) => ({
        label: `Chat Instance with User ${item.chatUsers[1].user.id}`,
        icon: IconGauge,
        id: item.id,
      }));
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

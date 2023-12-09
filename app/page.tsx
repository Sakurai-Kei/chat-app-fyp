'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Group } from '@mantine/core';
import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { HeaderTabs } from '@/components/HeaderTabs/HeaderTabs';
import { About } from '@/components/About/About';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleLoginChange = (loginStatus: boolean) => {
    setIsLoggedIn(loginStatus);
  };

  return (
    <>
      <HeaderTabs onTabChange={handleTabChange} onLoginChange={handleLoginChange} />
      {currentTab === 'Home' && (
        <>
          <Welcome />
          <ColorSchemeToggle />
        </>
      )}
      {currentTab === 'About' && (
        <>
          <About />
        </>
      )}
      {isLoggedIn && (
        <Group justify="center" mt="xl">
          <Link href="/channels">
            <Button>Go to Chat App</Button>
          </Link>
        </Group>
      )}
    </>
  );
}

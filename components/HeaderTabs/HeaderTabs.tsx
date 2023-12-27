'use client';

import cx from 'clsx';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconHeart, IconChevronDown } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderTabs.module.css';
import LoginModal from '@/components/LoginModal/LoginModal';

const tabs = ['Home', 'About'];

export function HeaderTabs({
  onTabChange,
  onLoginChange,
}: {
  onTabChange: (tab: string) => void;
  onLoginChange: (loginStatus: boolean) => void;
}) {
  const theme = useMantineTheme();
  const [user, setUser] = useState(null);
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [tabValue, setTabValue] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    onLoginChange(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab} onClick={() => onTabChange(tab)}>
      {tab}
    </Tabs.Tab>
  ));

  const showLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <MantineLogo size={28} />

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          {isLoggedIn ? (
            // User is logged in, show user's information
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    <Avatar src={user?.image} alt={user?.name} radius="xl" size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user?.name}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Profile
                </Menu.Item>

                <Menu.Label>App Management</Menu.Label>

                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                >
                  <Link href="/admin">
                  <UnstyledButton>Admins</UnstyledButton>
                  </Link>
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>

                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                >
                  <UnstyledButton onClick={() => handleLogout()}>Logout</UnstyledButton>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            // User is not logged in, show login button
            <>
              <Button onClick={() => showLoginModal()}>Login</Button>
              <LoginModal
                open={isLoginModalOpen}
                onClose={() => showLoginModal()}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          )}
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          value={tabValue}
          onChange={(value) => setTabValue(value ?? 'Home')}
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}

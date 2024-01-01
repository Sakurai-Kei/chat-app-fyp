import React, { useState } from 'react';
import { Modal, Paper, TextInput, Button } from '@mantine/core';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function LoginModal({ open, onClose, setIsLoggedIn }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/users/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Handle successful login
      const user = await response.json();
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          image:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
        })
      );
      setIsLoggedIn(true);
      onClose();
    } else {
      // Handle error
      console.error('Login failed');
    }
  };

  return (
    <Modal opened={open} onClose={onClose}>
      <Paper>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </Paper>
    </Modal>
  );
}

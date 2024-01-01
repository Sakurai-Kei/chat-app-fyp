'use client';

import React, { useEffect, useState } from 'react';
import { Card, Text, Button } from '@mantine/core';

function Navbar({ users, onSelectUser }) {
  return (
    <div style={{ flex: 1 }}>
      {users.map((user, index) => (
        <Button
          style={{
            margin: 'auto',
            marginTop: index === 0 ? 0 : '0.5rem',
            marginBottom: index === users.length - 1 ? 0 : '0.5rem',
            width: '75%',
            display: 'block',
          }}
          key={user.id}
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </Button>
      ))}
    </div>
  );
}

function Content({ user }) {
  const [bulliedUsers, setBulliedUsers] = useState([]);
  const [bullyMessage, setBullyMessage] = useState(null);

  // Fetch the bullied users, risk level, and bully message here
  // This is just a placeholder and should be replaced with your actual fetching logic
  useEffect(() => {
    if (user) {
      // Fetch the bullied users
      const fetchBulliedUsers = async () => {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/users/bully/victim/${user.id}`);
        const data = await response.json();
        console.log('fetchBulliedUsers', data);
        setBulliedUsers(data);
      };

      // Fetch the bully message
      const fetchBullyMessage = async () => {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/users/bully/message/${user.id}`);
        const data = await response.json();
        console.log('fetchBullyMessage', data);
        setBullyMessage(data);
      };

      fetchBulliedUsers();
      fetchBullyMessage();
    }
  }, [user]);

  return (
    <div style={{ flex: 3 }}>
      {user ? (
        <>
          <Card shadow="xs" padding="md">
            <Text size="lg" weight={500}>
              Selected User:
            </Text>
            <p>{user.name}</p>
          </Card>
          <Card shadow="xs" padding="md">
            <Text size="lg" weight={500}>
              Bullied Users:
            </Text>
            {bulliedUsers.map((bulliedUser) => (
              <p key={bulliedUser.id}>{bulliedUser.name}</p>
            ))}
          </Card>
          <Card shadow="xs" padding="md">
            <Text size="lg" weight={500}>
              Risk Level:
            </Text>
            <p>{user.risk_level}</p>
          </Card>
          <Card shadow="xs" padding="md">
            <Text size="lg" weight={500}>
              Bully Message:
            </Text>
            <Card shadow="xs" padding="md">
              <Text size="lg" weight={500}>
                Bully Messages:
              </Text>
              {bullyMessage && bullyMessage.map((message, index) => (
                <div key={index}>
                  <p>Content: {message.content}</p>
                  <p>Created At: {message.createdAt}</p>
                  <p>User ID: {message.userId}</p>
                  <p>Chat Instance ID: {message.chatInstanceId}</p>
                  <p>Is Scanned: {message.isScanned ? 'Yes' : 'No'}</p>
                  <p>Is Bully: {message.isBully ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </Card>
          </Card>
        </>
      ) : null}
    </div>
  );
}

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Navbar users={users} onSelectUser={setSelectedUser} />
        <Content user={selectedUser} />
      </div>
    </div>
  );
}

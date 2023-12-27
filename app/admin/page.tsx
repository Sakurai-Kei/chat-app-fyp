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
  return (
    <div style={{ flex: 3 }}>
      {user ? (
        <Card shadow="xs" padding="md">
          <Text size="lg" weight={500}>
            Selected User:
          </Text>
          <p>{user.name}</p>
        </Card>
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

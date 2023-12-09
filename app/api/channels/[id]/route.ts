import { prisma } from '@/prisma/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const chatInstance = await prisma.chatInstance.findUnique({
    where: { id: Number(id) },
    include: {
      chatUsers: {
        include: {
          user: true,
        },
      },
      messages: true,
    },
  });
  return new Response(JSON.stringify(chatInstance), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function HEAD(request: Request) {
  // Implement your HEAD request handler here
}

export async function POST(request: Request) {
  // Parse the request body
  const { message } = await request.json();

  // Send the message to localhost:5000
  const response = await fetch('http://localhost:5000/detect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  // Handle the response
  if (!response.ok) {
    throw new Error('Failed to send message to localhost:5000');
  }

  // Save the message in the database
  // const newMessage = await prisma.message.create({
  //   data: {
  //     content: message,
  //     chatInstanceId: Number(id),
  //   },
  // });

  return new Response(JSON.stringify(await response.json()), {
    headers: { 'Content-Type': 'application/json' },
  });
}

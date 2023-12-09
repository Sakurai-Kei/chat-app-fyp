import { prisma } from '@/prisma/prisma';

export async function GET(request: Request) {
  const chatInstances = await prisma.chatInstance.findMany({
    include: {
      chatUsers: {
        include: {
          user: true,
        },
      },
      messages: true,
    },
  });
  return new Response(JSON.stringify(chatInstances), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function HEAD(request: Request) {
  // Implement your HEAD request handler here
}

export async function POST(request: Request) {
  // Implement your POST request handler here
}
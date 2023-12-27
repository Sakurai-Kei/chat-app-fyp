import { prisma } from '@/prisma/prisma';

export async function GET(request: Request) {
    const users = await prisma.user.findMany({
      include: {
        chatUsers: {
          include: {
            user: true,
          },
        },
        messages: true,
      },
    });
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
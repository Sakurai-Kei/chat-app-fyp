import { prisma } from '@/prisma/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch the messages where the user is the bully
  const bullyMessages = await prisma.message.findMany({
    where: {
      userId: Number(id),
      isBully: true,
    },
    include: {
      chatInstance: {
        include: {
          chatUsers: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  // Extract the bullied users from the bully messages
  const bulliedUsers = bullyMessages.flatMap((message) =>
    message.chatInstance.chatUsers
      .map((chatUser) => chatUser.user)
      .filter((user) => user.id !== Number(id))
  );

  // Remove duplicates
  const uniqueBulliedUsers = Array.from(new Set(bulliedUsers.map((user) => user.id))).map((id) =>
    bulliedUsers.find((user) => user.id === id)
  );

  return new Response(JSON.stringify(uniqueBulliedUsers), {
    headers: { 'Content-Type': 'application/json' },
  });
}

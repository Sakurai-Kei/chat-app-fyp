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

export async function POST(request: Request) {
  // Parse the request body
  const { currentChat, message, currentUser } = await request.json();

  // Save the message to the database
  const savedMessage = await prisma.message.create({
    data: {
      content: message,
      userId: currentUser.id,
      chatInstanceId: currentChat.id,
    },
  });

  // Send the message to localhost:5000 in the background
  setImmediate(async () => {
    try {
      const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      // Handle the response
      if (!response.ok) {
        throw new Error('Failed to send message to localhost:5000');
      }

      // Update the message in the database with the response
      const detectionResult = await response.json();
      const { isBully } = detectionResult;
      await prisma.message.update({
        where: { id: savedMessage.id },
        data: { isBully, isScanned: true },
      });
    } catch (error) {
      console.error('Error sending message to localhost:5000:', error);
    }
  });

  return new Response(JSON.stringify(savedMessage), {
    headers: { 'Content-Type': 'application/json' },
  });
}

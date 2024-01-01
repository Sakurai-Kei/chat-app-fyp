import { prisma } from '@/prisma/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch the bully messages by the user
  const bullyMessages = await prisma.message.findMany({
    where: {
      userId: Number(id),
      isBully: true,
    },
  });

  return new Response(JSON.stringify(bullyMessages), {
    headers: { 'Content-Type': 'application/json' },
  });
}

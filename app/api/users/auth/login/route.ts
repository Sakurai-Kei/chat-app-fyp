import { prisma } from '@/prisma/prisma';

export async function POST(req: Request) {
  const res = await req.json();
  const { email, password } = res;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const { password, ...userWithoutPassword } = user;

    // Compare password with the one stored in the database
    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Login successful
    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

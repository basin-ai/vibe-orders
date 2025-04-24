import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from "@/lib/configs/authOptions";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { content, receiverId } = await request.json();

    if (!content || !receiverId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.email,
        receiverId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
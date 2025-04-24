import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { pusher } from '@/lib/pusher';

export interface chatContext {
  params: {
    chatId: string;
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const session = await getServerSession();
  const { chatId } = await params // 'a', 'b', or 'c'
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return NextResponse.json(messages);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const session = await getServerSession();
  const { chatId } = await params // 'a', 'b', or 'c'
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { content } = await request.json();

  const message = await prisma.message.create({
    data: {
      content,
      chatId: chatId,
      senderId: session.user.email,
      receiverId: session.user.email,
    },
    include: {
      sender: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  await pusher.trigger(`chat-${chatId}`, 'new-message', message);

  return NextResponse.json(message);
}
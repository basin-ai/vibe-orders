import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const session = await getServerSession();
  const { chatId } = await params // 'a', 'b', or 'c'
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const chat = await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      archived: true,
    },
  });

  return NextResponse.json(chat);
}
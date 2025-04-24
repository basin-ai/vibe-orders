import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from "@/lib/configs/authOptions";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  console.log(request);
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get all messages where the user is either sender or receiver
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.user.email },
          { receiverId: session.user.email },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Group messages by chat participants
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const chats = messages.reduce((acc: any, message: any) => {
      const otherUserId = message.senderId === session.user?.email
        ? message.receiverId
        : message.senderId;
      
      const otherUser = message.senderId === session.user?.email
        ? message.receiver
        : message.sender;

      if (!acc[otherUserId]) {
        acc[otherUserId] = {
          userId: otherUserId,
          userName: otherUser.name || 'Unknown User',
          messages: [],
          archived: false,
        };
      }

      acc[otherUserId].messages.push({
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        receiverId: message.receiverId,
        createdAt: message.createdAt.toISOString(),
      });

      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(Object.values(chats));
  } catch (error) {
    console.error('Error fetching chats:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

export default async function InboxPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) return null;

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          email: session.user.email
        }
      },
      archived: false
    },
    include: {
      users: true,
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-1/3 border-r bg-white">
        <ChatList chats={chats} userId={session.user.email} />
      </div>
      <div className="w-2/3 bg-white">
        <ChatWindow userId={session.user.email} />
      </div>
    </div>
  );
}
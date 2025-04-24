'use client';

import { Chat, User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

type ChatWithUsersAndMessages = Chat & {
  users: User[];
  messages: { content: string; createdAt: Date }[];
};

export default function ChatList({
  chats,
  userId,
}: {
  chats: ChatWithUsersAndMessages[];
  userId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentChatId = searchParams.get('chatId');

  const handleChatClick = (chatId: string) => {
    router.push(`/dashboard/inbox?chatId=${chatId}`);
  };

  const handleArchiveChat = async (chatId: string) => {
    await fetch(`/api/chats/${chatId}/archive`, {
      method: 'PUT',
    });
    router.refresh();
  };

  return (
    <div className="h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {chats.map((chat) => {
          const otherUser = chat.users.find(user => user.id !== userId);
          const lastMessage = chat.messages[0];
          
          return (
            <div
              key={chat.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                currentChatId === chat.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{otherUser?.name || otherUser?.email}</h3>
                  {lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage.content}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArchiveChat(chat.id);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Archive
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
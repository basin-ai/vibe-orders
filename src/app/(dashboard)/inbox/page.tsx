'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
};

type Chat = {
  userId: string;
  userName: string;
  messages: Message[];
  archived: boolean;
};

export default function Inbox() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chats');
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: selectedChat,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchChats(); // Refresh chats to show new message
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const archiveChat = async (userId: string) => {
    try {
      await fetch(`/api/chats/${userId}/archive`, {
        method: 'POST',
      });
      fetchChats(); // Refresh chats to update UI
    } catch (error) {
      console.error('Failed to archive chat:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-3 h-[600px]">
        {/* Chat List */}
        <div className="col-span-1 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(600px-64px)]">
            {chats.filter(chat => !chat.archived).map((chat) => (
              <div
                key={chat.userId}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.userId ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedChat(chat.userId)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{chat.userName}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveChat(chat.userId);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Archive
                  </button>
                </div>
                {chat.messages[0] && (
                  <p className="text-sm text-gray-500 truncate">
                    {chat.messages[0].content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-span-2">
          {selectedChat ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  {chats.find((c) => c.userId === selectedChat)?.userName}
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chats
                  .find((c) => c.userId === selectedChat)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === session?.user?.email
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === session?.user?.email
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
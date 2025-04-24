import { authOptions } from '@/lib/configs/authOptions';
import { getServerSession } from 'next-auth/next';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Welcome, {session?.user?.name || 'User'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-blue-900 mb-2">Inbox</h2>
          <p className="text-blue-700 mb-4">
            Communicate with your delivery partners through our secure messaging system.
          </p>
          <a
            href="/inbox"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Go to Inbox
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-green-900 mb-2">Settings</h2>
          <p className="text-green-700 mb-4">
            Customize your profile and manage your account preferences.
          </p>
          <a
            href="/settings"
            className="inline-flex items-center text-green-600 hover:text-green-800"
          >
            Manage Settings
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
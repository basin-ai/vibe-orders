import { getServerSession } from 'next-auth/next';

export default async function Dashboard() {
  const session = await getServerSession();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome back, {session?.user?.email}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h2>
          <div className="space-y-4">
            <a href="/dashboard/inbox" className="block text-indigo-600 hover:text-indigo-500">
              → Check your messages
            </a>
            <a href="/dashboard/settings" className="block text-indigo-600 hover:text-indigo-500">
              → Update your profile
            </a>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h2>
          <p className="text-gray-600">No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
}
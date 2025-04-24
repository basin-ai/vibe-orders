import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">VibeOrders</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link href="/signup" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your Delivery Schedule
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Manage your deliveries effortlessly with our intelligent scheduling system.
              Connect with delivery partners and track your orders in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-lg">
                Get Started
              </Link>
              <Link href="#features" 
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 text-lg">
                Learn More
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Smart Scheduling</h3>
                <p className="text-gray-600">Optimize delivery routes and times with our intelligent scheduling system.</p>
              </div>
              <div className="p-6 border rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Real-time Updates</h3>
                <p className="text-gray-600">Stay informed with instant notifications and delivery status updates.</p>
              </div>
              <div className="p-6 border rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Team Messaging</h3>
                <p className="text-gray-600">Communicate efficiently with delivery partners through our built-in messaging system.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>© 2024 VibeOrders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

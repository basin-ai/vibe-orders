import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-8">
            <span className="block">Transform Your</span>
            <span className="block text-blue-600">Delivery Business</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            VibeOrders helps you streamline communication, automate scheduling, and boost efficiency in your delivery operations. Join thousands of businesses already delivering smarter.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/auth/signin"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link
              href="#features"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-lg border-2 border-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful features designed to help you manage deliveries more efficiently</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Scheduling</h3>
            <p className="text-gray-600 leading-relaxed">Intelligent delivery scheduling with automated route optimization and real-time adjustments</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="h-16 w-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Tracking</h3>
            <p className="text-gray-600 leading-relaxed">Monitor deliveries in real-time with instant notifications and status updates for all stakeholders</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="h-16 w-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Communication</h3>
            <p className="text-gray-600 leading-relaxed">End-to-end encrypted messaging system for seamless coordination with delivery partners</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Delivery Operations?</h2>
          <p className="text-xl mb-12 opacity-90">
            Join over 10,000 businesses that trust VibeOrders to manage their deliveries efficiently
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/auth/signin"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Start Free Trial
            </Link>
            <Link
              href="#features"
              className="text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg w-full sm:w-auto"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

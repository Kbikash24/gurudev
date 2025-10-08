import Navigation from '../../components/Navigation';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Connect with Us
          </h1>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-yellow-100">
            <div className="text-gray-700 space-y-6 leading-relaxed text-lg">
              <p>Connect with us for spiritual guidance and support on your journey.</p>
              <p>We welcome seekers from all backgrounds and traditions who are genuinely interested in spiritual growth and understanding.</p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-orange-600 mb-2">Spiritual Guidance</h3>
                  <p className="text-sm">Use the question form on the home page</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-red-600 mb-2">General Inquiries</h3>
                  <p className="text-sm">Coming soon...</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-yellow-600 mb-2">Community</h3>
                  <p className="text-sm">Join our spiritual community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
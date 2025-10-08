import Navigation from '../../components/Navigation';

export default function Wisdom() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Wisdom Teachings
          </h1>
          
          <div className="text-gray-700 space-y-6 leading-relaxed">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-orange-100">
              <p className="text-lg mb-6">
                Sri Sri Ravi Shankar's wisdom teachings emphasize the importance of inner peace, meditation, and living with compassion and joy. His philosophy blends ancient spiritual practices with practical guidance for modern life.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-orange-600">Core Teachings:</h3>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span>Breath and meditation for stress relief</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Living with love, compassion, and service</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Harmony between ancient wisdom and modern science</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Spiritual Growth:</h3>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span>Self-awareness and inner transformation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Finding joy and purpose in everyday life</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Peace, non-violence, and global harmony</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
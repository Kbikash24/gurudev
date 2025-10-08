import Navigation from '../../components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            About Gurudev
          </h1>
          
          <div className="text-gray-700 space-y-6 leading-relaxed text-lg">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-orange-100">
              <p className="mb-4">
                Gurudev, Sri Sri Ravi Shankar is a renowned Indian guru and spiritual leader, celebrated worldwide for his teachings on meditation, peace, and human values.
              </p>
              <p className="mb-4">
                He is the founder of the Art of Living Foundation, which has inspired millions through programs that promote stress-free living, inner happiness, and social service.
              </p>
              <p>
                His vision is to create a violence-free, stress-free society by fostering love, compassion, and practical spirituality that can be integrated into daily life.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
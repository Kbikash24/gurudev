'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BlogCard from '../components/BlogCard';

const SUGGESTED_QUESTIONS = [
  'How can I cultivate unconditional love in my relationships?',
  'What are the most effective techniques for overcoming stress and anxiety?',
  'How can I use spirituality to improve my success in business or my chosen career?',
  'What is the best way to handle conflict in personal relationships or the workplace?',
  'How can I deepen my meditation practice and experience greater inner peace?',
  'What are some practical steps I can take to live a more joyful and fulfilling life?',
  'How can I develop greater self-awareness and overcome self-doubt?',
  'What advice do you have for navigating the challenges of modern life, such as social media and globalization?',
  'How can I contribute more meaningfully to society and make a positive impact on the world?'
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'blogs', label: 'Blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { id: 'about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'wisdom', label: 'Wisdom', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
];

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsPagination, setBlogsPagination] = useState({});

  const fetchBlogs = async (page = 1, pageSize = 40) => {
    setBlogsLoading(true);
    try {
      const response = await fetch('https://vhub-search-191432963656.asia-south2.run.app/vedasis/public/get_docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          creator_id: 'rishinityapragya',
          page: page,
          page_size: pageSize
        })
      });

      const data = await response.json();
      setBlogs(data?.documents || []);
      setBlogsPagination(data?.pagination || {});
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  // Effect to fetch blogs when blogs tab is selected
  useEffect(() => {
    if (activeSection === 'blogs' && blogs.length === 0) {
      fetchBlogs();
    }
  }, [activeSection]);

  const handleAsk = async (newQuestion) => {
    const query = (typeof newQuestion === 'string' ? newQuestion : question).trim();

    if (!query) {
      return;
    }

    if (query !== question) {
      setQuestion(query);
    }

    setLoading(true);
    setAnswer('');
    setRelatedQuestions([]);
    setShowSuggestions(false);

    try {
      const response = await fetch('https://vhub-search-191432963656.asia-south2.run.app/vedasis/public/ai_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          creator_id: 'gurudev',
          html_response: true,
          search_query: query
        })
      });

      const data = await response.json();
      setAnswer(data?.result ?? '');

      try {
        const suggestionsResponse = await fetch('https://vhub-search-191432963656.asia-south2.run.app/vedasis/public/search_suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creator_id: 'gurudev',
            search_query: query
          })
        });

        const suggestionsData = await suggestionsResponse.json();
        if (Array.isArray(suggestionsData?.result)) {
          setRelatedQuestions(suggestionsData.result);
        } else {
          setRelatedQuestions([]);
        }
      } catch {
        setRelatedQuestions([]);
      }
    } catch (error) {
      setAnswer('<div class="error">Sorry, there was an error getting your answer. Please try again.</div>');
    } finally {
      setLoading(false);
    }
  };

  const renderNavContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">About Gurudev</h2>
            <div className="text-gray-700 space-y-6 leading-relaxed text-lg">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-orange-100">
                <p className="mb-4">Gurudev, Sri Sri Ravi Shankar is a renowned Indian guru and spiritual leader, celebrated worldwide for his teachings on meditation, peace, and human values.</p>
                <p className="mb-4">He is the founder of the Art of Living Foundation, which has inspired millions through programs that promote stress-free living, inner happiness, and social service.</p>
                <p>His vision is to create a violence-free, stress-free society by fostering love, compassion, and practical spirituality that can be integrated into daily life.</p>
              </div>
            </div>
          </div>
        );
      case 'wisdom':
        return (
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">Wisdom Teachings</h2>
            <div className="text-gray-700 space-y-6 leading-relaxed">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-orange-100">
                <p className="text-lg mb-6">Sri Sri Ravi Shankar's wisdom teachings emphasize the importance of inner peace, meditation, and living with compassion and joy. His philosophy blends ancient spiritual practices with practical guidance for modern life.</p>
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
        );
      case 'blogs':
        return (
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Sacred Teachings & Divine Guidance
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Immerse yourself in timeless wisdom and spiritual insights that guide seekers toward truth, inner peace, and divine consciousness
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
            </div>

            {/* Loading State */}
            {blogsLoading && (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            )}

            {/* Blogs Grid */}
            {!blogsLoading && blogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={`${blog.url}-${index}`}
                    content={blog.content}
                    url={blog.url}
                    updated_at={blog.updated_at}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!blogsLoading && blogs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No teachings available</h3>
                <p className="text-gray-500">Please check back later for new spiritual insights.</p>
              </div>
            )}

            {/* Pagination Info */}
            {!blogsLoading && blogs.length > 0 && blogsPagination && (
              <div className="text-center py-4">
                <p className="text-gray-500">
                  Showing {blogs.length} of {blogsPagination.total_documents} teachings
                </p>
              </div>
            )}
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">Connect with Us</h2>
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
                    <p className="text-sm">Use the question form above</p>
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
        );
      default:
        return (
          <div className="text-center space-y-8 animate-fade-in">
            {/* Main Hero Section */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-yellow-200 to-white rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="relative flex justify-center">
                  <div className="relative w-36 h-36 animate-float">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full blur-2xl opacity-50 animate-sacred-glow"></div>
                    <Image
                      src="/logo.png"
                      alt="Ask Gurujdev - Spiritual Guidance"
                      width={144}
                      height={144}
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 tracking-tight">
                  Ask <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent animate-gradient-shift">Gurudev</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                  Get personalized spiritual guidance from Gurudev's extensive knowledge and
                  <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-medium">divine wisdom</span>
                </p>
              </div>
            </div>

            {/* Search Section */}
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center p-6">
                    <div className="flex-shrink-0 p-4">
                      <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                      placeholder="Ask your question about spiritual guidance..."
                      className="flex-1 text-lg text-gray-700 placeholder-gray-500 border-none outline-none bg-transparent font-medium"
                    />
                    <button
                      onClick={handleAsk}
                      disabled={loading || !question.trim()}
                      className="ml-6 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:shadow-none"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5">
                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <span>Seeking...</span>
                        </div>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <span>Ask</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Mobile Layout */}
                  <div className="sm:hidden p-4 space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50/50 rounded-2xl">
                      <svg className="w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                        placeholder="Ask your spiritual question..."
                        className="flex-1 text-base text-gray-700 placeholder-gray-500 border-none outline-none bg-transparent font-medium"
                      />
                    </div>
                    <button
                      onClick={handleAsk}
                      disabled={loading || !question.trim()}
                      className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:shadow-none text-lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-5 h-5">
                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                          <span>Seeking Guidance...</span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <span>Ask Gurudev</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-6">
                <p className="text-gray-500 text-sm font-medium tracking-wide">🧘‍♀️ Try asking about:</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {showSuggestions &&
                    SUGGESTED_QUESTIONS.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleAsk(suggestion)}
                        className="group px-6 py-3 bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-600 hover:text-orange-700 rounded-full text-sm transition-all duration-300 border border-gray-200/50 hover:border-orange-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <span className="flex items-center space-x-2">
                          <span>{suggestion}</span>
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Answer Section */}
              {(loading || answer) && (
                <div className="mt-12 space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-yellow-100 to-red-100 rounded-3xl blur-xl opacity-70"></div>
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                      {loading ? (
                        <div className="text-center py-20 px-8">
                          <div className="relative mb-10">
                            <div className="w-56 h-56 mx-auto relative">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-200 to-red-200 blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>
                              <div className="absolute inset-3 rounded-full border border-orange-300/30 animate-spin" style={{ animationDuration: '20s' }}></div>
                              <div className="absolute inset-6 rounded-full border border-yellow-400/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                              <div className="absolute inset-9 rounded-full border border-red-300/30 animate-spin" style={{ animationDuration: '12s' }}></div>
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                                  style={{
                                    top: '50%',
                                    left: '50%',
                                    transformOrigin: '0 0',
                                    animation: `energy-flow 8s linear infinite ${i}s`
                                  }}
                                />
                              ))}
                              <div className="absolute inset-12 rounded-full border-2 border-orange-400/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
                              <div className="absolute inset-16 rounded-full border-2 border-yellow-400/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                              <div className="absolute inset-20 rounded-full border-2 border-red-400/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                            </div>
                          </div>
                          {/* <h3 className="text-3xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">ॐ Channeling Divine Wisdom ॐ</h3> */}
                          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">Getting your Answer...</p>
                        </div>
                      ) : (
                        <div className="p-8">
                          <div className="mb-6">
                            
                            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full "></div>
                          </div>
                          <div
                            className="spiritual-answer-content prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: `
                                <style>
                                  .spiritual-answer-content .content { padding: 0 !important; }
                                </style>
                                ${answer
                                  .replace(/```html|```/g, '')
                                  .replace(/<style[^>]*>.*?<\/style>/gs, '')
                                  .replace(/<link[^>]*>/g, '')
                                  .replace(/<!DOCTYPE[^>]*>/g, '')
                                  .replace(/<html[^>]*>/g, '')
                                  .replace(/<\/html>/g, '')
                                  .replace(/<head[^>]*>.*?<\/head>/gs, '')
                                  .replace(/<body[^>]*>/g, '')
                                  .replace(/<\/body>/g, '')
                                }
                              `
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {relatedQuestions.length > 0 && !loading && (
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-gray-700 text-center">✨ Explore Related Wisdom</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {relatedQuestions.map((relatedQ, index) => (
                          <button
                            key={index}
                            onClick={() => handleAsk(relatedQ)}
                            className="group p-6 bg-gradient-to-br from-white/80 to-orange-50/80 backdrop-blur-sm hover:from-white/90 hover:to-orange-50/90 rounded-2xl text-left transition-all duration-300 shadow-lg hover:shadow-xl border border-orange-100 hover:border-orange-200 transform hover:-translate-y-1"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-700 group-hover:text-orange-700 transition-colors duration-200 font-medium leading-relaxed">{relatedQ}</p>
                                <div className="mt-2 flex items-center text-orange-500 group-hover:text-orange-600 transition-colors duration-200">
                                  <span className="text-sm font-medium">Ask this →</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-[-32.5%] w-136 h-136 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" />
            <path d="M50,5 L86.6,75 L13.4,75 Z" fill="none" stroke="url(#gradient1)" strokeWidth="0.3" />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#eab308" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-56 h-56 opacity-10 hidden md:block">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-reverse">
            <polygon points="50,5 61.8,38.2 95,38.2 69.1,61.8 80.9,95 50,72.4 19.1,95 30.9,61.8 5,38.2 38.2,38.2" fill="none" stroke="url(#gradient2)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#gradient2)" strokeWidth="0.3" />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100/50 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div
                onClick={() => setActiveSection('home')}
                className="flex items-center space-x-3 cursor-pointer group py-2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/logo.png"
                      alt="Ask Gurudev Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:via-red-700 group-hover:to-yellow-700 transition-all duration-300">
                  Ask Gurudev
                </span>
              </div>

              <div className="hidden md:flex space-x-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`group relative px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium rounded-xl transition-all duration-300 ${activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="hidden lg:inline">{item.label}</span>
                      <span className="lg:hidden text-xs">{item.label}</span>
                    </div>
                    {activeSection !== item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="md:hidden">
                <button className="p-2 text-gray-600 hover:text-orange-600 rounded-xl hover:bg-orange-50/50 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {renderNavContent()}
        </main>
      </div>
    </div>
  );
}

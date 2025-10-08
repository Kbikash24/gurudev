'use client';

import { useRouter } from "next/navigation";

export default function BlogCard({ content, url, updated_at }) {
    const router =useRouter()
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleCardClick = () => {
    // For now, we'll just console.log the URL, but you can implement navigation later
    // You can implement navigation here when you have individual blog pages
    // window.open(`/blogs/${url}`, '_blank');
    router.push(`/blogs/${url}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:scale-105"
    >
      {/* Sacred Wisdom Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            Sacred Wisdom
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(updated_at)}
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-700 transition-colors duration-300 line-clamp-2">
          {content}
        </h3>
      </div>

      {/* Explore Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
          <span className="text-sm font-medium">Explore</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Readers count placeholder */}
        <div className="flex items-center space-x-1 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm">
            {Math.floor(Math.random() * 1000) + 100} seekers
          </span>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';

export default function BlogDetail() {
  const params = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogContent = async () => {
      if (!params?.id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://vhub-search-191432963656.asia-south2.run.app/vedasis/public/get_question_by_url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            creator_id: 'rishinityapragya',
            url: params.id
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog content');
        }

        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blog content:', error);
        setError('Failed to load blog content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [params?.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sanitizeHtmlContent = (htmlContent) => {
    if (!htmlContent) return '';
    
    // Remove DOCTYPE, html, head, body tags and replace with our custom styling
    return htmlContent
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head[^>]*>.*?<\/head>/gis, '')
      .replace(/<body[^>]*>/gi, '')
      .replace(/<\/body>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gis, '')
      .replace(/<link[^>]*>/gi, '')
      .trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Loading State */}
            <div className="flex justify-center items-center py-20">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
                <p className="text-gray-600 text-lg">Loading spiritual guidance...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Error State */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-red-100">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Not Found</h2>
              <p className="text-gray-600 mb-8">{error || 'The requested spiritual guidance could not be found.'}</p>
              <Link 
                href="/blogs"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Teachings</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/blogs"
              className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Sacred Teachings</span>
            </Link>
          </div>

          {/* Blog Content */}
          <article className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {blogData.source_name || blogData.content}
                </h1>
                <div className="flex items-center space-x-4 text-orange-100">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Published on {formatDate(blogData.created_at)}</span>
                  </div>
                  {blogData.updated_at !== blogData.created_at && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Updated {formatDate(blogData.updated_at)}</span>
                    </div>
                  )}
                </div>
                
                {/* Question/Content */}
                {blogData.content && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6">
                    <p className="text-lg italic">{blogData.content}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8">
              <div 
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      .blog-content {
                        color: #374151;
                        line-height: 1.8;
                      }
                      .blog-content .container {
                        max-width: 100% !important;
                        padding: 0 !important;
                        background: none !important;
                        border-radius: 0 !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                      }
                      .blog-content h1 {
                        color: #ea580c;
                        font-size: 2.5rem;
                        font-weight: 700;
                        margin-bottom: 1.5rem;
                        margin-top: 2rem;
                        border-bottom: 3px solid #fed7aa;
                        padding-bottom: 0.5rem;
                        display: flex;
                        align-items: center;
                      }
                      .blog-content h2 {
                        color: #dc2626;
                        font-size: 2rem;
                        font-weight: 600;
                        margin-top: 2.5rem;
                        margin-bottom: 1rem;
                        display: flex;
                        align-items: center;
                      }
                      .blog-content h3 {
                        color: #ea580c;
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-top: 2rem;
                        margin-bottom: 0.75rem;
                        display: flex;
                        align-items: center;
                      }
                      .blog-content .emoji {
                        margin-right: 0.75rem;
                        font-size: 1.2em;
                      }
                      .blog-content p {
                        margin-bottom: 1.25rem;
                        font-size: 1.1rem;
                      }
                      .blog-content ol, .blog-content ul {
                        margin: 1.5rem 0;
                        padding-left: 2rem;
                      }
                      .blog-content li {
                        margin-bottom: 1rem;
                        font-size: 1.1rem;
                      }
                      .blog-content strong {
                        color: #dc2626;
                        font-weight: 600;
                      }
                      .blog-content a {
                        color: #ea580c;
                        text-decoration: none;
                        font-weight: 500;
                        border-bottom: 1px solid transparent;
                        transition: all 0.2s ease;
                      }
                      .blog-content a:hover {
                        border-bottom-color: #ea580c;
                      }
                      .blog-content .youtube-embed {
                        margin: 3rem 0;
                        text-align: center;
                        background: linear-gradient(135deg, #fef3c7, #fed7aa);
                        padding: 2rem;
                        border-radius: 1rem;
                        border: 2px solid #fbbf24;
                      }
                      .blog-content .youtube-embed iframe {
                        width: 100%;
                        max-width: 100%;
                        height: 400px;
                        border-radius: 0.75rem;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                      }
                      .blog-content .youtube-caption {
                        margin-top: 1rem;
                        font-size: 0.95rem;
                        color: #7c2d12;
                        font-weight: 500;
                      }
                      .blog-content blockquote {
                        border-left: 4px solid #f97316;
                        background: linear-gradient(135deg, #fff7ed, #ffedd5);
                        padding: 1.5rem;
                        margin: 2rem 0;
                        border-radius: 0.5rem;
                        font-style: italic;
                        color: #9a3412;
                      }
                    </style>
                    ${sanitizeHtmlContent(blogData.response)}
                  `
                }}
              />
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 border-t border-orange-100">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-2 text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-lg font-semibold">May this wisdom guide you on your spiritual journey</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link 
                    href="/blogs"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Explore More Teachings</span>
                  </Link>
                  
                  <Link 
                    href="/"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-orange-600 font-semibold rounded-lg border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ask Gurudev</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
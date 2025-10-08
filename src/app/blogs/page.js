'use client';

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import BlogCard from '../../components/BlogCard';

export default function Blogs() {
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Sacred Teachings & Divine Guidance
            </h1>
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
      </main>
    </div>
  );
}
// src/pages/BlogPost.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import NavBar from "../Components/HeaderContent/NavBar";
import Footer from "../Components/FooterContent/Footer";
import BodyContent from "../Components/BodyContent/BodyContent";
import { 
  wordpressApi, 
  getFeaturedImage, 
  getAuthorName, 
  formatDate 
} from "../services/wordpressApi";
import authorImage from '/assets/images/author.jpg';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const postData = await wordpressApi.getPostBySlug(slug);
        
        if (!postData) {
          setError("Post not found");
        } else {
          setPost(postData);
          setTimeout(() => setIsVisible(true), 100);
        }
      } catch (err) {
        setError("Failed to load blog post. Please try again later.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-950 mx-auto mb-3"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="flex flex-col justify-center items-center h-screen px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-blue-950 text-white rounded-xl hover:bg-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post);

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-950 to-blue-700 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <NavBar />
      <BodyContent>
        {/* Hero Section */}
        <section className={`pt-24 pb-2 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate('/blog')}
              className="group flex items-center gap-2 text-gray-600 hover:text-blue-950 transition-colors mb-6"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-950 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Blog</span>
            </button>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta Info with Category */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600 pb-8 border-b border-gray-200">
              {/* Author Info and Date */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={authorImage} 
                      alt="Author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-gray-900 font-semibold text-sm">Mihilayan Sachinthana</div>
                      <div className="text-xs text-gray-500">Author</div>
                    </div>
                    {/* Date - Aligned with author name */}
                    <div className="flex items-center gap-2 text-sm -mt-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Badge - Moved to right */}
              {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-950 rounded-lg text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {post._embedded['wp:term'][0][0]?.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Combined Featured Image and Content Section */}
        <section className={`py-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {featuredImage && (
              <div className="mb-6">
                <div className="relative rounded-2xl overflow-hidden group">
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <article className="bg-white">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-blue-950 prose-headings:font-bold prose-headings:leading-tight
                  [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-4
                  [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6
                  [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-4
                  [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mb-3 [&>h4]:mt-4
                  [&>p]:text-base [&>p]:leading-7 [&>p]:mb-4 [&>p]:text-gray-700
                  [&>strong]:font-bold [&>strong]:text-blue-950
                  [&>em]:italic [&>em]:text-gray-700
                  [&>u]:underline [&>u]:decoration-2 [&>u]:underline-offset-2
                  [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
                  [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
                  [&>li]:mb-2 [&>li]:text-gray-700
                  [&>blockquote]:border-l-4 [&>blockquote]:border-blue-950 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                  [&>a]:text-blue-600 [&>a]:font-medium [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:text-blue-800
                  [&>code]:bg-gray-100 [&>code]:text-blue-950 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                  [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto
                  [&>img]:rounded-xl [&>img]:shadow-lg [&>img]:my-4
                  [&>br]:block [&>br]:content-[''] [&>br]:mb-4"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            </article>

            {/* Divider */}
            <div className="my-10 border-t border-gray-200"></div>

            {/* Share Section */}
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-950 mb-1">Share this article</h3>
                  <p className="text-gray-600 text-sm">Help others discover this content</p>
                </div>
                
                <div className="flex gap-2">

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title.rendered}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-700 hover:text-white text-gray-700 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white text-gray-700 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                    title="Share on Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title.rendered}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-400 hover:text-white text-gray-700 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                    title="Share on Twitter"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>

                  

                  

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-950 hover:text-white text-gray-700 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                    title="Copy link"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Back to Blog Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-xl hover:bg-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Articles
              </button>
            </div>
          </div>
        </section>
      </BodyContent>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
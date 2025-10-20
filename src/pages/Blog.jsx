// src/pages/Blog.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import NavBar from "../Components/HeaderContent/NavBar";
import Footer from "../Components/FooterContent/Footer";
import BodyContent from "../Components/BodyContent/BodyContent";
import { 
  wordpressApi, 
  getFeaturedImage, 
  getAuthorName, 
  getExcerpt, 
  formatDate 
} from "../services/wordpressApi";
import authorImage from '/assets/images/author.jpg';

export default function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const postsPerPage = 9;

  // Fade in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await wordpressApi.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch posts based on filters
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let result;

        if (searchTerm) {
          result = await wordpressApi.searchPosts(searchTerm, currentPage, postsPerPage);
        } else if (selectedCategory) {
          result = await wordpressApi.getPostsByCategory(selectedCategory, currentPage, postsPerPage);
        } else {
          result = await wordpressApi.getPosts(currentPage, postsPerPage);
        }

        setPosts(result.posts);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePostClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <BodyContent>
        {/* Hero Section */}
        <section className={`pt-24 pb-12 mt-4 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 el-messiri-font mb-4">
              DevTalks by KGMS
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              ... What I learn today, you master tomorrow ...
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-32 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-950 outline-none transition-colors text-gray-700 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition-all duration-300 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Category Filter */}
        {categories.length > 0 && (
          <section className="pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => handleCategoryFilter(null)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    !selectedCategory
                      ? "bg-blue-950 text-white shadow-lg shadow-blue-950/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All Posts
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-blue-950 text-white shadow-lg shadow-blue-950/30"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-950"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">No posts found</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => {
                  const featuredImage = getFeaturedImage(post);
                  
                  return (
                    <article
                      key={post.id}
                      className={`group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      onClick={() => handlePostClick(post.slug)}
                    >
                      {/* Featured Image */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50">
                        {featuredImage ? (
                          <>
                            <img
                              src={featuredImage}
                              alt={post.title.rendered}
                              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full overflow-hidden">
                              <img 
                                src={authorImage} 
                                alt="Author"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium text-gray-700">Mihilayan Sachinthana</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(post.date)}
                          </span>
                        </div>

                        {/* Title */}
                        <h2
                          className="text-xl mt-4 font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-950 transition-colors"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {getExcerpt(post)}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center text-blue-800 font-semibold group-hover:gap-2 transition-all duration-300">
                          Read More
                          <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="h-1 bg-gradient-to-r from-blue-950 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white rounded-lg border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-blue-950 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === index + 1
                        ? "bg-blue-950 text-white shadow-lg shadow-blue-950/30"
                        : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-950"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white rounded-lg border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-blue-950 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  </button>
              </div>
            )}
          </div>
        </section>
      </BodyContent>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
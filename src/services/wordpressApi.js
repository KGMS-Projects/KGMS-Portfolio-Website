// src/services/wordpressApi.js

import axios from 'axios';

// Your WordPress REST API base URL
const WP_API_URL = 'https://mihilayansachinthana.com/blog/wp-json/wp/v2';

// Create axios instance with default config
const api = axios.create({
  baseURL: WP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// WordPress API Service
export const wordpressApi = {
  // Fetch all posts with pagination
  getPosts: async (page = 1, perPage = 10) => {
    try {
      const response = await api.get('/posts', {
        params: {
          page,
          per_page: perPage,
          _embed: true // Include featured images and author info
        }
      });
      
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages']),
        totalPosts: parseInt(response.headers['x-wp-total'])
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Fetch single post by slug
  getPostBySlug: async (slug) => {
    try {
      const response = await api.get('/posts', {
        params: {
          slug,
          _embed: true
        }
      });
      
      return response.data[0]; // Returns first match
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Fetch single post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`, {
        params: {
          _embed: true
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Fetch all categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories', {
        params: {
          per_page: 100 // Get all categories
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Fetch posts by category
  getPostsByCategory: async (categoryId, page = 1, perPage = 10) => {
    try {
      const response = await api.get('/posts', {
        params: {
          categories: categoryId,
          page,
          per_page: perPage,
          _embed: true
        }
      });
      
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages']),
        totalPosts: parseInt(response.headers['x-wp-total'])
      };
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  },

  // Search posts
  searchPosts: async (searchTerm, page = 1, perPage = 10) => {
    try {
      const response = await api.get('/posts', {
        params: {
          search: searchTerm,
          page,
          per_page: perPage,
          _embed: true
        }
      });
      
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages']),
        totalPosts: parseInt(response.headers['x-wp-total'])
      };
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }
};

// Helper function to extract featured image URL
export const getFeaturedImage = (post) => {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
};

// Helper function to extract author name
export const getAuthorName = (post) => {
  if (post._embedded && post._embedded.author) {
    return post._embedded.author[0].name;
  }
  return 'Unknown Author';
};

// Helper function to extract excerpt
export const getExcerpt = (post, length = 150) => {
  const div = document.createElement('div');
  div.innerHTML = post.excerpt.rendered;
  const text = div.textContent || div.innerText || '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Helper function to format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};


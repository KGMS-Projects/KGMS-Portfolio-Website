// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost"; // ✅ Import BlogPost component
import Constacts from "./pages/contact";
import ScrollToTop from "./Components/ScrollToTop";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/blog" element={<Blog/>} /> 
      <Route path="/blog/:slug" element={<BlogPost />} /> {/* ✅ Add single post route */}
      <Route path="/contact" element={<Constacts/>} />
    </Routes>
  </BrowserRouter>
);
import React, { useState } from "react";
import "./NavBar.css"
import MenuLink from "./MenuLink";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[90%] bg-blue-950 shadow-lg rounded-2xl px-6 py-3 z-50 border border-white/20">
      <div className="flex justify-between items-center">
        {/* Logo with Cinzel Font */}
        <a href="/" className="index">
          <img src="/assets/images/logo.png" alt="KGMS Logo" className="h-8" />
        </a>

        {/* Desktop Menu with Cinzel Font and Bold text */}
        <div className="hidden md:flex space-x-10 cinzel-font font-bold">
        <MenuLink linktext="Home" linkurl="/" />
        <MenuLink linktext="Projects" linkurl="/projects" />
        <MenuLink linktext="Blog" linkurl="/blog" />
        <MenuLink linktext="Contact" linkurl="/contact" />
        </div>

        {/* Mobile Menu Button with Hamburger Animation */}
        <button
          id="menu-toggle"
          className="md:hidden flex flex-col space-y-1"
          onClick={toggleMobileMenu}
        >
          {/* Top Line */}
          <span
            className={`w-6 h-0.5 bg-white block transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-0.5" : ""
            }`}
          ></span>
          {/* Middle Line */}
          <span
            className={`w-6 h-0.5 bg-white block transition-all duration-300 ${
              isMobileMenuOpen ? "hidden" : ""
            }`}
          ></span>
          {/* Bottom Line */}
          <span
            className={`w-6 h-0.5 bg-white block transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col mt-4 space-y-3 md:hidden text-center text-lg cinzel-font font-bold`}
      >
        <hr className="border-t border-gray-400 w-full" /> {/* Line before Home */}
        <MenuLink linktext="Home" linkurl="/" />
        <MenuLink linktext="Projects" linkurl="/projects" />
        <MenuLink linktext="Blog" linkurl="/blog" />
        <MenuLink linktext="Contact" linkurl="/contact" />
      </div>
    </nav>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './Components/HeaderContent/NavBar.css';
import NavBar from './Components/HeaderContent/NavBar';
import Footer from './Components/FooterContent/Footer';
import BodyContent from './Components/BodyContent/BodyContent';
import mainImage from '/assets/images/mainimg.png';
import resumePDF from '/assets/images/Mihilayan ATS CV.pdf';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const roles = ['Full Stack Developer', 'Software Engineering Undergraduate'];
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation for roles
    const typeText = () => {
      const role = roles[currentIndex];
      let index = 0;
      const typing = setInterval(() => {
        if (index < role.length) {
          setCurrentText(role.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % roles.length);
            setCurrentText('');
          }, 2000);
        }
      }, 100);
    };

    const timer = setTimeout(typeText, 1000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Intersection Observer for About section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Mihilayan_Sachinthana_CV.pdf';
    link.target = '_blank';
    
    // Append to document
    document.body.appendChild(link);
    
    // Trigger click
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <>
      <div className='header'>
        <NavBar />
        <BodyContent>
          {/* Hero Section 1 - Enhanced */}
          <section className='herosection  bg-gradient-to-br from-slate-100 via-stone-200 to-gray-100 relative overflow-hidden'>
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-32 w-12 h-12 bg-purple-500 rounded-full animate-ping"></div>
            </div>
            
            <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-screen px-4 lg:px-12 lg:ml-24 lg:mr-24 py-8 lg:py-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Left Side: Enhanced Text Content */}
              <div className="flex flex-col items-start w-full lg:w-1/2 lg:mt-24 order-2 lg:order-1 z-10">
                {/* Greeting with animation */}
                <div className="mb-4 opacity-0 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                  <span className="text-lg text-gray-600 font-medium tracking-wide uppercase">Hello, I'm</span>
                </div>

                {/* Name with enhanced styling */}
                <div className="mt-2 opacity-0 animate-fade-in-up" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-blue-900 el-messiri-font leading-tight">
                    Mihilayan Sachinthana
                  </h1>
                </div>

                {/* Animated role with typing effect */}
                <div className="mt-4 opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
                  <div className="flex items-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-600 zain-font leading-tight min-h-[3rem]">
                      {currentText}
                      <span className="animate-pulse text-blue-950">|</span>
                    </h2>
                  </div>
                </div>

                {/* Enhanced Description */}
                <div className="mt-4 text-justify lg:mr-12 opacity-0 animate-fade-in-up" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
                  <p className="text-lg lg:text-xl text-gray-700 zain-font leading-relaxed">
                    Final-year Software Engineering undergraduate at 
                    <span className="font-semibold text-blue-900">  University of Staffordshire, UK </span> 
                     with experience in developing and deploying full-stack web applications. Skilled in using React-based frameworks for
                    <span className="text-yellow-600 font-medium"> frontend development</span> and Node.js and Laravel for 
                    <span className="text-yellow-600 font-medium"> backend development.</span> Familiar with RESTful APIs, version control (Git), and containerization with Docker. Able to work on both client-side and server-side development in team or individual settings.
                  </p>
                </div>

                {/* Enhanced Button Group */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
                  <button 
                    onClick={handleDownloadCV}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-950 to-blue-800 text-white text-lg font-semibold rounded-xl hover:from-blue-900 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Get My Resume
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </span>
                  </button>
                  <button 
                    onClick={() => navigate('/projects')}
                    className="px-8 py-4 border-2 border-blue-950 text-blue-950 text-lg font-semibold rounded-xl hover:bg-blue-950 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    View Projects
                  </button>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex gap-4 opacity-0 animate-fade-in-up" style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">Connect:</span>
                    <a href="https://www.linkedin.com/in/mihilayan-sachinthana-4996041a7" target="_blank" className="w-7 h-7 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors transform hover:scale-110">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://github.com/KGMS-Projects" target="_blank" className="w-7 h-7 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors transform hover:scale-110">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
    href="https://www.instagram.com/mihilayan_official_?igsh=MTRwbTJ0aGw3ZGYwaA==" 
    target="_blank" 
    className="w-7 h-7 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors transform hover:scale-110"
  >
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  </a>

  {/* Facebook */}
  <a 
    href="https://www.facebook.com/share/1ATYRtRAT2/" 
    target="_blank" 
    className="w-7 h-7 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors transform hover:scale-110"
  >
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a 
    href="https://www.youtube.com/@mihilayansachinthana" 
    target="_blank" 
    className="w-7 h-7 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors transform hover:scale-110"
  >
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>

  {/* TikTok */}
  <a 
    href="https://www.tiktok.com/@mihilayanxsachinthana" 
    target="_blank" 
    className="w-7 h-7 bg-blue-950 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors transform hover:scale-110"
  >
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Enhanced Image */}
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end lg:mt-18 order-1 lg:order-2 mb-8 lg:mb-0 mt-12 lg:mt-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-200 to-blue-700 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <img
                  src={mainImage}
                  alt="Mihilayan Sachinthana"
                  className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
            </div>
          </section>
          
          {/* About Me Section */}
          <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-32 left-20 w-24 h-24 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500 rounded-full animate-ping"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10">
              {/* Section Header */}
              <div className={`text-center mb-16 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-blue-900 el-messiri-font mb-4">
                  About Me
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-blue-600 mx-auto rounded-full"></div>
              </div>

              {/* Professional Summary */}
              

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left Side - Education & Experience */}
                <div className={`space-y-6 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{transitionDelay: '0.2s'}}>
                  {/* Education */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-blue-950 mb-6 el-messiri-font flex items-center gap-3">
                      <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      </svg>
                      Education
                    </h3>
                    <div className="space-y-5">
                      <div className="border-l-4 border-blue-500 pl-6">
                        <h4 className="text-lg font-semibold text-blue-950">BEng (Hons) in Software Engineering</h4>
                        <p className="text-yellow-600 font-medium">University of Staffordshire, UK (at APIIT)</p>
                        <p className="text-gray-600 text-sm">Nov 2023 – Jul 2026</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-6">
                        <h4 className="text-lg font-semibold text-blue-950">Foundation Program in Computing</h4>
                        <p className="text-yellow-600 font-medium">Asia Pacific Institute of Information Technology</p>
                        <p className="text-gray-600 text-sm">Feb 2023 – Oct 2023</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-6">
                        <h4 className="text-lg font-semibold text-blue-950">Certificate in Full Stack Web Development</h4>
                        <p className="text-yellow-600 font-medium">University of Moratuwa, Sri Lanka</p>
                        <p className="text-gray-600 text-sm">Jun 2023</p>
                      </div>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                    <h3 className="text-2xl font-bold text-blue-950 mb-6 el-messiri-font flex items-center gap-3">
                      <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
                      </svg>
                      Work Experience
                    </h3>
                    <div className="bg-white/70 rounded-xl p-6 shadow-lg">
                      <h4 className="text-xl font-bold text-blue-950 mb-2">App Operations Executive</h4>
                      <p className="text-yellow-600 font-semibold mb-2">Sri Buddy Pvt Ltd.</p>
                      <p className="text-gray-600 font-medium mb-4">Mar 2025 – Jun 2025</p>
                      <ul className="space-y-2 text-gray-700 zain-font">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          Coordinated with mobile and backend developers to resolve technical issues in tourism-focused mobile application
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          Managed backend operations including data integrity, performance monitoring, and error tracking
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          Gained hands-on experience with mobile app operations and system monitoring tools
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Side - Skills & Technologies */}
                <div className={`space-y-6 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{transitionDelay: '0.4s'}}>
                  {/* Technologies */}
                  <div className="bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl p-8 shadow-xl border border-gray-200">
                    <h3 className="text-xl font-bold text-blue-950 mb-2 el-messiri-font">Languages & Frameworks:</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Python', color: 'from-blue-800 to-yellow-400' },
                        { name: 'React.js', color: 'from-sky-500 to-sky-400' },
                        { name: 'Next.js', color: 'from-gray-700 to-gray-900' },
                        { name: 'Laravel', color: 'from-red-400 to-red-600' },
                        { name: 'Node.js', color: 'from-green-400 to-green-600' },
                        { name: 'Flutter', color: 'from-blue-500 to-blue-800' },
                        { name: 'TypeScript', color: 'from-blue-600 to-blue-800' }
                      ].map((tech, index) => (
                        <div key={index} className={`bg-gradient-to-r ${tech.color} text-white text-center py-3 px-3 rounded-xl font-semibold text-sm shadow-lg transform hover:scale-105 transition-all duration-300`}>
                          {tech.name}
                        </div>
                      ))}
                      
                      <div className="col-span-2 mt-4 mb-1">
                        <h3 className="text-xl font-semibold text-blue-950">Databases:</h3>
                      </div>

                      {[
                        { name: 'MySQL', color: 'from-orange-400 to-orange-600' },
                        { name: 'Firebase', color: 'from-yellow-500 to-yellow-600' }
                      ].map((tech, index) => (
                        <div key={index} className={`bg-gradient-to-r ${tech.color} text-white text-center py-3 px-3 rounded-xl font-semibold text-sm shadow-lg transform hover:scale-105 transition-all duration-300`}>
                          {tech.name}
                        </div>
                      ))}

                      <div className="col-span-2 mt-4 mb-1">
                        <h3 className="text-xl font-semibold text-blue-950">Tools & Platforms:</h3>
                      </div>

                      {[
                        { name: 'Docker', color: 'from-blue-500 to-blue-700' },
                        { name: 'Git', color: 'from-orange-400 to-orange-600' },
                        { name: 'Tailwind', color: 'from-teal-400 to-teal-600' },
                        { name: 'REST APIs', color: 'from-purple-400 to-purple-600' }
                      ].map((tech, index) => (
                        <div key={index} className={`bg-gradient-to-r ${tech.color} text-white text-center py-3 px-3 rounded-xl font-semibold text-sm shadow-lg transform hover:scale-105 transition-all duration-300`}>
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Concepts & Methodologies */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-blue-950 mb-6 el-messiri-font">Development Concepts</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'REST APIs',
                        'MVC Architecture',
                        'Agile Development',
                        'Version Control',
                        'Containerization',
                        'Database Design'
                      ].map((concept, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-center py-3 px-3 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300">
                          {concept}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Projects Preview */}
              <div className={`mt-16 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '0.6s'}}>
                <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-3xl font-bold text-white mb-6 el-messiri-font text-center">Featured Projects</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        name: 'Pearl & Prestige',
                        type: 'E-commerce Fashion Web Application',
                        tech: 'Laravel • PHP • Livewire • MySQL',
                        description: 'Full-stack e-commerce platform for luxury fashion and accessories with comprehensive admin dashboard.',
                        status: 'Live',
                        icon: '🛒',
                        link: 'https://pearlprestige.shop/'
                      },
                      {
                        name: 'VentureSpark',
                        type: 'Business Consultation Platform',
                        tech: 'Next.js • React • Tailwind CSS',
                        description: 'Platform connecting entrepreneurs with business experts, featuring multi-user dashboards and booking system.',
                        status: 'Live',
                        icon: '💼',
                        link: 'https://venture-spark.vercel.app'
                      }
                    ].map((project, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-3xl">{project.icon}</div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-300 text-xs font-medium">{project.status}</span>
                          </div>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">{project.name}</h4>
                        <p className="text-blue-200 text-sm mb-2">{project.type}</p>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="space-y-3">
                          <p className="text-blue-100 text-xs">{project.tech}</p>
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                          >
                            Visit Website
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <button 
                      onClick={() => {
                        window.location.href = '/projects';
                      }}
                      className="group px-8 py-4 bg-white text-blue-950 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View All Projects
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </BodyContent>
      </div>

      { <div className='footer'>
        <Footer></Footer>
      </div> }

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default App;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";  // ✅ Correct path
import NavBar from "../Components/HeaderContent/NavBar"; 
import Footer from "../Components/FooterContent/Footer";
import BodyContent from "../Components/BodyContent/BodyContent";

// Export projects data to share with ProjectDetail
export const projects = {
  featured: [
    {
      id: 'pearl-prestige',
      name: 'Pearl & Prestige',
      type: 'E-commerce Fashion Web Application',
      shortDesc: 'Full-stack e-commerce platform for luxury fashion and accessories',
      description: 'Developed a comprehensive e-commerce platform using Laravel framework with MVC architecture. This full-stack web application demonstrates proficiency in modern web development technologies and business logic implementation.',
      tech: ['Laravel', 'PHP', 'Livewire', 'Jetstream Auth', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'Full-Stack Development with Laravel and PHP',
        'Secure User Authentication via Laravel Jetstream',
        'Dynamic Interface using Livewire for real-time updates',
        'Product catalog with advanced filtering',
        'Shopping cart and checkout system',
        'Order management and tracking',
        'Comprehensive Admin Dashboard',
        'Inventory control system',
        'Business analytics and reporting'
      ],
      challenges: [
        'Implementing secure user authentication and authorization',
        'Creating real-time inventory synchronization',
        'Building scalable MVC architecture',
        'Optimizing database queries for performance',
        'Integrating payment processing workflows'
      ],
      solutions: [
        'Utilized Laravel Jetstream for robust authentication',
        'Implemented Livewire for real-time UI updates',
        'Applied MVC design pattern for maintainable code',
        'Optimized database with proper indexing and relationships',
        'Created modular payment processing system'
      ],
      impact: [
        'Demonstrated ability to build production-ready applications',
        'Successfully implemented complex business logic',
        'Efficient user session management',
        'Secure payment processing integration',
        'Comprehensive administrative functionality'
      ],
      status: 'Live',
      icon: '🛒',
      image: '/assets/images/pear&prestigemainimg.jpg',
      link: 'https://github.com/KGMS-Projects/Pearl-Prestige-Ecommerce-Website.git',
      liveDemo: 'https://pearlprestige.shop/',
      screenshots: [
        '/assets/images/ppm1.jpg',
        '/assets/images/ppm2.jpg',
        '/assets/images/ppm3.jpg'
      ]
    },
    {
      id: 'venturespark',
      name: 'VentureSpark',
      type: 'Business Consultation Platform',
      shortDesc: 'Platform connecting entrepreneurs with business experts',
      description: 'This was a university group project where we built a platform to solve a real problem - entrepreneurs struggling to find and connect with the right business experts. VentureSpark makes it easy for startups to book consultations with experienced advisors. I was responsible for all the frontend development while my teammates handled the backend implementation.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'REST API Integration'],
      features: [
        'Three Different Dashboards (Admin, Consultant, Entrepreneur)',
        'Intuitive Booking Interface',
        'Expert Profile Management',
        'Client Information Management',
        'Responsive Layout for All Devices',
        'Consultation Scheduling System',
        'Expert Search and Filtering',
        'Session Management'
      ],
      challenges: [
        'Creating three distinct user experiences while maintaining code consistency',
        'Designing intuitive interfaces for different user types',
        'Integrating with backend APIs effectively',
        'Managing complex data flow between frontend and backend',
        'Ensuring responsive design across all devices'
      ],
      solutions: [
        'Implemented modular component architecture',
        'Created reusable UI components for consistency',
        'Developed robust API integration layer',
        'Used responsive design patterns',
        'Implemented proper state management'
      ],
      learnings: [
        'Experience in collaborative software development',
        'Frontend ownership in a team environment',
        'API integration best practices',
        'User experience design for multiple user types',
        'Project coordination with backend team'
      ],
      impact: [
        'Simplified expert consultation booking process',
        'Created efficient workflow for business advisors',
        'Streamlined administration of consultations',
        'Enhanced user experience for all stakeholders',
        'Successfully delivered as university group project'
      ],
      status: 'Live',
      icon: '💼',
      image: '/assets/images/venturemainimg.jpg',
      link: 'https://github.com/APIIT-CC-Asignment/-VentureSpark.git',
      liveDemo: 'https://venture-spark.vercel.app',
      screenshots: [
        '/assets/images/vent1.jpg',
        '/assets/images/vent2.jpg',
        '/assets/images/vent3.jpg'
      ]
    },
    // {
    //   id: 'tour-guild',
    //   name: 'Tour Guild',
    //   type: 'Tourism Website',
    //   shortDesc: 'Interactive tourism platform connecting travelers with guides',
    //   description: 'An interactive tourism platform that connects travelers with local guides, featuring real-time booking, review system, and personalized travel itineraries.',
    //   tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    //   features: [
    //     'Real-time booking system',
    //     'Guide profile management',
    //     'Review and rating system',
    //     'Interactive travel planning',
    //     'Multi-language support',
    //     'Dynamic pricing engine'
    //   ],
    //   challenges: [
    //     'Handling complex booking scenarios',
    //     'Implementing a reliable rating system',
    //     'Managing multiple time zones',
    //     'Building a secure payment system'
    //   ],
    //   solutions: [
    //     'Developed a flexible booking algorithm',
    //     'Created a weighted rating system',
    //     'Implemented moment.js for time handling',
    //     'Integrated Stripe payment gateway'
    //   ],
    //   status: 'Live',
    //   icon: '✈️',
    //   image: '../src/assets/image/tourguild-main.jpg',
    //   link: 'https://github.com/yourusername/tour-guild',
    //   screenshots: [
    //     '../src/assets/image/tour1.jpg',
    //     '../src/assets/image/tour2.jpg',
    //     '../src/assets/image/tour3.jpg'
    //   ]
    // },
    // {
    //   id: 'cafe-website',
    //   name: 'Cafe Website',
    //   type: 'Restaurant Site',
    //   shortDesc: 'Modern restaurant website with ordering system',
    //   description: 'A modern restaurant website with online ordering capabilities, table reservations, and a dynamic menu management system.',
    //   tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    //   features: [
    //     'Online ordering system',
    //     'Table reservation',
    //     'Dynamic menu management',
    //     'Customer feedback system',
    //     'Special events calendar',
    //     'Loyalty program integration'
    //   ],
    //   challenges: [
    //     'Creating an intuitive ordering flow',
    //     'Managing table availability in real-time',
    //     'Implementing menu customization options',
    //     'Handling peak-time orders'
    //   ],
    //   solutions: [
    //     'Designed a step-by-step ordering wizard',
    //     'Built a real-time table management system',
    //     'Created a flexible menu builder interface',
    //     'Implemented order queuing system'
    //   ],
    //   status: 'Live',
    //   icon: '☕',
    //   image: '../src/assets/image/cafe-main.jpg',
    //   link: 'https://github.com/yourusername/cafe-website',
    //   screenshots: [
    //     '../src/assets/image/cafe1.jpg',
    //     '../src/assets/image/cafe2.jpg',
    //     '../src/assets/image/cafe3.jpg'
    //   ]
    // }
  ]
};

export default function Projects() {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <NavBar />
        <BodyContent>
          {/* Hero Section */}
          <section className="pt-20 pb-12 mt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-blue-900 el-messiri-font mb-4">
                  Featured Projects
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Click on any project to explore detailed information, including features, technologies used, and live demonstrations.
                </p>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.featured.map((project, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-blue-950/80 transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center text-white p-6">
                          <p className="text-lg font-semibold mb-2">View Project Details</p>
                          <p className="text-sm opacity-80">{project.shortDesc}</p>
                        </div>
                      </div>
                      
                      {/* Project Icon */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <span className="text-2xl">{project.icon}</span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-blue-950">{project.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-600 text-sm font-medium">{project.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-yellow-600 font-medium text-sm mb-3">{project.type}</p>
                      
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </BodyContent>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

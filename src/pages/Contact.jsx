import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../App.css";
import NavBar from "../Components/HeaderContent/NavBar";
import Footer from "../Components/FooterContent/Footer";
import BodyContent from "../Components/BodyContent/BodyContent";

// Initialize EmailJS
emailjs.init("nm23Ed6alTSmQ42RO");

export default function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ show: false, success: false, message: '' });

    emailjs.sendForm(
      'service_ez55tum',
      'template_a86qyle',
      form.current,
      'nm23Ed6alTSmQ42RO'
    )
      .then((result) => {
        setSubmitStatus({
          show: true,
          success: true,
          message: 'Message sent successfully! I will get back to you soon.'
        });
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        });
        form.current.reset();
      })
      .catch((error) => {
        setSubmitStatus({
          show: true,
          success: false,
          message: 'Failed to send message. Please try again later.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <NavBar />
        <BodyContent>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Header Section */}
            <div className="text-center mb-16 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
              </div>
              <h1 className="relative text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-950 via-blue-800 to-blue-700 bg-clip-text text-transparent font-['Amaranth-Regular']">
                Get in Touch
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-['mainfont']">
                Have an exciting project in mind? Let's collaborate and bring your ideas to life!
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Contact Info Section */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6 text-blue-900 font-['Amaranth-Regular']">Let's Connect</h2>
                  
                  <div className="space-y-6">
                    {/* Email */}
                    <div className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 font-['mainfont']">Email</h3>
                        <a href="mailto:mihilayansachinthana@gmail.com" className="text-blue-800 hover:text-blue-600 transition-colors font-['mainfont']">
                          mihilayansachinthana@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 font-['mainfont']">Location</h3>
                        <p className="text-gray-600 font-['mainfont']">Colombo,Sri Lanka</p>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 font-['Amaranth-Regular']">Follow Me</h3>
                      <div className="flex space-x-4 flex-wrap gap-4">
                        <a href="https://github.com/KGMS-Projects" target="_blank" rel="noopener noreferrer" 
                           className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
                          <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/mihilayan-sachinthana-4996041a7" target="_blank" rel="noopener noreferrer"
                           className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
                          <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                         <a href="https://www.instagram.com/mihilayan_official_?igsh=MTRwbTJ0aGw3ZGYwaA==" target="_blank" rel="noopener noreferrer"
   className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
  <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 
             1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 
             0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 
             4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 
             0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92
             -.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849
             .149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 
             2.163 12 2.163zm0 3.675a6.162 6.162 0 100 12.324 
             6.162 6.162 0 000-12.324zm6.406-1.683a1.44 1.44 0 
             100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
</a>

<a href="https://www.facebook.com/share/1ATYRtRAT2/" target="_blank" rel="noopener noreferrer"
   className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
  <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 
             5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43
             c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 
             2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 
             1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 
             23.027 24 18.062 24 12.073z"/>
  </svg>
</a>

<a href="https://www.youtube.com/@mihilayansachinthana" target="_blank" rel="noopener noreferrer"
   className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
  <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 
             3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 
             3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 
             3.93.502 5.814a3.016 3.016 0 0 0 2.122 
             2.136c1.871.505 9.376.505 9.376.505s7.505 
             0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 
             15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 
             15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
</a>

<a href="https://www.tiktok.com/@mihilayanxsachinthana" target="_blank" rel="noopener noreferrer"
   className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
  <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 
             3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 
             1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 
             2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 
             3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71
             -.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 
             2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 
             1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 
             1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 
             1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
</a>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1 font-['mainfont']">
                          Name
                        </label>
                        <input
                          type="text"
                          name="user_name"
                          id="user_name"
                          required
                          value={formData.user_name}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 p-3 group-hover:border-blue-200 font-['mainfont']"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="group">
                        <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1 font-['mainfont']">
                          Email
                        </label>
                        <input
                          type="email"
                          name="user_email"
                          id="user_email"
                          required
                          value={formData.user_email}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 p-3 group-hover:border-blue-200 font-['mainfont']"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 font-['mainfont']">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 p-3 group-hover:border-blue-200 font-['mainfont']"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 font-['mainfont']">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="block w-full rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 p-3 group-hover:border-blue-200 font-['mainfont']"
                        placeholder="Your message here..."
                      />
                      <div className="text-right text-sm text-gray-500 mt-1 font-['mainfont']">
                        {formData.message.length}/500 characters
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-blue-800 to-yellow-600 hover:from-blue-900 hover:via-blue-750 hover:to-blue-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium font-['mainfont'] transform hover:scale-[1.02] ${
                          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>

                    {submitStatus.show && (
                      <div className={`p-4 rounded-xl font-['mainfont'] ${
                        submitStatus.success 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {submitStatus.message}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </BodyContent>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

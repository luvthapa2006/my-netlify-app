import React from 'react';
import Image from 'next/image'; // <-- NEW IMPORT
// We no longer need Anchor from lucide-react, so we can remove it
// import { Anchor } from 'lucide-react'; 

// Define logo constants again (or define them in a shared config file)
const LOGO_SRC = "/uniscape-logo.png"; 
const LOGO_WIDTH = 50; 
const LOGO_HEIGHT = 50; 

const Footer = () => {
  
  const UNISCAPE_LOGO = (
    <div className="flex items-center space-x-2">
      {/* 2. REPLACE LUCIDE ICON WITH NEXT/IMAGE COMPONENT */}
      <Image 
        src={LOGO_SRC} 
        alt="UNISCAPE Logo" 
        width={LOGO_WIDTH} 
        height={LOGO_HEIGHT} 
      />
      {/* Note: The footer text is white, so we change the color class */}
      <span className="text-2xl font-black text-white tracking-tight">UNISCAPE</span>
    </div>
  );
  
  // These global variables are provided by the canvas environment.
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Logo and Tagline */}
          <div>
            <div className="mb-4">
              <a href="#" className="flex-shrink-0 flex items-center space-x-2 text-white">
                {UNISCAPE_LOGO}
              </a>
            </div>
            <p className="text-gray-400 text-sm">Optimizing every journey, together.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-indigo-400">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Car Pooling</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Shuttle Service</a></li>
              <li><a href="#offer" className="text-gray-400 hover:text-white transition">Hostel Special</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-indigo-400">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
              <li><a href="#faqs" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-indigo-400">Contact Us</h4>
            <p className="text-gray-400 text-sm">Email: support@uniscape.com</p>
            <p className="text-gray-400 text-sm">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-400 text-sm mt-4">App ID: {appId}</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} UNISCAPE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
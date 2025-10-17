// src/components/layouts/Header.js

'use client'; // <-- Needs state for mobile menu

import React, { useState } from 'react';
import Image from 'next/image';
import NavLink from '../ui/NavLink'; // Import the new NavLink

const LOGO_SRC = "/uniscape-logo.png"; // <-- Path to your image in the /public folder
const LOGO_WIDTH = 50; // Example: You can set a fixed width
const LOGO_HEIGHT = 50; // Example: You can set a fixed height

const UNISCAPE_LOGO = (
  <div className="flex items-center space-x-2">
    {/* 2. REPLACE LUCIDE ICON WITH NEXT/IMAGE COMPONENT */}
    <Image 
      src={LOGO_SRC} 
      alt="UNISCAPE Logo" 
      width={LOGO_WIDTH} 
      height={LOGO_HEIGHT} 
      priority={true} // Mark as high priority for LCP
      className="text-indigo-600" // You can keep some Tailwind classes if needed
    />
    <span className="text-2xl font-black text-gray-900 tracking-tight">UNISCAPE</span>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- FIX: DEFINE THE closeMenu FUNCTION HERE ---
  // This function is now correctly defined within the Header component's scope.
  const closeMenu = () => setIsMenuOpen(false); 

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* INCREASED height for better spacing */}
          {/* Logo (Upper Left) */}
          <a href="#" className="flex-shrink-0">
            {UNISCAPE_LOGO}
          </a>

          {/* Desktop Navigation (unchanged) */}
          <nav className="hidden md:flex space-x-1">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#offer">Hostel Offer</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#faqs">FAQs</NavLink>
            <a
              href="#services"
              className="ml-4 py-2 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-500/50 font-semibold"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button - Added visible border/ring for better click target */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 transition border border-gray-300 ring-2 ring-indigo-500/50" // <-- UPDATED CLASSES
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - FIXED POSITION OVERLAY */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40 p-4 shadow-2xl overflow-y-auto">
          <div className="flex flex-col space-y-2 mt-2">
            
            {/* Pass the correct closeMenu function to each link */}
            <NavLink href="#services" onClick={closeMenu}>Services</NavLink>
            <NavLink href="#offer" onClick={closeMenu}>Hostel Offer</NavLink>
            <NavLink href="#testimonials" onClick={closeMenu}>Testimonials</NavLink>
            <NavLink href="#faqs" onClick={closeMenu}>FAQs</NavLink>
            
            <a 
                href="#services" 
                onClick={closeMenu} // <-- Also apply to the main CTA button
                className="w-full text-center py-3 mt-4 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition font-semibold"
            >
                Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
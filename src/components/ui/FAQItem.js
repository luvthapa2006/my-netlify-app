// src/components/ui/FAQItem.js

'use client'; // <-- MUST be a client component because of useState

import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-gray-800 hover:text-indigo-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 pr-6 text-gray-600 transition-all duration-500 ease-in-out">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
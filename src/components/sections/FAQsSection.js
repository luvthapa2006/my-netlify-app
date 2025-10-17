// src/components/sections/FAQsSection.js

import React from 'react';
import FAQItem from '@/components/ui/FAQItem'; // Import the client component

const FAQsSection = ({ faqsData }) => {
  return (
    <section id="faqs" className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Questions & Answers
        </h2>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          {faqsData.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
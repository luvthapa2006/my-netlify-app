// src/components/sections/TestimonialsSection.js

import React from 'react';
import Testimonial from '@/components/ui/Testimonial';

const TestimonialsSection = ({ testimonialsData }) => {
  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Trusted by Travel Professionals
        </h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonialsData.map(t => (
            <Testimonial key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
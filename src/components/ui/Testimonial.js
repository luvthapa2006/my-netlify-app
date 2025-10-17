// src/components/ui/Testimonial.js

import React from 'react';
import { MessageSquare } from 'lucide-react';

const Testimonial = ({ quote, name, title }) => (
  <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col justify-between">
    <MessageSquare size={36} className="text-cyan-500 mb-4" />
    <p className="text-gray-600 italic leading-relaxed flex-grow">"{quote}"</p>
    <div className="mt-6 pt-4 border-t border-gray-100">
      <p className="text-lg font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-indigo-500">{title}</p>
    </div>
  </div>
);

export default Testimonial;
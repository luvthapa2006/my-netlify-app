// src/components/ui/ServiceCard.js

import React from 'react';
import { Users, CheckCircle, MapPin } from 'lucide-react'; 
// Removed unused imports (Car, DollarSign) for cleanliness

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  timeRequired, 
  minTarget, 
  actionText, 
  actionColor, 
  price, 
  route,
  onActionClick // <-- The new click handler prop
}) => (
  // 1. Changed the outer <a> tag to a non-clickable <div>.
  // This ensures the cursor pointer only appears on the button.
  <div className="block w-full h-full p-8 bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
    
    <div className="flex items-center mb-4">
      <div className={`p-3 rounded-full bg-indigo-500/10 text-indigo-600`}>
        <Icon size={32} />
      </div>
    </div>
    <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 mb-6 min-h-[60px]">{description}</p>

    {/* --- Price & Route Section (Rupee symbol) --- */}
    <div className="space-y-3 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-center text-lg font-bold text-green-700">
        {/* Rupee Symbol Text */}
        <div className="mr-3 text-green-500 text-xl font-extrabold">₹</div> 
        
        <span className="leading-none">{price.replace('/-', '')}</span> 
        <span className="text-sm font-semibold text-gray-600 ml-1">/- per seat</span>
      </div>
      <div className="flex items-start text-sm font-medium text-gray-700">
        <MapPin size={18} className="mr-3 mt-1 text-red-500 flex-shrink-0" />
        <span className="leading-tight">{route}</span>
      </div>
    </div>
    {/* --- END Price & Route Section --- */}

    <div className="space-y-3 mb-8">
      <div className="flex items-center text-sm font-semibold text-gray-700">
        <Users size={18} className="mr-2 text-green-500" />
        <span className="text-green-700">Min Target:</span> {minTarget} required
      </div>
      <div className="flex items-center text-sm font-semibold text-gray-700">
        <CheckCircle size={18} className="mr-2 text-indigo-500" />
        <span className="text-indigo-700">Setup Time:</span> {timeRequired}
      </div>
    </div>

    {/* 2. Attached the onActionClick prop to the button */}
    <button 
      onClick={onActionClick} 
      className={`w-full py-3 px-6 text-lg font-semibold rounded-xl transition duration-300 shadow-md ${actionColor} cursor-pointer`} // <-- ADDED cursor-pointer
    >
      {actionText}
    </button>
  </div>
);

export default ServiceCard;
// src/components/BookingForm.js

'use client'; 

import React, { useState } from 'react';
import { X, Users, Bus, Car, Hotel, AlertCircle } from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = '919760689170'; 

const BookingForm = ({ serviceType, onClose, showOfferLabel }) => {
  // Determine initial state and defaults based on serviceType
  const isShuttle = serviceType === 'shuttle';
  const minTravelers = isShuttle ? 15 : 2;

  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [destination, setDestination] = useState('ISBT');
  const [time, setTime] = useState('');
  const [travelersCount, setTravelersCount] = useState(minTravelers);
  const [travelerDetails, setTravelerDetails] = useState(
    Array.from({ length: minTravelers }).fill({ name: '', contact: '' })
  );
  const [bookingParty, setBookingParty] = useState(showOfferLabel ? 'hostel' : 'individual'); 

  // --- NEW: Validation State ---
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Validation Functions ---

  const validateName = (name) => {
    // Allows letters and spaces only
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) return "Name cannot be empty.";
    if (!nameRegex.test(name)) return "Name can only contain letters and spaces.";
    return null;
  };

  const validatePhone = (phone) => {
    // Allows digits only, exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phone.trim()) return "Phone number cannot be empty.";
    if (!phoneRegex.test(phone)) return "Phone must be exactly 10 digits (numbers only).";
    return null;
  };

  // --- Traveler Detail Handlers ---
  const handleTravelerChange = (index, field, value) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setTravelerDetails(updatedDetails);

    // Clear specific traveler error on change
    if (errors[`traveler_${index}_${field}`]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[`traveler_${index}_${field}`];
            return newErrors;
        });
    }
  };

  const handleCountChange = (e) => {
    // ... (logic remains the same) ...
    const newCount = Math.max(minTravelers, parseInt(e.target.value) || minTravelers);
    setTravelersCount(newCount);
    
    if (newCount > travelerDetails.length) {
        const added = newCount - travelerDetails.length;
        setTravelerDetails([...travelerDetails, ...Array.from({ length: added }).fill({ name: '', contact: '' })]);
    } else {
        setTravelerDetails(travelerDetails.slice(0, newCount));
    }
  };


  // --- Submission Logic ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors = {};
    let hasError = false;

    // 1. Validate Booker Contact Info
    const nameError = validateName(contactName);
    if (nameError) { newErrors.contactName = nameError; hasError = true; }
    const phoneError = validatePhone(contactNumber);
    if (phoneError) { newErrors.contactNumber = phoneError; hasError = true; }
    
    // 2. Validate All Traveler Details
    travelerDetails.forEach((t, index) => {
        const tNameError = validateName(t.name);
        if (tNameError) { newErrors[`traveler_${index}_name`] = tNameError; hasError = true; }
        
        const tPhoneError = validatePhone(t.contact);
        if (tPhoneError) { newErrors[`traveler_${index}_contact`] = tPhoneError; hasError = true; }
    });
    
    setErrors(newErrors);

    if (hasError) {
        setIsSubmitting(false);
        return; // STOP submission
    }

    // --- If valid, proceed to WhatsApp ---
    
    let prefilledText = `*UNISCAPE Booking Request - ${isShuttle ? 'Shuttle' : 'Car Pool'}*\n\n`;
    prefilledText += `Service: ${isShuttle ? 'Dedicated Shuttle' : 'Car Pooling'}\n`;
    
    if (isShuttle) {
        prefilledText += `Booking Party: ${bookingParty === 'hostel' ? 'Hostel Owner (Claiming Offer)' : 'Individual'}\n`;
    }
    
    prefilledText += `Destination: ${destination}\n`;
    prefilledText += `Time: ${time}\n`;
    prefilledText += `Travelers: ${travelersCount}\n`;
    prefilledText += `\n*Contact Person:*\nName: ${contactName}\nContact: ${contactNumber}\n`;
    
    prefilledText += `\n*Traveler Details:* (Total ${travelersCount} people)\n`;
    travelerDetails.forEach((t, index) => {
        prefilledText += `${index + 1}. ${t.name || 'N/A'} (Contact: ${t.contact || 'N/A'})\n`;
    });

    if (showOfferLabel) {
        prefilledText += `\n*SPECIAL OFFER CLAIMED: Get 10 FREE Seats!*`;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose(); 
    setIsSubmitting(false);
  };

  // --- Helper component for Error Message ---
  const ErrorMessage = ({ message }) => (
    <p className="mt-1 text-red-600 text-xs flex items-center font-medium">
        <AlertCircle size={14} className="mr-1 flex-shrink-0" />
        {message}
    </p>
  );

  // --- JSX TEMPLATE ---
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        
        {/* Header (omitted for brevity, remains unchanged) */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-2xl font-extrabold text-gray-900 flex items-center">
            {isShuttle ? <Bus size={24} className="mr-3 text-cyan-600" /> : <Car size={24} className="mr-3 text-indigo-600" />}
            {isShuttle ? 'Book Dedicated Shuttle' : 'Book Car Pooling'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* --- GOLDEN OFFER LABEL (omitted for brevity, remains unchanged) --- */}
        {(showOfferLabel || (isShuttle && bookingParty === 'hostel')) && (
            <div className={`p-4 text-center font-bold text-lg rounded-t-xl text-white ${showOfferLabel ? 'bg-yellow-500' : 'bg-indigo-500'}`}>
                <Hotel size={24} className="inline mr-2" />
                {showOfferLabel ? 'SPECIAL OFFER: Get 10 Seats FREE!' : 'Hostel Owner Selected: Get 10 Seats FREE!'}
            </div>
        )}
        
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Booking Party (omitted for brevity, remains unchanged) */}
          {isShuttle && !showOfferLabel && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Who is making the booking?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" value="individual" checked={bookingParty === 'individual'} onChange={(e) => setBookingParty(e.target.value)} className="form-radio text-indigo-600"/>
                  <span className="ml-2 text-gray-700">Individual/Company</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" value="hostel" checked={bookingParty === 'hostel'} onChange={(e) => setBookingParty(e.target.value)} className="form-radio text-indigo-600"/>
                  <span className="ml-2 text-gray-700">Hostel Owner</span>
                </label>
              </div>
            </div>
          )}

          {/* Core Booking Options (omitted for brevity, remains unchanged) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
              <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-700">
                <option value="ISBT">ISBT (Dehradun)</option>
                <option value="RAILWAY">Railway Station (Dehradun)</option>
              </select>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-700"/>
            </div>
          </div>
          
          {/* Travelers Count (omitted for brevity, remains unchanged) */}
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
              Number of Travelers (Min: {minTravelers})
            </label>
            <input type="number" id="travelers" value={travelersCount} onChange={handleCountChange} min={minTravelers} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-700"/>
          </div>

          {/* Contact Info (The Booker) --- UPDATED FOR VALIDATION --- */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Contact Info</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  value={contactName} 
                  onChange={(e) => setContactName(e.target.value)} 
                  required 
                  className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-700 ${errors.contactName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.contactName && <ErrorMessage message={errors.contactName} />}
              </div>
              
              <div>
                <input 
                  type="tel" 
                  placeholder="Your Phone Number (10 digits)" 
                  value={contactNumber} 
                  onChange={(e) => setContactNumber(e.target.value)} 
                  required 
                  maxLength={10}
                  className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-700 ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.contactNumber && <ErrorMessage message={errors.contactNumber} />}
              </div>
            </div>
          </div>
          
          {/* Traveler Details (List) --- UPDATED FOR VALIDATION --- */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                <Users size={18} className="inline mr-1 text-indigo-500" />
                Traveler Details ({travelersCount} total)
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {travelerDetails.map((traveler, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder={`Traveler ${index + 1} Name`} 
                      value={traveler.name} 
                      onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                      className={`block w-full border rounded-md shadow-sm py-2 px-3 text-sm text-gray-900 placeholder-gray-700 ${errors[`traveler_${index}_name`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`traveler_${index}_name`] && <ErrorMessage message={errors[`traveler_${index}_name`]} />}
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder={`Traveler ${index + 1} Contact (10 digits)`} 
                      value={traveler.contact} 
                      onChange={(e) => handleTravelerChange(index, 'contact', e.target.value)}
                      maxLength={10}
                      className={`block w-full border rounded-md shadow-sm py-2 px-3 text-sm text-gray-900 placeholder-gray-700 ${errors[`traveler_${index}_contact`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`traveler_${index}_contact`] && <ErrorMessage message={errors[`traveler_${index}_contact`]} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 text-lg font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600 transition duration-300 shadow-lg cursor-pointer disabled:bg-green-400"
          >
            {isSubmitting ? 'Validating...' : 'Submit & Send Booking via WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
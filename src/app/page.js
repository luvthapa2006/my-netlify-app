// src/app/page.js
// This file is now purely the page layout structure!

'use client'; // Required because we use the useState hook

import { useState } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import FAQsSection from '@/components/sections/FAQsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ServiceCard from '@/components/ui/ServiceCard';
import BookingForm from '@/components/BookingForm'
// Icons needed for the ServiceCard component
import { Truck, Car } from 'lucide-react'; 

// --- Data Definitions (Data layer remains here for simplicity) ---

const testimonialsData = [
  {
    id: 1,
    quote: "UNISCAPE transformed our team commutes. The Car Pooling system is flexible, reliable, and cut our travel costs by 30%. Highly recommend for any medium-sized business!",
    name: "Alex M.",
    title: "Operations Manager, TechSpark",
  },
  {
    id: 2,
    quote: "The Hostel Special Offer is unbeatable. We booked 15 seats for our guest excursion and got 10 extra for free. Smooth booking and excellent customer support.",
    name: "Sarah K.",
    title: "Hostel Owner, The Global Hub",
  },
  {
    id: 3,
    quote: "Booking the shuttle for our conference was seamless. The 15-seat minimum ensures we always have the capacity we need, and the drivers were punctual.",
    name: "David L.",
    title: "Event Planner, Nexus Events",
  },
];

const faqsData = [
  {
    question: "What is the minimum requirement for Car Pooling?",
    answer: "Car Pooling requires a minimum of 2 confirmed passengers per booking. This model helps us ensure efficiency and reduce losses while offering you competitive rates.",
  },
  {
    question: "How far in advance must I book the Shuttle Service?",
    answer: "Shuttle Service bookings have a minimum time requirement of 15 minutes before departure, but we strongly recommend booking at least 24 hours ahead for large groups.",
  },
  {
    question: "How does the 'Hostel Only' special offer work?",
    answer: "If you represent a Hostel and book 15 seats for the Shuttle Service in a single transaction, you automatically receive 10 complimentary seats for that booking, totaling 25 seats.",
  },
  {
    question: "Are your services available 24/7?",
    answer: "Our booking platform is available 24/7. Transportation availability depends on the time of booking and destination, but our core fleet operates from 5 AM to 11 PM daily.",
  },
];

// --- STATIC SECTIONS ---

const HeroSection = () => (
  <section className="py-20 lg:py-28 bg-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
        Efficient Group Transport <span className="text-indigo-600">Simplified.</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
        UNISCAPE provides optimized, cost-effective travel solutions for teams, tourists, and students, ensuring minimal losses and maximum reliability.
      </p>
      <a
        href="#services"
        className="py-3 px-8 text-lg font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 transition duration-300 shadow-lg shadow-cyan-500/50 inline-flex items-center group"
      >
        Explore Our Services
        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </a>
    </div>
  </section>
);

const OfferBanner = ({ setFormState }) => (
  <section id="offer" className="py-16 bg-indigo-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm font-bold uppercase text-indigo-200 mb-2">Exclusive Deal</p>
      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
        SPECIAL OFFER FOR HOSTELS ONLY
      </h3>
      <p className="text-xl text-white/90 font-medium mb-8">
        Book <span className="text-yellow-300 font-extrabold">15 seats</span> for our Shuttle Service and get an additional <span className="text-yellow-300 font-extrabold">10 seats FREE!</span> (Total 25 seats for the price of 15)
      </p>
      {/* 3. CLAIM HOSTEL DISCOUNT BUTTON ACTION */}
      <button
        onClick={() => setFormState({ isOpen: true, type: 'shuttle', offer: true })}
        className="py-3 px-8 text-lg font-bold text-indigo-900 bg-yellow-300 rounded-full hover:bg-yellow-400 transition duration-300 shadow-xl shadow-indigo-900/40 cursor-pointer" // <-- ADD cursor-pointer
      >
        Claim Hostel Discount
      </button>
    </div>
  </section>
);


const Home = () => {
  // --- FORM STATE ---
  const [formState, setFormState] = useState({ 
    isOpen: false, 
    type: null, // 'carpool' or 'shuttle'
    offer: false, // true if booking is coming from the Hostel Offer banner
  });
  
  // Function to close the form and reset state
  const handleCloseForm = () => setFormState({ isOpen: false, type: null, offer: false });

  // --- Services Section (Now correctly passing the click handler) ---
  const ServicesSection = () => (
    <section id="services" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Our Core Transport Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* 1. CAR POOLING BUTTON ACTION (onActionClick is the new prop) */}
          <ServiceCard
            icon={Car}
            title="1. Book Car Pooling"
            description="The smart, flexible choice for small groups. Achieve immediate cost savings and reduce individual travel effort."
            timeRequired="2 minutes required"
            minTarget="Min 2 passengers"
            actionText="Start Car Pool Booking"
            actionColor="bg-indigo-600 text-white hover:bg-indigo-700"
            onActionClick={() => setFormState({ isOpen: true, type: 'carpool' })} // <-- Click logic
            price="399/-" 
            route="Route: UPES Gate to ISBT AND Railway Station"
          />
          {/* 2. SHUTTLE SERVICE BUTTON ACTION (onActionClick is the new prop) */}
          <ServiceCard
            icon={Truck}
            title="2. Book Shuttle Service"
            description="Dedicated, high-capacity transport ideal for large events, corporate teams, or school trips."
            timeRequired="15 minutes required"
            minTarget="Min 15 passengers"
            actionText="Book Dedicated Shuttle"
            actionColor="bg-cyan-500 text-white hover:bg-cyan-600"
            onActionClick={() => setFormState({ isOpen: true, type: 'shuttle' })} // <-- Click logic
            price="269/-" 
            route="Route: UPES Gate to ISBT AND Railway Station"
          />
        </div>
      </div>
    </section>
  );


  return (
    <div className="min-h-screen bg-gray-50 font-inter antialiased">
      
      <Header />

      <main>
        <HeroSection />
        <ServicesSection />
        <OfferBanner setFormState={setFormState} />
        <TestimonialsSection testimonialsData={testimonialsData} />
        <FAQsSection faqsData={faqsData} />
      </main>

      <Footer />
      
      {/* --- CONDITIONAL BOOKING FORM --- */}
      {formState.isOpen && formState.type && (
        <BookingForm
          serviceType={formState.type}
          showOfferLabel={formState.offer}
          onClose={handleCloseForm}
        />
      )}
      
    </div>
  );
};

export default Home;
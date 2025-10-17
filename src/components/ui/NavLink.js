// src/components/ui/NavLink.js

import React from 'react';

// Added onClick prop
const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    // Execute the passed onClick function when the link is clicked
    onClick={onClick} 
    className="py-2 px-4 text-gray-700 hover:text-indigo-600 transition duration-300 font-medium rounded-lg hover:bg-indigo-50"
  >
    {children}
  </a>
);

export default NavLink;
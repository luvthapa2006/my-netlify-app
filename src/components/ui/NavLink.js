// src/components/ui/NavLink.js

import React from 'react';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="py-2 px-4 text-gray-700 hover:text-indigo-600 transition duration-300 font-medium rounded-lg hover:bg-indigo-50"
  >
    {children}
  </a>
);

export default NavLink;
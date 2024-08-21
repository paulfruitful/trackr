import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

import { logout } from '../lib/logout';
const ScrollToTopButton = ({ onLogout }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleLogout =() => {
        logout()
        router.push('/login');
     };

  return (
    <div className="fixed bottom-4 right-4 flex lg:mr-3 ml-5 flex-col space-y-2">
         <a
             href='/recipes'
            aria-details='Generate AI Recipe'
            className="bg-black opacity-90 text-white p-3 hover:text-gray-400 active:text-gray-400  lg:opacity-100 lg:p-6 text-xl lg:text-4xl rounded-full shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
          >
            <FontAwesomeIcon icon={faCommentDots}/>

          </a>

          <button onClick={handleLogout}
            aria-details='Generate AI Recipe'
            className="bg-black opacity-90 text-white hover:text-gray-400 active:text-gray-400 p-3  lg:opacity-100 lg:p-6 text-xl lg:text-4xl rounded-full shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
          >
            <FontAwesomeIcon icon={faSignOutAlt}/>

          </button>
     
     
        {isVisible &&

        <div >
          <button
            
            className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Generate Recipe
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="bg-red-700 text-white p-4 rounded-full shadow-md active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout 
          </button>
        </div>}
    
    </div>
  );
};

export default ScrollToTopButton;
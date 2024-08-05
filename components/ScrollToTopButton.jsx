import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
const ScrollToTopButton = ({ onLogout }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex lg:mr-3 ml-5 flex-col space-y-2">
         <button
            aria-details='Generate AI Recipe'
            className="bg-black opacity-90 text-white p-3  lg:opacity-100 lg:p-6 text-4xl rounded-full shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
          >
            <FontAwesomeIcon icon={faCommentDots}/>

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
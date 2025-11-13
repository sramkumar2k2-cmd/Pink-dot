// components/ScrollNavbar.jsx
'use client';
import { useScrollDirection } from '../hooks/useScrollDirection';

const ScrollNavbar = () => {
  const scrollDirection = useScrollDirection();
  const isVisible = scrollDirection === 'up';

  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md 
        shadow-lg border-b border-gray-200 
        transition-all duration-300 ease-in-out z-50
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">Your Logo</div>
          
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </div>

          {/* Optional: CTA Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ScrollNavbar;
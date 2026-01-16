import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand-blue-700"
      >
        <path
          d="M10 110H110V95C110 95 95 105 60 105C25 105 10 95 10 95V110Z"
          fill="currentColor"
        />
        <path
          d="M10 95L25 45L45 75L60 30L75 75L95 45L110 95H10Z"
          fill="currentColor"
        />
        <circle cx="10" cy="35" r="10" fill="currentColor" />
        <circle cx="60" cy="20" r="10" fill="currentColor" />
        <circle cx="110" cy="35" r="10" fill="currentColor" />
      </svg>
      <span className="text-2xl font-bold text-gray-800 tracking-tight">
        Kingzy
      </span>
    </Link>
  );
};

export default Logo;

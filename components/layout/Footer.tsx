import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-6 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Kingzy Pharmaceuticals Limited. All rights reserved.</p>
        <div className="mt-2 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

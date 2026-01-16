import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { UserRole } from '@/types';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  
  // Mock data for now
  const isLoggedIn = true;
  // FIX: Use useState to hold the mock user role. This prevents TypeScript's
  // control flow analysis from narrowing the type of `userRole` to a single
  // enum member, which caused comparability errors in the switch statement.
  const [userRole] = useState<UserRole>(UserRole.WHOLESALE_BUYER);

  const getDashboardPath = () => {
    switch (userRole) {
      case UserRole.ADMIN: return '/admin';
      case UserRole.LOGISTICS_STAFF: return '/logistics';
      default: return '/dashboard';
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `text-gray-600 hover:text-brand-blue-700 transition-colors ${isActive ? 'font-semibold text-brand-blue-700' : ''}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-3">
          <Logo />
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-600 hover:text-brand-blue-700">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <div className="hidden md:block">
              {isLoggedIn ? (
                <Link to={getDashboardPath()} className="text-gray-600 hover:text-brand-blue-700">
                  <UserIcon size={24} />
                </Link>
              ) : (
                <Link to="/auth/login" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-700 rounded-md hover:bg-brand-blue-800">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/products" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
              <hr className="my-2" />
              {isLoggedIn ? (
                <NavLink to={getDashboardPath()} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>My Dashboard</NavLink>
              ) : (
                <NavLink to="/auth/login" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
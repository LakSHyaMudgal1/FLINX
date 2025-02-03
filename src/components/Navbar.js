import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';  
import logo from '../images/Loogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faShoppingCart, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');  // Set initial theme from local storage or default to dark

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Set initial theme based on local storage or default
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    return () => unsubscribe();
  }, [theme]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);  
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-2xl transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="w-10 h-10 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </Link>
        </div>

        {/* Navbar Links */}
        <ul className="flex space-x-8 items-center">
          <li>
            <Link 
              to="#about" 
              className="hover:text-[#9b59b6] transition duration-200 text-sm relative group"
              onClick={() => {
                const element = document.getElementById("about");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              About Us
              <span className="block h-1 w-full bg-[#9b59b6] rounded transition-all duration-200 scale-x-0 group-hover:scale-x-100" />
            </Link>
          </li>
          <li>
            <Link 
              to="#services" 
              className="hover:text-[#9b59b6] transition duration-200 text-sm relative group"
              onClick={() => {
                const element = document.getElementById("services");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Services
              <span className="block h-1 w-full bg-[#9b59b6] rounded transition-all duration-200 scale-x-0 group-hover:scale-x-100" />
            </Link>
          </li>
          <li>
            <Link 
              to="#contact" 
              className="hover:text-[#9b59b6] transition duration-200 text-sm relative group"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact Us
              <span className="block h-1 w-full bg-[#9b59b6] rounded transition-all duration-200 scale-x-0 group-hover:scale-x-100" />
            </Link>
          </li>

          <li>
            <Link to="/cart" className="flex items-center justify-center hover:text-[#9b59b6] transition duration-200">
              <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
            </Link>
          </li>

          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center hover:text-[#9b59b6] transition duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
              ) : (
                <FontAwesomeIcon icon={faSun} className="w-5 h-5" />
              )}
            </button>
          </li>
          <li>
                {/* <Link
                  to="/cart" // Redirects to the cart page
                  className="flex items-center justify-center hover:text-[#9b59b6] transition duration-200"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                </Link> */}
          </li>

          {/* User Auth */}
          {user ? (
            <li className="flex items-center space-x-2">
              <img
                src={user.photoURL || 'https://via.placeholder.com/40'}  
                alt="Profile"
                className="rounded-full w-10 h-10"
              />
              <button onClick={handleSignOut} className="hover:text-[#9b59b6] transition duration-200 text-sm">
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-[#9b59b6] transition duration-200 text-sm">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

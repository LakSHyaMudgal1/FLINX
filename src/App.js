import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';
import Login from './Login';
import Signup from './Signup';
import Barber from './components/Barber'
import ElectricalRepair from './components/ElecticalRepair';
import HomeCleaning from './components/homecleaning';
import Plumbing from './components/Plumbing';
import TiffinServicePage from './components/TiffinService';
import VegetableVendor from './components/VegetableVendor';
import ServiceFinder from './components/newfrontpage';
import PaintingService from './components/paintingService';
import CarpentryServices from './components/Carpentry';
import PestControlService from './components/PestControl';
import 'font-awesome/css/font-awesome.min.css';
import Cart from './components/cart';
import './App.css';
import CombinedCart from './components/cart';

const App = () => {
  
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark' || true); // Check localStorage for the initial theme

  useEffect(() => {
    // Apply the theme globally when isDarkMode changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`${isDarkMode ? 'dark' : 'light'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<FrontPage isDarkMode={isDarkMode} />} />
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
          <Route path="/ElectricalRepair" element={<ElectricalRepair isDarkMode={isDarkMode} />} />
          <Route path="/Barber" element={<Barber isDarkMode={isDarkMode} />} />
          <Route path="/HomeCleaning" element={<HomeCleaning isDarkMode={isDarkMode} />} />
          <Route path="/Plumbing" element={<Plumbing isDarkMode={isDarkMode} />} />
          <Route path="/TiffinService" element={<TiffinServicePage isDarkMode={isDarkMode} />} />
          <Route path="/VegetableVendor" element={<VegetableVendor isDarkMode={isDarkMode} />} />
          <Route path="/Painting" element={<PaintingService isDarkMode={isDarkMode} />} />
          <Route path="/Carpentry" element={<CarpentryServices isDarkMode={isDarkMode} />} />
          <Route path="/PestControl" element={<PestControlService isDarkMode={isDarkMode} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:serviceType" element={<Cart />} />
          <Route path="/combined-cart" element={<CombinedCart />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

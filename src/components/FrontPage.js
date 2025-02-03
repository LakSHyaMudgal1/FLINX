import React, { useState } from 'react';
import { Link } from 'react-scroll';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import barberImage from '../images/barber.jpg';
import electrician from '../images/electrician.jpg';
import cleaner from '../images/cleaner.jpg';
import cleaner2 from '../images/cleaner2.jpg';
import tiffin from '../images/tiffin.jpg';
import plumber from '../images/plumber.jpeg';
import './frontpage.css';
import ServiceCard from './ServiceCard';
// import carpenter from '../images/carpenter.jpg';
// import painter from '../images/painter.jpg';
// import pestControl from '../images/pest_control.jpg';

import '../App.css';

const FrontPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { name: 'Barber', description: 'Find skilled barbers near you.', url: '/Barber', icon: 'fas fa-scissors' },
    { name: 'Electrical Repair', description: 'Quick and reliable electrical services.', url: '/ElectricalRepair', icon: 'fas fa-bolt' },
    { name: 'Home Cleaning', description: 'Cleaning for your home.', url: '/HomeCleaning', icon: 'fas fa-broom' },
    { name: 'Plumbing', description: 'Expert plumbing services at your convenience.', url: '/Plumbing', icon: 'fas fa-tools' },
    { name: 'Tiffin Service', description: 'Delicious home-cooked meals delivered to you.', url: '/TiffinService', icon: 'fas fa-utensils' },
    { name: 'Vegetable Vendor', description: 'Fresh and organic vegetables at your doorstep.', url: '/VegetableVendor', icon: 'fas fa-carrot' },
    { name: 'Carpentry', description: 'Professional carpentry services for all needs.', url: '/Carpentry', icon: 'fas fa-hammer' },
    { name: 'Painting', description: 'Interior and exterior painting services.', url: '/Painting', icon: 'fas fa-paint-roller' },
    { name: 'Pest Control', description: 'Safe and effective pest control services.', url: '/PestControl', icon: 'fas fa-bug' },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    centerPadding: '10%',
    className: 'slick-center',
  };

  // Using react-spring for smooth hover animations
  const cardSpring = useSpring({
    transform: 'scale(1)',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    from: { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center relative px-8 overflow-hidden">
      {/* Header Section */}
      <header className="text-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-white mb-8"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">Welcome to FLINX</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-10">
            Connecting you with trusted local service providers for all your needs.
          </p>
        </motion.div>

        {/* Image Carousel Section */}
        <div className="w-full max-w-7xl px-4 mb-8 glow-effect">
  <Slider {...sliderSettings} className="rounded-lg overflow-hidden">
    {[barberImage, electrician, cleaner, cleaner2, tiffin, plumber].map((img, index) => (
      <div key={index} className="flex justify-center">
        <div className="image-container transform 3d-container">
          <img
            src={img}
            alt={`Service ${index}`}
            className="w-11/12 sm:w-11/12 h-80 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    ))}
  </Slider>
</div>


        {/* Search Bar Section */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-4 w-full bg-gray-800 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 transition duration-200"
            />
          </div>
        </div>
      </header>

      {/* Services Section */}

      <div className="w-full max-w-7xl px-4 py-24 bg-gray-800 rounded-lg mb-16">
      <h3 className="text-4xl font-bold text-white mb-10 text-center">Our Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <animated.div key={index}>
            <ServiceCard service={service} />
          </animated.div>
        ))}
      </div>
    </div>


      {/* About Section */}
      <section id="about" className="w-full max-w-7xl px-4 py-24 bg-gray-800 rounded-lg mb-16">
        <h3 className="text-4xl font-bold text-white mb-8">About FLINX</h3>
        <p className="text-lg text-gray-400 mb-6">
          At FLINX, we are dedicated to connecting you with trusted local service providers for all your needs.
          Whether you need a skilled barber, an expert electrician, or a reliable cleaning service,
          we strive to make your experience seamless and efficient.
        </p>
        <p className="text-lg text-gray-400">
          Our platform empowers service providers to showcase their skills and connect with customers,
          fostering a community built on trust and quality service. Join us at FLINX and experience the convenience
          of finding the right service provider for your needs.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-7xl px-4 py-24 bg-gray-800 rounded-lg mb-16">
        <h3 className="text-4xl font-bold text-white mb-8">Contact Us</h3>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-purple-500 transition duration-200"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-purple-500 transition duration-200"
            required
          />
          <textarea
            placeholder="Your Message"
            className="p-4 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-purple-500 transition duration-200"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white p-4 rounded-lg transition duration-200 hover:bg-purple-600"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 py-16 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">FLINX</h2>
            <p className="text-gray-400 mt-2">Your trusted platform for local services.</p>
            <div className="flex space-x-4 mt-4">
              {['facebook', 'twitter', 'instagram'].map((platform) => (
                <a key={platform} href={`https://www.${platform}.com`} className="hover:text-purple-500">
                  <i className={`fab fa-${platform} fa-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h5 className="text-lg font-semibold text-white mb-2">Quick Links</h5>
            {['services', 'about', 'contact'].map((section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={500}
                className="hover:text-purple-500 mb-2 cursor-pointer"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontPage;

// ServiceFinder.js
import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import './ServiceFinder.css';

const services = [
  { name: 'Hair Treatment', link: '/hair-treatment' },
  { name: 'Electric Repair', link: '/electric-repair' },
  { name: 'Tiffin Services', link: '/tiffin-services' },
  { name: 'Home Cleaning', link: '/home-cleaning' },
  { name: 'Vegetable Vendor', link: '/vegetable-vendor' },
  { name: 'Plumbing', link: '/plumbing' },
];

const ServiceFinder = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
  });

  const renderServices = () => {
    return services.map((service, index) => (
      <a href={service.link} key={index} className="service-tab">
        {service.name}
      </a>
    ));
  };

  return (
    <div className="service-finder-container">
      <div className="left-panel">
        <h2>Location</h2>
        <div className="map-container">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={{ lat: 40.73061, lng: -73.935242 }} // Default location
              zoom={10}
            />
          ) : (
            <p>Loading map...</p>
          )}
        </div>

        <div className="service-selection">
          <h3>Which services are you looking for?</h3>
          <div className="service-tabs">{renderServices()}</div>
        </div>
      </div>

      <div className="right-panel">
        <div className="image-collage">
          <div className="image-item" style={{ backgroundImage: 'url(image1.jpg)' }}></div>
          <div className="image-item" style={{ backgroundImage: 'url(image2.jpg)' }}></div>
          <div className="image-item" style={{ backgroundImage: 'url(image3.jpg)' }}></div>
          <div className="image-item" style={{ backgroundImage: 'url(image4.jpg)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFinder;

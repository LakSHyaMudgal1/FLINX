import React, { useState, useRef } from 'react';

const ServiceCard = ({ service }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [borderPosition, setBorderPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null); // To get the card's dimensions and position

  // Track mouse position and update the rotation values
  const handleMouseMove = (e) => {
    const { clientX, clientY, target } = e;
    const { width, height, left, top } = target.getBoundingClientRect();

    // Calculate the center of the card
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate the rotation based on mouse position
    const angleX = ((clientY - centerY) / height) * 30; // Adjust the multiplier for effect
    const angleY = ((clientX - centerX) / width) * 30;  // Adjust the multiplier for effect

    setRotation({ x: angleX, y: angleY });

    // Track the mouse position relative to the card for border effect
    const posX = (clientX - left) / width * 100; // Percentage of X axis
    const posY = (clientY - top) / height * 100; // Percentage of Y axis

    setBorderPosition({ x: posX, y: posY });
  };

  // Reset the rotation and border position when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 }); // Reset rotation
    setBorderPosition({ x: 0, y: 0 }); // Reset border position
  };

  return (
    <div
      className="service-card bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      onMouseMove={handleMouseMove}  // Attach mouse move event
      onMouseLeave={handleMouseLeave} // Reset on mouse leave
      ref={cardRef}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,  // Apply rotation
        transition: 'transform 0.1s ease-out',  // Smooth transition for rotation
        position: 'relative', // So we can position the border correctly
      }}
    >
      <div className="card-inner">
        <div className="flex items-center mb-4">
          <i className={`${service.icon} text-3xl text-purple-500 mr-4`}></i>
          <div>
            <h4 className="text-xl font-semibold text-white">{service.name}</h4>
            <p className="text-gray-300">{service.description}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.href = service.url}
          className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg transition duration-200 hover:bg-purple-600"
        >
          Learn More
        </button>
      </div>

      {/* Dynamic border without any purple color */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        style={{
          background: `radial-gradient(circle at ${borderPosition.x}% ${borderPosition.y}%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)`, // No purple, just a dark shadow effect
          transition: 'background 0.2s ease-out',
          pointerEvents: 'none', // Ensures the border does not interfere with card interaction
        }}
      />
    </div>
  );
};

export default ServiceCard;

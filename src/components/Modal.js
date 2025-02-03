import React from 'react';

const Modal = ({ showModal, setShowModal, setShowRegistrationModal, barbers, selectedService }) => {
  if (!showModal) return null;

  // Filter barbers by the selected service
  const filteredBarbers = barbers.filter(barber => barber.service === selectedService);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Available Barbers for {selectedService}</h2>

        <ul className="text-gray-400 mb-6">
          {filteredBarbers.length > 0 ? (
            filteredBarbers.map((barber, index) => (
              <li key={index} className="mb-2">
                <span className="text-white font-semibold">{barber.name}</span> - {barber.contact} - Price: ${barber.price}
              </li>
            ))
          ) : (
            <p>No barbers are currently registered for this service.</p>
          )}
        </ul>

        <button
          onClick={() => setShowRegistrationModal(true)}
          className="bg-[#9b59b6] py-2 px-6 rounded-lg text-white font-semibold hover:bg-[#8e44ad] transition duration-200"
        >
          Register as a Barber
        </button>
      </div>
    </div>
  );
};

export default Modal;

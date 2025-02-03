import React, { useState } from 'react';

const RegistrationModal = ({ showRegistrationModal, setShowRegistrationModal, addBarber }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && contact && price ) {
      await addBarber({ name, contact, price });
      setShowRegistrationModal(false);
      setName('');
      setContact('');
      setPrice('');
      setService('');
    }
  };

  if (!showRegistrationModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          onClick={() => setShowRegistrationModal(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Register as a Barber</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600 focus:outline-none focus:border-[#9b59b6] transition duration-200"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Contact Number</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600 focus:outline-none focus:border-[#9b59b6] transition duration-200"
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600 focus:outline-none focus:border-[#9b59b6] transition duration-200"
              placeholder="Enter your price range"
              required
            />
          </div>

          

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#9b59b6] py-2 px-6 rounded-lg text-white font-semibold hover:bg-[#8e44ad] transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;

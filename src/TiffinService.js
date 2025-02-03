import React from 'react';

function TiffinService() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-yellow-200 via-orange-400 to-red-400 text-white p-10">
      <h1 className="text-5xl font-bold mb-10 text-center">Tiffin Services</h1>
      <p className="text-center mb-8 max-w-lg mx-auto">
        Enjoy healthy and delicious home-cooked meals delivered right to your doorstep. Available on a subscription basis or one-time orders.
      </p>
      <div className="flex justify-center">
        <button className="bg-red-500 py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-700 transition-all duration-300">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}

export default TiffinService;

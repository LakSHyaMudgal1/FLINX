import React from 'react';

function VegetableVendor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-400 text-white p-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-8">Nearby Vegetable Vendor</h1>
      <p className="text-lg text-center mb-8 max-w-xl">
        Get fresh vegetables delivered from local vendors straight to your door. Supporting local farmers while eating fresh!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Vendor 1 */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500">
          <h2 className="text-2xl font-bold mb-4">Fresh Farm</h2>
          <p>Organic vegetables directly from the farm. Available every day.</p>
          <button className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300">
            Order Now
          </button>
        </div>
        {/* Vendor 2 */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500">
          <h2 className="text-2xl font-bold mb-4">Local Vendor</h2>
          <p>Daily supply of fresh vegetables from local markets.</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default VegetableVendor;

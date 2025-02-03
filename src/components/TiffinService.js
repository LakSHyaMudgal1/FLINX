import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const RegistrationModal = ({ showRegistrationModal, setShowRegistrationModal, addProvider, selectedService }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && contact && price) {
      await addProvider({ name, contact, price, service: selectedService });
      setShowRegistrationModal(false);
      setName('');
      setContact('');
      setPrice('');
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

        <h2 className="text-2xl font-bold text-white mb-4">Register as a Tiffin Provider</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600 focus:outline-none"
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
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600 focus:outline-none"
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
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600 focus:outline-none"
              placeholder="Enter your price per tiffin"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Service</label>
            <input
              type="text"
              value={selectedService}
              readOnly
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 py-2 px-6 rounded-lg text-white font-semibold hover:bg-gray-900 transition duration-200"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CartModal = ({ showCartModal, setShowCartModal, cartItems, removeFromCart }) => {
  if (!showCartModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          onClick={() => setShowCartModal(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Your Cart</h2>

        {cartItems.length > 0 ? (
          <ul className="text-gray-400 mb-6 space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#3c3c3c] p-3 rounded-lg"
              >
                <div>
                  <span className="font-semibold text-white">{item.providerName}</span> - 
                  {item.contact} - Price: ${item.price}
                </div>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-800 transition duration-200"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

const TiffinService = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [providers, setProviders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [showProviderList, setShowProviderList] = useState(false);
<Link to="/tiffin-cart">
  <button className="bg-green-600 py-2 px-6 rounded-lg text-white font-semibold hover:bg-green-800 transition duration-200">
    View Cart
  </button>
</Link>
  useEffect(() => {
    const fetchProviders = async () => {
      const providerQuerySnapshot = await getDocs(collection(db, 'tiffinProviders'));
      const providerList = providerQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProviders(providerList);
    };

    const fetchCartItems = async () => {
      const cartQuerySnapshot = await getDocs(collection(db, 'tiffinCart'));
      const cartList = cartQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(cartList);
    };

    fetchProviders();
    fetchCartItems();
  }, []);

  const addProvider = async (provider) => {
    try {
      await addDoc(collection(db, 'tiffinProviders'), provider);
      setProviders((prevProviders) => [...prevProviders, provider]);
    } catch (error) {
      console.error('Error adding provider:', error);
    }
  };

  const addToCart = async (provider) => {
    try {
      const cartItem = {
        providerName: provider.name,
        contact: provider.contact,
        price: provider.price,
        service: provider.service,
        timestamp: new Date(),
      };

      const docRef = await addDoc(collection(db, 'tiffinCart'), cartItem);
      setCartItems((prevCartItems) => [...prevCartItems, { id: docRef.id, ...cartItem }]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await deleteDoc(doc(db, 'tiffinCart', id));
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const services = [
    { name: 'Daily Vegetarian Meal', minPrice: 5, maxPrice: 15 },
    { name: 'Daily Non-Vegetarian Meal', minPrice: 10, maxPrice: 20 },
    { name: 'Weekly Vegetarian Plan', minPrice: 30, maxPrice: 70 },
    { name: 'Weekly Non-Vegetarian Plan', minPrice: 50, maxPrice: 100 },
    { name: 'Customized Meal Plan', minPrice: 15, maxPrice: 50 },
  ];

  const filteredProviders = providers.filter(
    (provider) => provider.service === selectedService
  );

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center text-white">
      <header className="w-full py-8 bg-gray-900 text-center">
        <h1 className="text-4xl font-bold">Tiffin Services</h1>
        <Link to="/combined-cart">
  <button className="bg-green-600 py-2 px-6 rounded-lg text-white font-semibold hover:bg-green-800 transition duration-200">
    View Combined Cart
  </button>
</Link>
      </header>

      <section className="w-full max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6">Delicious and Affordable Tiffin Plans</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-[#1e1e1e] p-6 rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              <h4 className="text-xl font-semibold">{service.name}</h4>
              <p className="text-gray-400">
                Price Range: ${service.minPrice} - ${service.maxPrice}
              </p>

              <button
                onClick={() => {
                  setSelectedService(service.name);
                  setShowRegistrationModal(true);
                }}
                className="absolute top-2 left-2 bg-[#3498db] text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-[#2980b9] transition duration-200"
              >
                Register
              </button>

              <button
                onClick={() => {
                  setSelectedService(service.name);
                  setShowProviderList(true);
                }}
                className="absolute top-2 right-2 bg-[#9b59b6] text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-[#8e44ad] transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {showProviderList && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-xl">
              <h3 className="text-xl font-semibold mb-4">Select a Provider for {selectedService}</h3>
              {filteredProviders.length === 0 ? (
                <p className="text-gray-400">No providers available for this service.</p>
              ) : (
                <div className="space-y-4">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="flex justify-between items-center bg-[#3c3c3c] p-4 rounded-lg"
                    >
                      <span>{provider.name} - ${provider.price}</span>
                      <button
                        onClick={() => {
                          addToCart(provider);
                          setShowProviderList(false);
                        }}
                        className="bg-[#3498db] text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-[#2980b9] transition duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowProviderList(false)}
                className="bg-gray-700 text-white py-2 px-6 rounded-lg mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      <CartModal
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
      <RegistrationModal
        showRegistrationModal={showRegistrationModal}
        setShowRegistrationModal={setShowRegistrationModal}
        addProvider={addProvider}
        selectedService={selectedService}
      />
    </div>
  );
};

export default TiffinService;

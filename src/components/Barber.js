import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const RegistrationModal = ({ showRegistrationModal, setShowRegistrationModal, addBarber, selectedService, selectedGender }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && contact && price) {
      // Add the barber with the selected service and gender
      await addBarber({ name, contact, price, service: selectedService, gender: selectedGender });
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

          <div>
            <label className="block text-gray-400 mb-2">Service</label>
            <input
              type="text"
              value={selectedService}
              readOnly
              className="w-full p-3 rounded-lg bg-[#3c3c3c] text-gray-200 border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Gender</label>
            <input
              type="text"
              value={selectedGender}
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

const Modal = ({ showModal, setShowModal, setShowRegistrationModal, barbers, selectedService, selectedGender }) => {
  if (!showModal) return null;

  const filteredBarbers = barbers.filter(
    (barber) => barber.service === selectedService && barber.gender === selectedGender
  );

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
          className="bg-gray-800 py-2 px-6 rounded-lg text-white font-semibold hover:bg-gray-900 transition duration-200"
        >
          Register as a Barber
        </button>
      </div>
    </div>
  );
};

const BarberService = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    const fetchBarbers = async () => {
      const maleQuerySnapshot = await getDocs(collection(db, 'male'));
      const femaleQuerySnapshot = await getDocs(collection(db, 'female'));
  
      const maleBarbers = maleQuerySnapshot.docs.map(doc => doc.data());
      const femaleBarbers = femaleQuerySnapshot.docs.map(doc => doc.data());
  
      // Combine both male and female barbers into one array
      setBarbers([...maleBarbers, ...femaleBarbers]);
    };
  
    fetchBarbers();
  }, []);
  
  const addBarber = async (barber) => {
    try {
      const genderCollection = barber.gender.toLowerCase();
      await addDoc(collection(db, genderCollection), {
        name: barber.name,
        contact: barber.contact,
        price: barber.price,
        service: barber.service,
        gender: barber.gender
      });
  
      // Fetch updated barber data to reflect the newly added barber
      const updatedBarbersSnapshot = await getDocs(collection(db, genderCollection));
      const updatedBarbers = updatedBarbersSnapshot.docs.map(doc => doc.data());
      setBarbers((prevBarbers) => [...prevBarbers, ...updatedBarbers]);
    } catch (error) {
      console.error("Error adding barber to Firestore:", error);
    }
  };
  

  const services = {
    male: [
      { name: 'Haircut', minPrice: 20, maxPrice: 50 },
      { name: 'Shave', minPrice: 10, maxPrice: 30 },
      { name: 'Beard Trim', minPrice: 15, maxPrice: 40 },
      { name: 'Hair Coloring', minPrice: 40, maxPrice: 100 },
      { name: 'Hair Treatment', minPrice: 30, maxPrice: 70 },
      { name: 'Facial', minPrice: 30, maxPrice: 60 }
    ],
    female: [
      { name: 'Haircut', minPrice: 25, maxPrice: 60 },
      { name: 'Hair Coloring', minPrice: 50, maxPrice: 150 },
      { name: 'Shampoo & Blow Dry', minPrice: 30, maxPrice: 70 },
      { name: 'Facial', minPrice: 35, maxPrice: 80 },
      { name: 'Keratin Treatment', minPrice: 100, maxPrice: 250 },
      { name: 'Hair Extensions', minPrice: 200, maxPrice: 500 }
    ]
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center text-white">
      <header className="w-full py-8 bg-gray-900 text-center">
        <h1 className="text-4xl font-bold">Barber Services</h1>
      </header>

      <section className="w-full max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6">Professional Haircuts and Grooming</h2>
        <p className="text-lg text-gray-400 mb-4">
          At FLINX, we provide top-notch grooming services by experienced barbers. Whether
          you need a simple haircut or a complete grooming session, our barbers have you covered.
        </p>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold">Men's Services</h3>
          <Slider {...settings}>
            {services.male.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedService(service.name);
                  setSelectedGender('Male');
                  setShowModal(true);
                }}
                className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
              >
                <div className="bg-gray-400 h-40 mb-4 rounded-lg"></div> {/* Image Placeholder */}
                <h4 className="text-xl font-semibold">{service.name}</h4>
                <p className="text-gray-400">Price Range: ${service.minPrice} - ${service.maxPrice}</p>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold">Women's Services</h3>
          <Slider {...settings}>
            {services.female.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedService(service.name);
                  setSelectedGender('Female');
                  setShowModal(true);
                }}
                className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
              >
                <div className="bg-gray-400 h-40 mb-4 rounded-lg"></div> {/* Image Placeholder */}
                <h4 className="text-xl font-semibold">{service.name}</h4>
                <p className="text-gray-400">Price Range: ${service.minPrice} - ${service.maxPrice}</p>
              </div>
            ))}
          </Slider>
        </div>

        <button
          onClick={() => setShowRegistrationModal(true)}
          className="bg-gray-800 py-2 px-6 rounded-lg text-white font-semibold hover:bg-gray-900 transition duration-200"
        >
          Register as a Barber
        </button>
      </section>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setShowRegistrationModal={setShowRegistrationModal}
        barbers={barbers}
        selectedService={selectedService}
        selectedGender={selectedGender}
      />

      <RegistrationModal
        showRegistrationModal={showRegistrationModal}
        setShowRegistrationModal={setShowRegistrationModal}
        addBarber={addBarber}
        selectedService={selectedService}
        selectedGender={selectedGender}
      />
    </div>
  );
};  export default BarberService;

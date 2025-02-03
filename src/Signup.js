import React, { useState } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaGoogle, FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';  

const Signup = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 15 },
  });

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null); 

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed up:', user);
      
      
      navigate('/');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, phone, email, password, confirmPassword } = formData;

 
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      
      
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      setError("Error signing up. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRedirectToLogin = () => {
    navigate('/login');  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] p-4">
      <animated.div
        style={springProps}
        className="bg-[#1e1e1e] p-10 rounded-xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-2">Create Account</h2>
        <p className="text-center text-gray-400 mb-6">Sign up to get started!</p>

        {error && <p className="text-center text-red-500">{error}</p>}

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center space-x-2 mb-4 bg-[#4285F4] hover:bg-[#357ae8] rounded-lg py-3 transition-all duration-200 text-white shadow-md hover:shadow-lg w-full"
        >
          <FaGoogle className="text-white text-xl" />
          <span className="font-semibold">Sign up with Google</span>
        </button>

        <div className="border-b border-gray-600 mb-4"></div>

        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="pl-10 flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <div className="relative flex items-center">
            <FaPhone className="absolute left-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="pl-10 flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10 flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="pl-10 flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#9b59b6] hover:bg-[#a76dca] rounded-lg py-3 transition-all duration-200 text-white font-semibold shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <button onClick={handleRedirectToLogin} className="text-[#9b59b6] hover:underline font-semibold">
            Log in
          </button>
        </p>
      </animated.div>
    </div>
  );
};export default Signup;
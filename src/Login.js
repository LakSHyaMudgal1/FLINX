
import React from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaLock, FaGoogle } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 15 },
  });

  const navigate = useNavigate(); 

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in:', user);
      
      
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleRedirectToSignup = () => {
    navigate('/signup');  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] p-4">
      <animated.div
        style={springProps}
        className="bg-[#1e1e1e] p-10 rounded-xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-6">Please log in to continue.</p>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-2 mb-4 bg-[#4285F4] hover:bg-[#357ae8] rounded-lg py-3 transition-all duration-200 text-white shadow-md hover:shadow-lg w-full"
        >
          <FaGoogle className="text-white text-xl" />
          <span className="font-semibold">Sign in with Google</span>
        </button>

        <div className="border-b border-gray-600 mb-4"></div>

        <form className="space-y-6">
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Email"
              required
              className="flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Password"
              required
              className="flex-1 p-4 bg-[#3c3c3c] border border-gray-600 rounded-md focus:border-[#9b59b6] focus:outline-none transition-all duration-200 text-gray-200 placeholder-gray-500 placeholder-opacity-75"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#9b59b6] hover:bg-[#a76dca] rounded-lg py-3 transition-all duration-200 text-white font-semibold shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <button onClick={handleRedirectToSignup} className="text-[#9b59b6] hover:underline font-semibold">
            Sign up
          </button>
        </p>
      </animated.div>
    </div>
  );
};

export default Login;

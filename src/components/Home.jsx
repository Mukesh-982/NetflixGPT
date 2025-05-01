import React from 'react';
import { background, LOGO_URL } from '../constants/constants';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      
      <div className='flex items-center justify-between px-4 bg-gradient-to-b from-black to-transparent'>
        <div className='w-32 mt-6'>
          <img src={LOGO_URL} alt="logo" className='w-full h-auto' />
        </div>
        <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-4 mt-6 rounded-lg font-semibold shadow-md cursor-pointer transition-all duration-200'
          onClick={()=> navigate('/login')}
        >
          Log in
        </button>
      </div>

      <div className="flex flex-col justify-center items-center h-full text-white text-center relative px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Unlimited movies, TV <br /> shows, and more.
        </h1>
        <h2 className="text-lg md:text-xl font-semibold mt-2">
          Watch anywhere. Cancel anytime.
        </h2>

        <h3 className="text-md md:text-lg font-medium mt-4">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Email Address" 
            className="w-80 sm:w-96 px-4 py-3 rounded-lg bg-white text-black outline-none border border-gray-300"
          />
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 cursor-pointer">
            Get Started 🢒
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

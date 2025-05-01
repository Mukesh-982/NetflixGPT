import React from 'react';
import { LOGO_URL, userIcon } from '../constants/constants';
import useHandleSignOut from '../hooks/useHandleSignOut';

const Header = () => {
  const handleSignOut = useHandleSignOut();

  return (
    <header className='flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent'>
      {/* Logo */}
      <div className='w-28'>
        <img src={LOGO_URL} alt="logo" className='w-full h-auto' />
      </div>

      {/* User Icon + Logout Button */}
      <div className='flex items-center gap-3'>
        <img
          src={userIcon}
          alt="user icon"
          className='w-10 h-10 rounded border border-gray-300 object-cover'
        />
        <button
          onClick={handleSignOut}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition duration-200 cursor-pointer'
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;

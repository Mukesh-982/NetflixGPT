import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGO_URL } from '../constants/constants'
const Header = () => {
  
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center p-4 bg-gradient-to-b from-black'>
      <div className='w-28'>
        <img src={LOGO_URL} alt="logo" className='w-full h-auto'/>
      </div>
      <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md cursor-pointer transition-all duration-200'
        onClick={()=> navigate('/login')}
      >
        Log in
      </button>
    </div>
  )
}

export default Header;

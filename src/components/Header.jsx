import React from 'react'
import { LOGO_URL } from '../constants/constants'

const Header = ({ children }) => {
  return (
    <div className='flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent'>
      <div className='w-28'>
        <img src={LOGO_URL} alt="logo" className='w-full h-auto' />
      </div>
      {children}
    </div>
  )
}

export default Header

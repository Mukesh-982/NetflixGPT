import React from 'react'
import Header from './Header'
import { userIcon } from '../constants/constants'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
    
    const navigate = useNavigate();

    const handleSignOut = ()=>{
        signOut(auth).then(()=>{
            navigate("/");
        }).catch((error)=>{
            navigate("/error");
        })
    }

    return (
        <div className='min-h-screen bg-gray-100'>
        <Header>
            <div className='flex items-center gap-3 mr-4'>
            <img 
                src={userIcon} 
                alt="user icon" 
                className='w-10 h-10 rounded border border-gray-300 object-cover' 
            />
            <button 
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition duration-200 cursor-pointer'
                onClick={handleSignOut}
            >
                Log out
            </button>
            </div>
        </Header>
        </div>
    )
}

export default Browse

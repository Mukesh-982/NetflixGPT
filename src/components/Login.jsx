import React, {useState} from 'react'
import { background, LOGO_URL } from '../constants/constants'
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black'>
                <div className='w-28 m-4'>
                    <img src={LOGO_URL} alt="logo" className='w-full h-auto'/>
                </div>
            </div>

            <div className="bg-black/75 p-8 rounded-lg shadow-lg text-white w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">{isSignInForm ? "Sign In" : "Sign Up"}</h2>
                <form className="flex flex-col">
                    {
                        !isSignInForm && (
                            <input type="text" 
                                placeholder='Full Name'
                                className='p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                            />
                        )
                    }
                    <input 
                        type="text" 
                        placeholder="Email address" 
                        className="p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button 
                        className="bg-red-600 hover:bg-red-700 transition-all p-3 rounded-md font-semibold text-white cursor-pointer">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                </form>
                <p onClick={toggleSignInForm} className="text-sm text-gray-400 mt-4 text-center">
                    {
                        isSignInForm ? (
                            <>
                                New to Our Service? 
                                <span className="text-red-500 cursor-pointer hover:underline ml-1">Sign up now</span>
                            </>
                        ) : (
                            <>
                                Already existing user?
                                <span className="text-red-500 cursor-pointer hover:underline ml-1">Sign in now</span>
                            </>
                        )
                    }
                </p>
            </div>
            
                
        </div>
    )
}

export default Login

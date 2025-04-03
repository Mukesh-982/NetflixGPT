import React, {useState, useRef} from 'react'
import { background, LOGO_URL } from '../constants/constants'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = ()=>{
        
        const message = checkValidData( email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);

        //todo : Sign in or Sign up
        if(message) return;

        if(!isSignInForm){
            //Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential)=>{
                //Signed up
                const user = userCredential.user;
                console.log(user);
                navigate('/browse');
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode +"-"+errorMessage);
            });
        }
        else{
            // Sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential)=>{
                //Signed In
                const user = userCredential.user;
                console.log(user);
                navigate('/browse');
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode +"-"+errorMessage);
            });
        }

    }

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
                <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col">
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
                        ref={email} 
                        placeholder="Email address" 
                        className="p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input 
                        type="password" 
                        ref={password}
                        placeholder="Password" 
                        className="p-3 mb-4 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errorMessage && (
                        <p className='p-3 mb-4 text-lg font-bold text-red-600 text-center'>{errorMessage}</p>
                    )}
                    <button 
                        className="bg-red-600 hover:bg-red-700 transition-all p-3 rounded-md font-semibold text-white cursor-pointer"
                        onClick={handleButtonClick}
                    >
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

import React, {useState, useRef} from 'react'
import { background, userIcon } from '../constants/constants'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import Header from './Header';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    
    const dispatch = useDispatch();
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = ()=>{
        
        const message = checkValidData( email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);

        //todo : Sign in or Sign up
        if(message) return;

        if (!isSignInForm) {
            // Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Update user profile
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: userIcon, 
                    })
                    .then(() => {
                        // Redux will update via onAuthStateChanged
                        const {uid, email, displayName, photoURL} = user;
                        dispatch(addUser({uid: uid, email: email, name: displayName, photoURL: photoURL}));
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        }
        else{
            // Sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential)=>{
                //Signed In
                const user = userCredential.user;
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
        <div className="relative w-screen h-screen overflow-hidden "
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            
            <Header/>

            <div className='flex justify-center items-center h-[calc(100vh-80px)] mt-4'>
                <div className="bg-black/75 p-8 rounded-lg shadow-lg text-white w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">{isSignInForm ? "Sign In" : "Sign Up"}</h2>
                    <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col">
                        {
                            !isSignInForm && (
                                <input type="text" 
                                    ref={name}
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
            
                
        </div>
    )
}

export default Login

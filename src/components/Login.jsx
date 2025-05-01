import React, { useState, useRef } from 'react';
import { background, userIcon, LOGO_URL } from '../constants/constants';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import LoadingSpinner from './LoadingSpinner';  // Import the spinner component

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);  // Add loading state
  
  const dispatch = useDispatch();
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    console.log(message);
    setErrorMessage(message);

    if (message) return;

    setLoading(true); // Set loading state to true when the request starts

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: userIcon, 
          })
          .then(() => {
            const { uid, email, displayName, photoURL } = user;
            dispatch(addUser({ uid: uid, email: email, name: displayName, photoURL: photoURL }));
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .finally(() => {
          setLoading(false);  // Set loading state to false when the request finishes
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed In
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
        })
        .finally(() => {
          setLoading(false);  // Set loading state to false when the request finishes
        });
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden "
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {loading && <LoadingSpinner />} {/* Show Loading Spinner when loading is true */}
      
      <div className='w-32 mt-6'>
        <img src={LOGO_URL} alt="logo" className='w-full h-auto' />
      </div>

      <div className='flex justify-center items-center h-[calc(100vh-80px)] mt-4'>
        <div className="bg-black/75 p-8 rounded-lg shadow-lg text-white w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">{isSignInForm ? "Sign In" : "Sign Up"}</h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
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

export default Login;

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/userSlice';
import { auth } from '../utils/firebase';
import Home from '../components/Home';
import Login from '../components/Login';
import Browse from '../components/Browse';
import ProtectedRoute from '../components/ProtectedRoute';
import RedirectIfAuthenticated from '../components/RedirectIfAuthenticated';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthHandler = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, name: displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
      setIsLoading(false); 
    });

    // Optional: cleanup on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />; 
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <Login/>
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/browse"
        element={
          <ProtectedRoute>
            <Browse/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AuthHandler;

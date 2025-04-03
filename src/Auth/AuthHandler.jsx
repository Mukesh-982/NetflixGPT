import React, { useEffect } from 'react'
import Home from '../components/Home'
import Login from '../components/Login'
import Browse from '../components/Browse'
import {Routes, Route} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../redux/userSlice'


const AuthHandler = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
        if(user){
            // User is logged in or signed up
            const {uid, email, displayName} = user;
            dispatch(addUser({uid: uid, email: email, name: displayName}));
        }
        else{
            // user is logged out
            dispatch(removeUser());
        }
    })
    },[])

    return (
        <div>
            <Routes>
                <Route path='/' element= {<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/browse' element={<Browse/>}/>
            </Routes>
        </div>
    );
}

export default AuthHandler

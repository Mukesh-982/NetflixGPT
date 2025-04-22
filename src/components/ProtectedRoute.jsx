import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const user = useSelector(state => state.user);
    if(!user || !user.email){
        return <Navigate to='/login' replace/>
    }
    return (
        <div>
            {children}
        </div>
    );
}

export default ProtectedRoute;

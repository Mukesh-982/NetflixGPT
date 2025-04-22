import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RedirectIfAuthenticated = ({children}) => {
    const user = useSelector(state => state.user);
    if(user){
        return <Navigate to='/browse' replace/>
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default RedirectIfAuthenticated;

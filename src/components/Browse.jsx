import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {

    useNowPlayingMovies();

    return (
        <div className='min-h-screen bg-gray-100'>
            <Header/>   
        </div>
    )
}

export default Browse

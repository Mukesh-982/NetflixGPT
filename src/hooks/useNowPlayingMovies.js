import React, { useEffect } from 'react'
import axios from 'axios';
import { API_OPTIONS } from '../constants/constants';
import { addNowPlayingMovies } from '../redux/movieSlice';
import { useDispatch } from "react-redux"

const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();

    const getNowPlayingMovies = async ()=>{
        const res = await axios.request(API_OPTIONS);
        console.log(res.data.results);
        dispatch(addNowPlayingMovies(res.data.results));
    }

    useEffect(()=>{
        getNowPlayingMovies();
    },[]);

}

export default useNowPlayingMovies;
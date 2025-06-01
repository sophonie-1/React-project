import React,{ useReducer, useState } from 'react'
import BookingForm from './BookingForm'
import { useNavigate } from 'react-router-dom';


import { initializeTimes, updateTimes } from './TimeReducer';



export default function BookingPage() {
    const navigate = useNavigate();

    const [AvailableTimes, dispatch]=useReducer(updateTimes, [], initializeTimes )
    const [AvailableTime, setAvalaibleTime]=useState("")


    return (
        <>
            <button 
            className="back-button"
            onClick={() => navigate('/')}
            >
            back to Home
            </button>

            <BookingForm AvailableTime={AvailableTime} setAvalaibleTime={setAvalaibleTime} dispatch={dispatch} AvailableTimes={AvailableTimes} />
        </>
    )
}





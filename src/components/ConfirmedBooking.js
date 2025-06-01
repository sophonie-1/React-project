import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConfirmedBooking.css';

export default function ConfirmedBooking() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1 className="confirmation-title">Reservation confermation</h1>
        <p className="confirmation-message">
          thank you for reservation on Little lemon restaurant
        </p>
        <div className="confirmation-details">
          <p>your reservation table succeded</p>
          
        </div>
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

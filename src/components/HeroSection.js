import React from 'react'
import restaurant from '../assets/restauranfood.jpg'
import '../styles/HeroSection.css';
import { Link } from 'react-router-dom';
export default function HeroSection () {
  return (
    <div className='hero-section'>
        <div className='hero-overlay'>
            <div className='hero-text'>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                    We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twistWe are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </p>
                <button className='reserve-button'><Link to="/booking">book a table</Link></button>
            </div>
            <div className='hero-image'>
                <img src={restaurant} alt="Restaurant" />
            </div>
        </div>
    </div>
  )
}

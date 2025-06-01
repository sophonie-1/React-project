import React from 'react'
import  marioAndadrianA from "./../assets/Mario.webp"
import  marioAndadrianB from "./../assets/Mario-Adriano.webp"
import "../styles/About.css"

export default function About() {
  return (
    <div className="container">
        <div className="text-content">
            <h2>Little Lemon</h2>
            <h4>Chicago</h4>
            <p>
                We are a family owned Mediterranean restaurant, focused on traditional recipes 
                served with a modern twist. We are a family owned Mediterranean restaurant, 
                focused on traditional recipes served with a modern twist.
            </p>
        </div>
        <div className='images'>
            <img src={marioAndadrianA} alt='' className='img1'/>
            <img src={marioAndadrianB} alt='' className='img2'/>
        </div>
    </div>
  )
}

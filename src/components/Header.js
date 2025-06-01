import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import '../styles/Header.css'
export default function Header() {
  return (
    <header className="header">
        <div className="logo">
            <img src={logo} alt="Little Lemon Logo" />
        </div>
        <nav className="nav">
            <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><a href="#order">Order Online</a></li>
            <li><a href="#login">Login</a></li>
            </ul>
        </nav>
    </header>
  )
}

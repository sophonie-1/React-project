import React from 'react'
import '../styles/Footer.css'
import logo  from '../assets/logo 2.png'
export default function Footer() {
  return (
    <div>
        <footer className="footer">
            <div className="footer-container">
                <div className="">
                    <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
                </div>
                <div className="footer-navigation item-footer">
                    <h4>Doorman Navigation</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Menu</a></li>
                        <li><a href="#">Reservations</a></li>
                        <li><a href="#">Order Online</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </div>
                <div className="contact item-footer">
                    <h4>Contact</h4>
                    <p>Adress: 123 Main St, Chicago, IL 60601</p>
                    <p>Phone: (255)749289580</p>
                    <p>Email: bukirasophoni347@gmail.com</p>
                </div>
                <div className="socoal-media-links item-footer">
                    <h4>Social Media</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
  )
}

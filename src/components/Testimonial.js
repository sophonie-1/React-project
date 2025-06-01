import React, { useRef } from 'react';
import testimonials from './datatestimonials';
import '../styles/Testimonial.css';
import buki from './../assets/Bukira.jpg'

export default function Testimonial() {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="testimonial-container">
        <div className="testimonial-section">
            <h2>What Our Customers Say</h2>

            <div className="testimonial-carousel-wrapper">
                <button className="scroll-btn left" onClick={() => scroll('left')}>←</button>

                <div className="testimonial-carousel" ref={scrollRef}>
                {testimonials.map(({ name, id, image, rating, review }) => (
                    <div key={id} className="testimonial-card">
                        <img src={image ? image: buki} alt={name} />
                        <h3>{name}</h3>
                        <p>Rating: {rating} stars</p>
                        <p>{review}</p>
                    </div>
                ))}
                </div>

                <button className="scroll-btn right" onClick={() => scroll('right')}>→</button>
            </div>
        </div>
    </div>
  );
}

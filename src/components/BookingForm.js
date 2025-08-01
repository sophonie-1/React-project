import React, { useState, useEffect, useCallback } from "react";
import "../styles/BookingAppForm.css";
import { useNavigate } from 'react-router-dom';
import { submitAPI } from '../api';

export default function BookingForm({ AvailableTime, setAvalaibleTime, AvailableTimes, dispatch }) {
  const navigate = useNavigate();
  const [occasion, setOccasion] = useState("Birthday");
  const [date, setDate] = useState("");
  const [number, setNumber] = useState(1);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  });

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (date === "") {
      newErrors.date = "You need to select a date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      if (selectedDate < today) {
        newErrors.date = "Your date is no longer valid";
      }
    }

    if (!AvailableTime || AvailableTime === "--Select a time--") {
      newErrors.time = "You need to select a time";
    }

    if (Number(number) < 1 || Number(number) > 10) {
      newErrors.guests = "You need to request between 1 and 10 guests";
    }

    if (!occasion || occasion === "--Select an Occasion--") {
      newErrors.occasion = "You need to select an occasion";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [date, AvailableTime, number, occasion]);

  const handleDate = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setTouched((prev) => ({ ...prev, date: true }));
    dispatch({
      type: "updateTimes",
      NewDate: newDate,
    });
  };

  const clearForm = () => {
    setDate("");
    setAvalaibleTime("");
    setNumber(1);
    setTouched({
      date: false,
      time: false,
      guests: false,
      occasion: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      date: true,
      time: true,
      guests: true,
      occasion: true,
    });

    validateForm(); // Validate on submit to ensure latest state
    if (isFormValid) {
      const formData = {
        date,
        time: AvailableTime,
        number,
        occasion,
      };

      const success = submitAPI(formData);
      if (success) {
        clearForm();
        navigate('/confirmed');
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [validateForm]); // Include validateForm as a dependency

  return (
    <div className="booking-container">
      <h2>Booking a Table</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={handleDate}
          onBlur={() => setTouched((prev) => ({ ...prev, date: true }))}
          required
        />
        {touched.date && errors.date && (
          <span className="error-message">{errors.date}</span>
        )}

        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          value={AvailableTime}
          onChange={(e) => {
            setAvalaibleTime(e.target.value);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, time: true }))}
          required
        >
          <option value="">--Select a time--</option>
          {AvailableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {touched.time && errors.time && (
          <span className="error-message">{errors.time}</span>
        )}

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={number}
          onChange={(e) => {
            setNumber(Number(e.target.value));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, guests: true }))}
          required
        />
        {touched.guests && errors.guests && (
          <span className="error-message">{errors.guests}</span>
        )}

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => {
            setOccasion(e.target.value);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, occasion: true }))}
          required
        >
          <option value="">--Select an Occasion--</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        {touched.occasion && errors.occasion && (
          <span className="error-message">{errors.occasion}</span>
        )}

        <button className="Submitbutton" type="submit" disabled={!isFormValid} aria-label="Make your reservation">
          Make your reservation
        </button>
      </form>
    </div>
  );
}
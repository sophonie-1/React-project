import React from "react";
import BookingFom from "./components/BookingForm";
import { initializeTimes, updateTimes } from "./components/TimeReducer";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

global.fetchAPI = jest.fn();


describe("initializeTimes", () => {
 
  test("renvoie un tableau non vide des heures", () => {
  
    fetchAPI.mockReturnValue(["17:00", "18:00"]);

    const result = initializeTimes();
    
    expect(result).toEqual(["17:00", "18:00"]);

    expect(fetchAPI).toHaveBeenCalled(); 
  });
});


describe("updateTimes", () => {
  
  test("met à jour les heures disponibles en fonction de la nouvelle date", () => {
    
    const newDate = new Date("2025-06-15");

    
    const expectedTimes = ["18:00", "19:30"];
   
    fetchAPI.mockReturnValue(expectedTimes);

    
    const action = {
      type: "updateTimes",
      NewDate: newDate,
    };

    const result = updateTimes([], action);

  
    expect(result).toEqual(expectedTimes);
   
    expect(fetchAPI).toHaveBeenCalledWith(newDate);
  });


  test("renvoie l'état actuel si l'action n'est pas 'updateTimes'", () => {
    const currentState = ["17:00", "18:00"];
    const action = { type: "autreAction" };

    const result = updateTimes(currentState, action);
    
    expect(result).toEqual(currentState);
  });
});



describe("Validation du formulaire de réservation", () => {
  const mockProps = {
    AvailableTime: "",
 
    setAvalaibleTime: jest.fn(),
    AvailableTimes: ["17:00", "18:00"],
    
    dispatch: jest.fn(),
  
    submitForm: jest.fn(),
  };

  
  describe("Validation HTML5", () => {
 
    test("le champ date doit être requis", () => {
      render(<BookingFom {...mockProps} />);
      const dateInput = screen.getByLabelText(/choose date/i);
      
      expect(dateInput).toHaveAttribute("required");
    });

    
    test("le champ heure doit être requis", () => {
      render(<BookingFom {...mockProps} />);
      const timeSelect = screen.getByLabelText(/choose time/i);
      
      expect(timeSelect).toHaveAttribute("required");
    });

    
    test("le champ nombre de convives doit avoir min=1 et max=10", () => {
      render(<BookingFom {...mockProps} />);
      const guestsInput = screen.getByLabelText(/number of guests/i);
   
      expect(guestsInput).toHaveAttribute("min", "1");
      
      expect(guestsInput).toHaveAttribute("max", "10");
      
      expect(guestsInput).toHaveAttribute("required");
    });


    test("le champ occasion doit être requis", () => {
      render(<BookingFom {...mockProps} />);
      const occasionSelect = screen.getByLabelText(/occasion/i);
      
      expect(occasionSelect).toHaveAttribute("required");
    });
  });

  
  describe("Validation JavaScript", () => {
   
    test("affiche une erreur si la date est dans le passé", () => {
      render(<BookingFom {...mockProps} />);
      const dateInput = screen.getByLabelText(/choose date/i);

     
      fireEvent.change(dateInput, { target: { value: "2023-01-01" } });
      fireEvent.blur(dateInput);

      expect(
        screen.getByText(/la date ne peut pas être dans le passé/i)
      ).toBeInTheDocument();
    });

    
    test("affiche une erreur si le nombre de convives est hors limites", () => {
      render(<BookingFom {...mockProps} />);
      const guestsInput = screen.getByLabelText(/number of guests/i);

      fireEvent.change(guestsInput, { target: { value: "11" } });
      fireEvent.blur(guestsInput);

      expect(
        screen.getByText(/le nombre de convives doit être entre 1 et 10/i)
      ).toBeInTheDocument();
    });

    
    test("n'affiche pas d'erreur pour des entrées valides", () => {
      render(<BookingFom {...mockProps} />);
      const dateInput = screen.getByLabelText(/choose date/i);
      const guestsInput = screen.getByLabelText(/number of guests/i);

      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      fireEvent.change(dateInput, { target: { value: tomorrowStr } });
      fireEvent.change(guestsInput, { target: { value: "4" } });
      fireEvent.blur(dateInput);
      fireEvent.blur(guestsInput);

      
      expect(
        screen.queryByText(/la date ne peut pas être dans le passé/i)
      ).not.toBeInTheDocument();
      
      expect(
        screen.queryByText(/le nombre de convives doit être entre 1 et 10/i)
      ).not.toBeInTheDocument();
    });

   
    test("le bouton submit est désactivé si le formulaire est invalide", () => {
      render(<BookingFom {...mockProps} />);
      const submitButton = screen.getByText(/make your reservation/i);

      
      expect(submitButton).toBeDisabled();
    });
  });
});

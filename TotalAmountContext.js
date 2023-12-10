// TotalAmountContext.js
import React, { createContext, useState } from "react";

// Creating the context with an initial value
export const TotalAmountContext = createContext({
  dailyTotals: [],
  addAmount: () => {},
  resetTotalAmount: () => {},
});

// Provider component
export const TotalAmountProvider = ({ children }) => {
  const [dailyTotals, setDailyTotals] = useState([]);

  // Function to add an amount to a specific date
  const addAmount = (amount, date) => {
    setDailyTotals((prevTotals) => {
      const index = prevTotals.findIndex((item) => item.date === date);
      if (index !== -1) {
        // Update existing date entry
        const updatedTotals = [...prevTotals];
        updatedTotals[index].total += amount;
        return updatedTotals;
      } else {
        // Add new date entry
        return [...prevTotals, { date: date, total: amount }];
      }
    });
  };

  // Function to reset the daily totals
  const resetTotalAmount = () => {
    setDailyTotals([]); // Reset the daily totals
  };

  // Providing the context value
  return (
    <TotalAmountContext.Provider
      value={{ dailyTotals, addAmount, resetTotalAmount }}
    >
      {children}
    </TotalAmountContext.Provider>
  );
};

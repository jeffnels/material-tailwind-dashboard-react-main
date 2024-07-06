import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";

const NoTransactionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after a short delay for animation effect
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex items-center justify-center h-32 bg-white rounded-lg shadow-md border border-gray-200 ${isVisible ? 'animate-fade-in' : ''}`}
    >
      <Typography variant="body" color="blue-gray" className="text-center">
        No transactions found.
      </Typography>
    </div>
  );
};

export default NoTransactionComponent;

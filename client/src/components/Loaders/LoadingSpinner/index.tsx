import React, { useEffect, useState } from "react";
import "@/src/styles/LoadingSpinner.css";


const LoadingSpinner: React.FC = () => {
  return (
    <div data-testid="loading-spinner">
      <div className="text-center pt-64 font-medium text-xl">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
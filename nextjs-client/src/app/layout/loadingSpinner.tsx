import React from "react";
import "../styles/LoadingSpinner.css"

export default function LoadingSpinner() {
  return (
    <div data-testid="loading-spinner" className="">
      <div className="scanner">
        <span>Loading...</span>
      </div>
    </div>
  );
}
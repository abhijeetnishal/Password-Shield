import React from "react";

type Props = {
  theme: string;
};

const DisclaimerIcon = ({ theme }: Props) => {
  return (
    <svg
      className={`mx-auto mb-4 ${
        theme === "light" ? "text-gray-500" : "text-gray-200"
      } w-12 h-12`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default DisclaimerIcon;

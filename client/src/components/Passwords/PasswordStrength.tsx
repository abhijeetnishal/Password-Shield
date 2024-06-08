import React from "react";

interface PasswordStrengthBarProps {
  strength: number;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  strength,
}) => {
  let color;
  if (strength > 70) {
    color = "#73D285"; // good password (green)
  } else if (strength > 40) {
    color = "#F1C40F"; // okay password (yellow)
  } else {
    color = "#E74C3C"; // weak password (red)
  }

  return (
    <div className="w- h-1 bg-gray-200 rounded">
      <div
        className="h-1 rounded"
        style={{ width: `${strength}%`, backgroundColor: color }}
      />
    </div>
  );
};

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;

    // Length
    if (password.length >= 3) strength += 20; // Minimum length requirement
    if (password.length >= 6) strength += 10; // Extra points for longer passwords

    // Uppercase and Lowercase letters
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[a-z]/.test(password)) strength += 10;

    // Digits
    if (/[0-9]/.test(password)) strength += 20;

    // Special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    // Combinations
    if (/[A-Za-z]/.test(password) && /[0-9]/.test(password)) strength += 10; // Letters and digits
    if (/[A-Za-z]/.test(password) && /[^A-Za-z0-9]/.test(password))
      strength += 10; // Letters and special characters
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 10; // Digits and special characters

    // Variety of character classes
    const variety =
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/[a-z]/.test(password) ? 1 : 0) +
      (/[0-9]/.test(password) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
    if (variety >= 3) strength += 10; // Extra points for using at least 3 different character classes

    // Ensure strength does not exceed 100
    if (strength > 100) strength = 100;

    return strength;
  };

  const strength = calculatePasswordStrength(password);

  return (
    <div className="w-40">
      <PasswordStrengthBar strength={strength} />
    </div>
  );
};

export default PasswordStrengthIndicator;

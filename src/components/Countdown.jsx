import { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
    
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate * 1000) - new Date(); // Fix subtraction
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
    
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex rounded-xl items-center justify-center w-max  p-1 gap-1 bg-yellow-50">
      {["days", "hours"].map((unit, index) => (
        <div key={unit} className="timer flex items-center">
          <div className="rounded-xl py-0.5 flex items-center justify-center flex-col aspect-square px-1 w-15">
            <h3 className="countdown-element font-manrope font-semibold text-md text-yellow-600 text-center">
              {timeLeft[unit]}
            </h3>
            <p className="text-md font-Cormorant font-normal text-yellow-600 text-center w-full">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </p>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Countdown;

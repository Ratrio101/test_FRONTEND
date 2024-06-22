import React from "react";

const CurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="year">
      &copy; 2024 - {currentYear}. Веб-приложение "Поварешка"
    </footer>
  )
};

export default CurrentYear;
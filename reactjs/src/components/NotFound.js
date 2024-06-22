import React from 'react';
import logo from '../logo_2.jpg';
import "../App.css"

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function NotFound() {
  return (
    <div>
      <Logo />
      <div className = "not_found">
        <p>404</p>
        <p>Извините, страница не найдена.</p>
      </div>
    </div>
  );
}

export default NotFound;
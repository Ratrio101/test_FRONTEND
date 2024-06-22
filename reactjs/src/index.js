import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import About from "./about"
import Recipes from "./components/recipes"
import Feedback from "./feedback"
import Auth from "./components/Auth"
import Help from "./help"
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RecipeForm from "./components/RecipeForm";
import RecipeDetails from './components/RecipeDetails';
import NotFound from './components/NotFound'; // Компонент для страницы 404

const Main = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const userId = localStorage.getItem('userId');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // Функция для выхода из системы
  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  // Сохраняем токен в локальное хранилище при его изменении
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App token={token} Home username={username} setToken={setToken} />} />
        <Route path="/about" element={<About token={token} setToken={setToken} />} />
        <Route path="/recipes" element={<Recipes token={token} setToken={setToken} userId={userId} />} />
        <Route path="/feedback" element={<Feedback token={token} setToken={setToken} />} />
        <Route path="/Auth" element={<Auth setToken={setToken} />} />
        <Route path="/add_recipe" element={<ProtectedRoute token={token}><RecipeForm token={token} setToken={setToken} /></ProtectedRoute>} />
        <Route path="/help" element={<Help token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/:id" element={<RecipeDetails token={token} setToken={setToken} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

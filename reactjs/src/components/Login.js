import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../logo_2.jpg';
import CurrentYear from '../current_date';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1234/api/auth/login', { username, password });
      const { token, userId } = response.data;
      setToken(token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username); // Сохраняем username в локальное хранилище
      navigate('/recipes');
    } catch (error) {
      console.error('Error during login', error);
      setError('Неправильный логин или пароль');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      <div className="content">
        <div align='center' className='content-form'>
            <br></br>
            <p>Для того, чтобы создавать рецепты и оставлять комментарии, необходимо зарегистрироваться и/или войти в аккаунт :3 </p>
            <br></br>
            <form onSubmit={handleSubmit} className='forma'>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br></br>
            <input className="auth_style" type="text" required placeholder="Ник*" onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <input className="auth_style" type="password" required placeholder="Пароль*" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button type="submit">Войти</button>
          </form>
          <p>Еще не с нами? <a href="/register">Зарегистрируйтесь!</a></p>
        </div>
      </div>
      <div className='footer'>
        <CurrentYear />
      </div>
    </div>
  );
}

export default Login;

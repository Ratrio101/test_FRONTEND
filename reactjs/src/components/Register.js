import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../logo_2.jpg';
import CurrentYear from '../current_date';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация длины пароля
    if (password.length < 6) {
      setError('Пароль должен быть длиной от 6 символов и больше.');
      return;
    }

    try {
      await axios.post('http://localhost:1234/api/auth/register', { username, password });
      setError('');
      alert('Регистрация прошла успешно!');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Оплата у психолога...а, ой, то есть регистрация не прошла...');
      }
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
          <form onSubmit={handleSubmit} className='forma'>
            <h2>Регистрация</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br></br>
            <input className="auth_style" type="text" required placeholder="Ник*" onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <input className="auth_style" type="password" required placeholder="Пароль*" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button type="submit">Подтвердить</button>
          </form>
          <p>Уже есть аккаунт? <a href="/login">Смелее заходите!</a></p>
        </div>
      </div>
      <div className='footer'>
        <CurrentYear />
      </div>
    </div>
  );
}

export default Register;

import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import CurrentYear from './current_date';
import logo from './logo_2.jpg';
import vk_icon from './vk.png';
import tg_icon from './tg.jpeg';
import dzen_icon from './dzen.png';
import pin_icon from './pin.png';
import axios from 'axios';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function App({ token, setToken }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1234/api/feedback', { name, email, message });
      alert('Сообщение отправлено успешно');
    } catch (error) {
      alert('Ошибка при отправке сообщения...ПЛАКИ ПЛАКИ!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <div className="title">
          <p className="deviz" align="right"><em><b>Готовить может каждый!</b></em></p>
        </div>
      </header>
      <nav>
        <Link to="/"><b>ГЛАВНАЯ</b></Link>
        <Link to="/recipes"><b>РЕЦЕПТЫ</b></Link>
        <Link to="/about"><b>О НАС</b></Link>
        <Link to="/feedback" className="active">
          <b>ОБРАТНАЯ СВЯЗЬ</b>
        </Link>
        {token ? (
          <button className='exit_button' onClick={handleLogout}><b>ВЫЙТИ</b></button>
        ) : (
          <Link to="/login"><b>ВОЙТИ</b></Link>
        )}
      </nav>
      <div align="center" className="content">
        <h1 className="welcome" align="center">Обратная связь</h1>
        <form align="center" className="forma" onSubmit={handleSubmit}>
          <div>
            <label>Имя:*  </label>
            <input
              type="text"
              required
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label>Почта:*  </label>
            <input
              type="email"
              required
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label>Сообщение:*  </label>
            <textarea
              required
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <br></br>
          <div className="button-container">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
      <br></br>
      <br></br>
      <div className='footer'>
				<CurrentYear />
			</div>
    </div>
  )
}
export default App;
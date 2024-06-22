import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../logo_2.jpg';
import CurrentYear from '../current_date';
import vk_icon from '../vk.png';
import tg_icon from '../tg.jpeg';
import dzen_icon from '../dzen.png';
import pin_icon from '../pin.png';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}
function Auth({ setToken }) {
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
      navigate('/recipes');
    } catch (error) {
      console.error('Error during login', error);
    }
  };
  const register = async () => {
    try {
      await axios.post('http://localhost:1234/api/auth/register', { username, password });
      setError('');
      alert('Регистрация прошла успешно!');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        alert("Что-то пошло не так! Попробуйте еще разок...");
      } else {
        setError('Оплата у психолога...а, ой, то есть регистрация не прошла...');
      }
    }
  };
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:1234/api/auth/login', { username, password });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token); // Сохранение токена в localStorage
      setError('');
      navigate('/'); // Перенаправление на главную страницу
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Неправильный логин или пароль');
      }
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
      <div className="content">
        <div align='center' className='content-form'>
          <br></br>
          <h2>Для того, чтобы создавать рецепты и оставлять комментарии, необходимо зарегистрироваться и/или войти в аккаунт :3 </h2>
          <br></br>
          <form className='forma'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Регистрация</h2>
            <input className="auth_style" type="text" required placeholder="Ник" onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <input className="auth_style" type="password" required placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button type="submit" onClick={register}>ОК</button>
            <h2>Вход</h2>
            <input className="auth_style" type="text" placeholder="Ник" onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <br></br>
            <input className="auth_style" type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button type="submit" onClick={login}>ОК</button>
            <br></br>
          </form>
        </div>
      </div>
      <div className='footer'>
        <article class="gapudernaryl">
          <h3 align="center">Мы в соцсетях!</h3>
          <ul class="knopka_zornet">
            <li><a target="_blank" href="https:\\vk.com"><img class="fa fa-delicious" src={vk_icon} width="40" height="40"></img></a></li>
            <li><a target="_blank" href="https:\\dzen.ru"><img class="fa fa-facebook-official" src={dzen_icon} width="40" height="40"></img></a></li>
            <li><a target="_blank" href="https:\\telegram.org"><img class="fa fa-telegram" src={tg_icon} width="40" height="40"></img></a></li>
            <li><a target="_blank" href="https:\\pinterest.com"><img class="fa fa-internet-explorer" src={pin_icon} width="40" height="40"></img></a></li>
          </ul>
        </article>
        <CurrentYear />
      </div>
    </div>
  )
}
export default Auth;
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import CurrentYear from './current_date';
import logo from './logo_2.jpg';
import vk_icon from './vk.png';
import tg_icon from './tg.jpeg';
import dzen_icon from './dzen.png';
import pin_icon from './pin.png';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function App({ token, setToken }) {

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
        <Link to="/about" className="active">
          <b>О НАС</b>
        </Link>
        <Link to="/feedback"><b>ОБРАТНАЯ СВЯЗЬ</b></Link>
        {token ? (
          <button className='exit_button' onClick={handleLogout}><b>ВЫЙТИ</b></button>
        ) : (
          <Link to="/login"><b>ВОЙТИ</b></Link>
        )}
      </nav>
      <div className="content">
        <h1 className="welcome" align="center">О нас</h1>
        <p>
          <div className="row">
            <p> Мы рады приветствовать вас на нашем сайте, где каждый найдет для себя что-то интересное и новое.
              Здесь вы можете узнать о разнообразных рецептах приготовления блюд, открыть для себя новые культуры и традиции питания, а также научиться
              готовить вместе с нами.</p>          </div>
          <br></br>
          <div className="row">
            <p>Основная цель нашего сайта – предоставить вам доступ к широкому ассортименту рецептов, которые помогут разнообразить ваше меню,
              сделать его здоровым и вкусным. Мы стремимся к тому, чтобы каждый пользователь смог найти именно то, что ищет, будь то изысканные блюда
              для праздничного стола или простые и быстрые рецепты на каждый день.
            </p></div>
          <br></br>
          <div className="row"><p>На нашем сайте вы найдете рецепты на любой вкус: от традиционных блюд до экзотических и экспериментальных. Мы постоянно обновляем и
            дополняем нашу базу рецептов, чтобы вы всегда могли найти что-то новое и оригинальное.</p>
          </div>
          <br></br>
          <div className="row">
            <p>Присоединяйтесь к нам, участвуйте в обсуждениях и делитесь своими рецептами с другими пользователями. Мы рады каждому посетителю и всегда готовы помочь вам в приготовлении самых вкусных блюд!
            </p>
          </div>
        </p>
        <br></br>
        <div class="item" align="center">
          <img width="400" height="400" src="https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg"></img>
          <img width="400" height="400" src="https://s16.stc.all.kpcdn.net/family/wp-content/uploads/2022/03/retsepty-blyud-na-khehllouin-960x540.jpg"></img>
        </div>
      </div>
      <div className='footer'>
				<CurrentYear />
			</div>
    </div>
  )
}
export default App; 
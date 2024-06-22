import React, { Component, useState, useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import CurrentYear from './current_date';
import logo from './logo_2.jpg';
import vk_icon from './vk.png';
import tg_icon from './tg.jpeg';
import dzen_icon from './dzen.png';
import pin_icon from './pin.png';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function App({token, setToken}) {

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
				<div className = "title">
          <p className = "deviz" align = "right"><em><b>Готовить может каждый!</b></em></p>
        </div>
      </header>
        <nav>								
          <Link to="/"><b>ГЛАВНАЯ</b></Link>
          <Link to="/recipes"><b>РЕЦЕПТЫ</b></Link>
          <Link to="/about"><b>О НАС</b></Link>
          <Link to="/feedback"><b>ОБРАТНАЯ СВЯЗЬ</b></Link>
          {token ? (
          <button className = 'exit_button' onClick={handleLogout}><b>ВЫЙТИ</b></button>
        ) : (
          <Link to="/auth"><b>ВОЙТИ</b></Link>
        )}
				</nav>
        <div className="content">
			   <h1 className = "welcome" align = "center">Помощь</h1>
			   <p>

			   </p>
			   		   		   
		  </div>
      <div className= 'footer'>
      <article class="gapudernaryl">
					<h3 align = "center">Мы в соцсетях!</h3>
					  <ul class="knopka_zornet">
						  <li><a target = "_blank" href="https:\\vk.com"><img class="fa fa-delicious" src={vk_icon} width="40" height="40"></img></a></li>
						  <li><a target = "_blank" href="https:\\dzen.ru"><img class="fa fa-facebook-official" src={dzen_icon} width="40" height="40"></img></a></li>
						  <li><a target = "_blank" href="https:\\telegram.org"><img class="fa fa-telegram" src={tg_icon} width="40" height="40"></img></a></li>
						  <li><a target = "_blank" href="https:\\pinterest.com"><img class="fa fa-internet-explorer" src={pin_icon} width="40" height="40"></img></a></li>
					  </ul>  
				</article>
        <CurrentYear />      
      </div>
    </div>
  )
}
export default App; 
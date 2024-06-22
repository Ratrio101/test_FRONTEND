import React, { Component } from 'react';
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

function App() {
  return (
    <div className="App">
        <header className="App-header">
      <Logo />
				<div className = "title">
          <p className = "deviz" align = "right"><em><b>Готовить может каждый!</b></em></p>
        </div>
      </header>
        <div align = "center" className="content-form">
            <h1 className = "welcome" align = "center">Регистрация</h1>
            <br></br>
            <form align = "center" className = "forma">
                    <div>
                        <label>Никнейм:  </label>
                        <input
                            type="text"
                            required
                        />
                    </div>
                    <br></br>
                    <div>
                        <label>Почта:  </label>
                        <input
                            type="email"
                            required
                        />
                    </div>
                    <br></br>
                    <div>
                        <label>Пароль:  </label>
                        <input
                            type="password"
                            required
                        />
                    </div>
                    <br></br>
                    
                    <div className = "button-container">
                        <button type="submit">ОК</button>
                    </div>
                    <br></br>
            </form>
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
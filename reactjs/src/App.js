import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import CurrentYear from './current_date';
import logo from './logo_2.jpg';
import vk_icon from './vk.png';
import tg_icon from './tg.jpeg';
import dzen_icon from './dzen.png';
import pin_icon from './pin.png';
import Auth from './components/Auth';

function Logo() {
	return <img src={logo} alt="Логотип" />;
}
function App({ token, setToken }) {

	const [username, setUsername] = useState('');

	const handleLogout = () => {
		setToken('');
		localStorage.removeItem('token');
		localStorage.removeItem('username');
    	setUsername('');
	};
	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
			const storedUsername = localStorage.getItem('username');
			if (storedUsername) {
			  setUsername(storedUsername);
			}
		  } else {
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			setUsername('');
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
				<Link to="/" className="active">
					<b>ГЛАВНАЯ</b>
				</Link>
				<Link to="/recipes"><b>РЕЦЕПТЫ</b></Link>
				<Link to="/about"><b>О НАС</b></Link>
				<Link to="/feedback"><b>ОБРАТНАЯ СВЯЗЬ</b></Link>
				{token ? (
					<><span className = "username">Привет, {username}!</span>
					<button className='exit_button' onClick={handleLogout}><b>ВЫЙТИ</b></button></>
				) : (
					<Link to="/login"><b>ВОЙТИ</b></Link>
				)}
			</nav>
			<div className="content">
				<h1 className="welcome" align="center">Добро пожаловать в веб-приложение "Поварёшка"!</h1>
				<p>
					<div className="row">
						<p>Здесь вы сможете найти кулинарные рецепты, которые очень просты в приготовлении. Почерпните новые знания в сфере кулинарии;
							узнайте простые способы приготовления блюд, которые кажутся сложными; соберите все любимые лакомства в одном месте, создав собственную кулинарную книгу;
							найдите ответы на все интересующие вас вопросы всего за несколько кликов!</p>
						<br></br>
						<p>В нашем банке вкусной еды находятся популярные пошаговые фоторецепты, помогающие точно
							следовать специфике приготовления. Система поиска позволяет быстро, в любое удобное для вас время найти рецепт, который необходим именно вам.</p>
						<br></br>
						<p>Готовка может быть простой и незатратной, праздничной, на скорую руку, с вашим непосредственным участием и без него. Однако одно остаётся неизменным — отменный вкус готового блюда. </p>
					</div>
				</p>
				<br></br>
				<div className="item" align="center">
					<img width='400' height='400' src="https://kartinki.pics/uploads/posts/2021-08/1629589591_12-kartinkin-com-p-samie-krasivie-blyuda-yeda-krasivo-foto-13.jpg"></img>
					<img width='400' height='400' src="https://media.istockphoto.com/id/545286388/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%B8%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F-%D0%B5%D0%B4%D0%B0-%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D1%84%D0%BE%D0%BD.jpg?s=612x612&w=0&k=20&c=_u6fQieM0uXk6Vfc6-B12U1WoJJJewSfE0COXqz_KFg="></img>
				</div>
				<br></br>
				<p align="center" id="ratatui">
					<em><b>Наберитесь отваги, пробуйте, экспериментируйте. Не позволяйте никому загонять вас в рамки. Единственные ваши рамки — ваша душа. Это правда: готовить может каждый, но лишь бесстрашные достигают величия!</b></em>
				</p>
			</div>
			<div className='footer'>
				<CurrentYear />
			</div>
		</div>
	)
}
export default App; 
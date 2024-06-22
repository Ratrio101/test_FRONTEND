import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import CurrentYear from '../current_date';
import logo from '../logo_2.jpg';
import vk_icon from '../vk.png';
import tg_icon from '../tg.jpeg';
import dzen_icon from '../dzen.png';
import pin_icon from '../pin.png';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}



function Recipes({ token, setToken }) {

  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Получаем userId из локального хранилища

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get('http://localhost:1234/api/recipes');
      setRecipes(response.data);
    };

    fetchRecipes();
  }, []);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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
        <Link to="/recipes" className="active">
          <b>РЕЦЕПТЫ</b>
        </Link>
        <Link to="/about"><b>О НАС</b></Link>
        <Link to="/feedback"><b>ОБРАТНАЯ СВЯЗЬ</b></Link>
        {token ? (
          
          <button className='exit_button' onClick={handleLogout}><b>ВЫЙТИ</b></button>
        ) : (
          <Link to="/login"><b>ВОЙТИ</b></Link>
        )}
      </nav>
      <div className="content">
        <h1 className="welcome" align="center">Рецепты</h1>
        <div align="center">
          <p>Хотите добавить свой рецепт? Смелее добавляйте!</p>
          <br></br>
          <button className="button-recipe"><Link to="/add_recipe">Добавить рецепт</Link></button>
          <br></br>
        </div>
        <p align="center">Также можно ознакомиться с теми, которые мы собрали для Вас!</p>
        <br></br>
        <div className="recipe-list">
          {recipes.map(recipe => (
            <div key={recipe._id} className="recipe">
              <Link to={`/recipes/${recipe._id}`} className="recipe-title-link">
                <h1 align="center" className="recipe-title-card">{recipe.title}</h1>
              </Link>
              {recipe.imageUrl && <img src={`http://localhost:1234${recipe.imageUrl}`} className="recipe-detail-image-card" alt={recipe.title} />}
              <p align="left"><strong>Автор:</strong> {recipe.username}</p>
              <p align="left"><strong>Дата добавления:</strong> {new Date(recipe.dateAdded).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='footer'>
				<CurrentYear />
			</div>
    </div>
  )
}
export default Recipes;
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './RecipeDetails.css'
import CurrentYear from '../current_date';
import logo from '../logo_2.jpg';
import vk_icon from '../vk.png';
import tg_icon from '../tg.jpeg';
import dzen_icon from '../dzen.png';
import pin_icon from '../pin.png';
import Comments from './Comments';

function Logo() {
  return <img src={logo} alt="Логотип" />;
}

function RecipeDetails({ token, setToken }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:1234/api/recipes/${id}`);
      setRecipe(response.data);
    };

    fetchRecipe();
  }, [id]);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };
  if (!recipe) return <div>Загрузка...</div>;

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
      <div className="recipe-details-container">
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <div>Автор: {recipe.username}</div>
          <div>Дата добавления: {new Date(recipe.dateAdded).toLocaleDateString()}</div>
          <div>Сложность: {recipe.difficulty}</div>
          <div>Время приготовления: {recipe.cookingTime}</div>
        </div>
        {recipe.imageUrl && <img src={`http://localhost:1234${recipe.imageUrl}`} className="recipe-detail-image" />}
        <br></br>
        <div className="menu2">
          <p>Содержание</p>
          <ol>
            <li><a href="#description">Описание</a></li>
            <li><a href="#ingredients">Ингредиенты</a></li>
            <li><a href="#instructions">Инструкции</a></li>
            <li><a href="#comments">Комментарии к рецепту</a></li>
            <br></br>
          </ol>
        </div>
        <h2 id="description">Описание</h2>
        <div className="recipe-description">
          <p align="left">{recipe.description}</p>
        </div>
        <div className="recipe-ingredients">
          <h2 id="ingredients">Ингредиенты</h2>
          <ul>
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <h2 id="instructions">Инструкции</h2>
          <ol>
            {recipe.instructions.split('\n').map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <div className="recipe-comments">
          <h2 id="comments">Комментарии к рецепту</h2>
          <Comments recipeId={id} token={token} />
        </div>
      </div>

      <div className='footer'>
				<CurrentYear />
			</div>
    </div>
  );
}

export default RecipeDetails;

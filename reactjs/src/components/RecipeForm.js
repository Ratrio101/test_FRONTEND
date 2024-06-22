import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'
import CurrentYear from '../current_date';
import logo from '../logo_2.jpg';

function RecipeForm({ token, setToken }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [cookingTime, setCookingTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  function Logo() {
    return <img src={logo} alt="Логотип" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
      setError('Сложность должна быть числом от 1 до 5.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('difficulty', difficulty);
    formData.append('cookingTime', cookingTime);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:1234/api/recipes',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Ура! Рецепт добавлен!');
      setTitle('');
      setIngredients('');
      setInstructions('');
      setDifficulty('');
      setCookingTime('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Плаки-плаки! Ошибка сервера!');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
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
      <div className="content" align="center">
        <h2>Добавление рецепта</h2>
        <form className="forma" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <br></br>
          <div>
            <label>Название блюда*:  </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Ингредиенты*:  </label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Шаги*:  </label>
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Сложность по шкале от 1 до 5*:  </label>
            <input type="number" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} min = "1" max = "5" required />
          </div>
          <br></br>
          <div>
            <label>Время приготовления*:  </label>
            <textarea value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Описание*:  </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Изображение*:  </label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
          </div>
          <br></br>
          <button type="submit">Добавить!</button>
        </form>
      </div>
      <div className='footer'>
				<CurrentYear />
			</div>
      <br></br>

    </div>
  );
}

export default RecipeForm;
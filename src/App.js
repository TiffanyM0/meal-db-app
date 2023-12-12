
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [meals, setMeals] = useState([]);
  const [searchedMeal, setSearchedMeal] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    // Fetch meal categories
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch meals based on the selected category
    if (selectedCategory) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then(response => {
          setMeals(response.data.meals);
        })
        .catch(error => {
          console.error('Error fetching meals:', error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Search meals by name
    if (searchedMeal) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
        .then(response => {
          setMeals(response.data.meals);
        })
        .catch(error => {
          console.error('Error searching meals:', error);
        });
    }
  }, [searchedMeal]);

  const handleMealClick = (meal) => {
    // Fetch full details for the selected meal by id
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
      .then(response => {
        const fullMealDetails = response.data.meals[0];
        setSelectedMeal(fullMealDetails);
      })
      .catch(error => {
        console.error('Error fetching full meal details:', error);
      });
  };


  const handleCloseDetails = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="App">
      <h1>MealDB App</h1>

      {/* List all meal categories */}
      <div>
        <h2>Meal Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.strCategory}>
              <button onClick={() => setSelectedCategory(category.strCategory)}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
                {category.strCategory}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search by meal name */}
      <div>
        <h2>Search by Meal Name</h2>
        <input
          type="text"
          value={searchedMeal}
          onChange={(e) => setSearchedMeal(e.target.value)}
          placeholder="Enter meal name"
        />
        <button onClick={() => setSearchedMeal('')}>Search</button>
      </div>

      {/* Display filtered meals */}
      <div>
        <h2>Filtered Meals</h2>
        <div className="meals-container">
          {meals.map(meal => (
            <div key={meal.idMeal} className="meal-item" onClick={() => handleMealClick(meal)}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Display selected meal details */}
      {selectedMeal && (
        <div className="meal-details">
          <h2>{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
          <p>Category: {selectedMeal.strCategory}</p>
          <h3>Ingredients</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
              const ingredient = selectedMeal[`strIngredient${i}`];
              const measure = selectedMeal[`strMeasure${i}`];

              return ingredient && measure ? (
                <li key={i}>{`${measure} ${ingredient}`}</li>
              ) : null;
            })}
          </ul>
          <h3>Instructions</h3>
          <p>{selectedMeal.strInstructions}</p>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
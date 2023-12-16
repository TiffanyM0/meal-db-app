import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Category from './components/Category';
import FilterMeal from './components/FilterMeal';
import SelectMeal from './components/SelectMeal';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

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

  const instructionsRef = useRef(null);

  const handleMealClick = (meal) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
      .then(response => {
        const fullMealDetails = response.data.meals[0];
        setSelectedMeal(fullMealDetails);
        if (instructionsRef.current) {
          instructionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
      <h1>E-RECIPE</h1>
      <NavBar/>
      <SearchBar searchedMeal={searchedMeal} setSearchedMeal={setSearchedMeal}  />
      <Category setSelectedCategory={setSelectedCategory} categories={categories} />
      <FilterMeal meals={meals} handleMealClick={handleMealClick} setMeal={setMeals} />
      <div ref={instructionsRef}>
        <SelectMeal handleCloseDetails={handleCloseDetails} selectedMeal={selectedMeal} />
      </div>
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default App;

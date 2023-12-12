// // src/App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     // Fetch meal categories
//     axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
//       .then(response => {
//         setCategories(response.data.categories);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch meals based on the selected category
//     if (selectedCategory) {
//       axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
//         .then(response => {
//           setMeals(response.data.meals);
//           console.log(response.data.meals);
//         })
//         .catch(error => {
//           console.error('Error fetching meals:', error);
//         });
//     }
//   }, [selectedCategory]);

//   return (
//     <div className="App">
//       <h1>MealDB App</h1>
//       <div>
//         <h2>Meal Categories</h2>
//         <ul>
//           {categories.map(category => (
//             <li key={category.strCategory}>
//               <button onClick={() => setSelectedCategory(category.strCategory)}>
//                 {category.strCategory}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Meals</h2>
//         <ul>
//           {meals.map(meal => (
//             <li key={meal.idMeal}>{meal.strMeal}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;


// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch meal categories
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => {
        setCategories(response.data.categories);
        console.log(response.data);
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

  return (
    <div className="App">
      <h1>MealDB App</h1>
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
      <div>
        <h2>Meals</h2>
        <div className="meals-container">
          {meals.map(meal => (
            <div key={meal.idMeal} className="meal-item">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

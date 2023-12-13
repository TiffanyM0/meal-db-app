// export default function Category ({setSelectedCategory, categories, categoryRef }){
//   function handleClick(category) {
//     setSelectedCategory(category);
//     categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }
//   return (
//         <div>
//         <h2>Meal Categories</h2>
//         <div className="category">
//           {categories.map(category => (
//             <div key={category.strCategory}>
//               <button onClick={()=>  handleClick(category.strCategory)}>
//               <img src={category.strCategoryThumb} alt={category.strCategory}  />
//                 {category.strCategory}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
// }

// Category.js
import React from 'react';

export default function Category({ setSelectedCategory, categories }) {
  function handleClick(category) {
    setSelectedCategory(category);
    // No need for categoryRef here
  }

  return (
    <div>
      <h2>Meal Categories</h2>
      <div className="category">
        {categories.map(category => (
          <div key={category.strCategory}>
            <button onClick={() => handleClick(category.strCategory)}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              {category.strCategory}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

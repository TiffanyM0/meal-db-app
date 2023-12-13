export default function SearchBar ({setSearchedMeal, searchedMeal}) {
    
    return (
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
    )
}
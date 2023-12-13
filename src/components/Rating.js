function Rating({ rating, handleRatingChange }) {
    return (
      <div>
        <label htmlFor="rating">Rating:</label>
        <select id="rating" value={rating} onChange={handleRatingChange}>
          <option value={0}>Select Rating</option>
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Average</option>
          <option value={4}>4 - Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
      </div>
    );
  }
  
  export default Rating;
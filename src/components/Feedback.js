import React, { useState } from 'react';
import Rating from './Rating';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Rating:', rating);
    console.log('Feedback:', feedbackText);
    setRating(0);
    setFeedbackText('');
  };

  return (
    <div className="feedback-form">
      <h2>Feedback and Rating</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedbackText}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback"
            rows={4}
          />
        <Rating rating={rating} handleRatingChange={handleRatingChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;

//Reviews.js
import React, { useState } from "react";
import axios from "axios";

function Feedback({ onSubmitFeedback }) {
  const [feedbackText, setFeedbackText] = useState();

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the server to save the feedback
    axios
      .post("http://localhost:3000/feedbacks", { text: feedbackText })
      .then((response) => {
        console.log("Feedback successfully posted:", response.data);
        setFeedbackText("");
        // Call the parent component's function to handle the feedback submission
        onSubmitFeedback(response.data);
        // Display thank-you message as an alert
        alert("Thank you for submitting your feedback!");
      })
      .catch((error) => {
        console.error("Error posting feedback:", error);
      });
  };

  return (
    <div className="feedback-form">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedbackText}
            onChange={handleFeedbackChange}
            placeholder="How was your experience using the E-Recipe site..."
            rows={4}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;

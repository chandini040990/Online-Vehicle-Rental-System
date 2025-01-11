// ReviewForm.js

import React, { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState('');
  const [ratings, setRatings] = useState(0);
  const [hover, setHover] = useState(0);

  // state
  const [feedback, setFeedback] = useState({});

  //hooks
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newReview = {
        name,
        reviews,
        ratings
      };
      console.log(newReview);
      updateFeedback()

    } catch (err) {
      console.log(err);
    }
  };


  const updateFeedback = async (newReview) => {
    try {
      const { data } = await axios.post(`/feedback/update`, { name, reviews, ratings });
      setFeedback(data);
      // console.log(data);
      setName('');
      setReviews('');
      setRatings(0);
      navigate("/");
      toast.success("Submitted Feedback");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="container-feedback">
      <h1 className="text-center">Feedback Form</h1>
      <form onSubmit={handleSubmit}>

        <label>Name:   </label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />

        <label>Review:   </label>
        <textarea
          placeholder="Write your review..."
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}
        /><br />

        <label>Rating:   </label>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || ratings) ? "on" : "off"}
                value={ratings}
                onClick={() => setRatings(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(ratings)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>

        <button className="btn btn-outline-primary mt-4 col card-button"
          type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
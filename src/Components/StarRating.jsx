import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1;
        return (
          <label key={starValue}>
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => setRating(starValue)}
              style={{ display: 'none' }}
            />
            <FaStar
              size={30}
              color={starValue <= rating ? "#ffc107" : "#e4e5e9"}
              style={{ cursor: 'pointer' }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;

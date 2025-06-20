import React, { useState } from 'react';

function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {Array.from({ length: totalStars }).map((_, i) => {
        const star = i + 1;
        return (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              fontSize: '2rem',
              color: star <= (hover || rating) ? 'gold' : 'lightgray',
              cursor: 'pointer',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;

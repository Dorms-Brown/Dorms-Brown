import { useState } from "react";

/**
 * Stars component that is in charge of the stars when adding a review to a particular dorm 
 */
export default function Stars({setState} : any) {

    // initiate state variables 
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div aria-label="star rating" className="inline-flex items-center">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`bg-transparent border-none outline-none ${index <= (hover || rating) ? "text-yellow-400" : "text-gray-400"}`}
              onClick={() => {setRating(index); setState(index)}}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
        <span className="ml-2 text-sm text-gray-400">{rating}</span>
      </div>
    );
  };

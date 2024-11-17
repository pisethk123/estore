import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";

const Rating = ({value, text, color = 'yellow-500'}) => {
    const fullStar = Math.floor(value)
    const halftStar = value - fullStar > 0.5 ? 1 : 0
    const emptyStar = 5 - fullStar - halftStar

  return <div className="flex items-center">
    {[...Array(fullStar)].map((_, index) => <FaStar key={index} className={`text-${color} ml-1`}/>)}

    {halftStar === 1 && <FaStarHalfAlt className={`text-${color} ml-1`}/>}

    {[...Array(emptyStar)].map((_, index) => <FaStar key={index} className={`text-${color} ml-1`}/>)}

    <span className={`rating-text ml-[2rem] text-${color}`}>{text && text}</span>
  </div>;
};

export default Rating;

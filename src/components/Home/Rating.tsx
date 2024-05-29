
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const roundedRating = Math.round(rating * 10) / 10; // Round the rating to one decimal point
  const stars: JSX.Element[] = [];
  const filledStars: number = Math.floor(roundedRating);
  const hasHalfStar: boolean = roundedRating - filledStars >= 0.5;

  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} style={{ color: "a17f1a" }} />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalfIcon key={filledStars} style={{ color: "a17f1a" }} />);
  }

  const emptyStars: number = 5 - stars.length;

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarBorderIcon key={filledStars + i} style={{ color: "a17f1a" }} />);
  }

  return <div>{stars}</div>;
};

export default Rating;

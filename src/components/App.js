import ReviewList from "./ReviewList";
import mockItems from "../mock.json";
import { useState } from "react";

function App() {
  const [reviews, setReviews] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = reviews.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleRatingClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const newReviews = reviews.filter((review) => review.id !== id);
    setReviews(newReviews);
  };

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleRatingClick}>별점순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;

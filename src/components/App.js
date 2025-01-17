import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleRatingClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const newItems = items.filter((review) => review.id !== id);
    setItems(newItems);
  };

  const handleLoad = async (options) => {
    let results;

    try {
      setIsLoading(true);
      results = await getReviews(options);
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = results;

    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleRatingClick}>별점순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button onClick={handleLoadMore} disabled={isLoading}>
          더보기
        </button>
      )}
    </div>
  );
}

export default App;

import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleRatingClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = async (options) => {
    let results;

    try {
      setIsLoading(true);
      setError(null);
      results = await getReviews(options);
    } catch (e) {
      setError(e);
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

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [...prevItems.slice(0, splitIdx), review, ...prevItems.slice(splitIdx + 1)];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleRatingClick}>별점순</button>
      <ReviewForm onSubmitSuccess={handleCreateSuccess} onSubmit={createReview} />
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onSubmitSuccess={handleUpdateSuccess}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button onClick={handleLoadMore} disabled={isLoading}>
          더보기
        </button>
      )}
      {error?.message && <p>{error.message}</p>}
    </div>
  );
}

export default App;

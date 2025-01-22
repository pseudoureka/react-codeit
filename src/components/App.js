import { createFood, deleteFood, getFoods, updateFood } from "../api";
import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import FoodForm from "./FoodForm";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = async (id) => {
    await deleteFood(id);
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleLoad = async (options) => {
    let results;
    try {
      setIsLoading(true);
      setLoadingError(null);
      results = await getFoods(options);
    } catch (e) {
      setLoadingError(e);
    } finally {
      setIsLoading(false);
    }
    const { foods, paging } = results;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(paging.nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({ order, cursor, search, limit: LIMIT });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  useEffect(() => {
    handleLoad({ order, cursor: "", search, limit: LIMIT });
  }, [order, search]);

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === food.id);
      return [...prevItems.slice(0, splitIdx), food, ...prevItems.slice(splitIdx + 1)];
    });
  };

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <form style={{ margin: "10px 0" }} onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodForm onSubmitSuccess={handleCreateSuccess} onSubmit={createFood} />
      <FoodList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateFood}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <p>{loadingError.message}</p>}
    </div>
  );
}

export default App;

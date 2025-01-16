import "./FoodList.css";
import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

function FoodListItem({ item, onDelete }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleDelete = () => onDelete(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;

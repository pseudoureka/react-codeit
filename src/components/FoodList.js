import "./FoodList.css";
import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li>
            <FoodListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;

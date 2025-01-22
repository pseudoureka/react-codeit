import { useState } from "react";
import "./FoodList.css";
import { format } from "date-fns";
import FoodForm from "./FoodForm";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleDelete = () => onDelete(item.id);

  const handleUpdate = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (editingId === item.id) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValues = { title, calorie, content };

          return (
            <li key={item.id}>
              <FoodForm onCancel={handleCancel} initialValues={initialValues} />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;

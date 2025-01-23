import { useState } from "react";
import "./FoodList.css";
import { format } from "date-fns";
import FoodForm from "./FoodForm";
import { useLocale } from "../context/LocaleContext";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt } = item;
  const locale = useLocale();

  const handleDelete = () => onDelete(item.id);

  const handleUpdate = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <p>현재 언어: {locale}</p>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (editingId === item.id) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValues = { title, calorie, content };
          const initialPreview = imgUrl;

          const handleUpdate = (formData) => onUpdate(id, formData);

          const handleUpdateSuccess = (food) => {
            onUpdateSuccess(food);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                onCancel={handleCancel}
                initialValues={initialValues}
                initialPreview={initialPreview}
                onSubmit={handleUpdate}
                onSubmitSuccess={handleUpdateSuccess}
              />
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

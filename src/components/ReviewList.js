import { format } from "date-fns";
import "./ReviewList.css";
import { Rating } from "./Rating";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import useTranslate from "./hooks/useTranslate";

function formatDate(value) {
  return format(value, "yyyy-MM-dd");
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const { title, imgUrl, rating, content, createdAt, id } = item;
  const t = useTranslate();

  const handleDelete = () => onDelete(id);

  const handleEditClick = () => onEdit(id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
        <button onClick={handleDelete}>{t("delete button")}</button>
        <button onClick={handleEditClick}>{t("edit button")}</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, imgUrl, rating, content, id } = item;

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          const initialValues = { title, rating, content };
          const initialPreview = imgUrl;
          const handleCancel = () => setEditingId(null);
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={initialPreview}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;

import { format } from "date-fns";
import "./ReviewList.css";
import { Rating } from "./Rating";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

function formatDate(value) {
  return format(value, "yyyy-MM-dd");
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const { title, imgUrl, rating, content, createdAt, id } = item;

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
        <button onClick={handleDelete}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
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

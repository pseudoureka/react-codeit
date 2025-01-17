import { format } from "date-fns";
import "./ReviewList.css";

function formatDate(value) {
  return format(value, "yyyy-MM-dd");
}

function ReviewListItem({ item, onDelete }) {
  const { title, imgUrl, rating, content, createdAt, id } = item;

  const handleDelete = () => onDelete(id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;

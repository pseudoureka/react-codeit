import { format } from "date-fns";
import "./ReviewList.css";

function formatDate(value) {
  return format(value, "yyyy-MM-dd");
}

function ReviewListItem({ item }) {
  const { title, imgUrl, rating, content, createdAt, updatedAt, id } = item;

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}

function ReviewList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;

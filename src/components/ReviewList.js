function ReviewList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
}

export default ReviewList;

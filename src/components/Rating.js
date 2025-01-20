import "./Rating.css";
const RATING = [1, 2, 3, 4, 5];

export function Star({ selected = false, onHover, onSelect, rating }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleSelect = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span className={className} onClick={handleSelect} onMouseOver={handleMouseOver}>
      ★
    </span>
  );
}

export function Rating({ value = 0, onSelect, onHover, onMouseOut, className }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATING.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          onHover={onHover}
          onSelect={onSelect}
          rating={rating}
        />
      ))}
    </div>
  );
}

import HandIcon from "./HandIcon";
import "./HandButton.css";

function HandButton({ value, onClick }) {
  const handleClick = () => {
    onClick(value);
  };

  const buttonClassNames = `HandButton`;
  const buttonIconClassNames = `HandButton-icon`;

  return (
    <button className={buttonClassNames} onClick={handleClick}>
      <HandIcon className={buttonIconClassNames} value={value} />
    </button>
  );
}

export default HandButton;

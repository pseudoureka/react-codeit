import HandIcon from "./HandIcon";
import buttonImg from "./assets/purple.svg";

const style = {
  width: "166px",
  height: "166px",
  border: "none",
  outline: "none",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "transparent",
  backgroundImage: `url(${buttonImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
};

function HandButton({ value, onClick }) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button style={style} onClick={handleClick}>
      <HandIcon value={value} />
    </button>
  );
}

export default HandButton;

import { useState } from "react";
import "./FoodForm.css";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
};
function FoodForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const { title, calorie, content } = values;

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <input name="title" type="text" value={title} onChange={handleInputChange} />
      <input name="calorie" type="number" value={calorie} onChange={handleInputChange} />
      <input name="content" type="text" value={content} onChange={handleInputChange} />
      <button type="submit">저장</button>
    </form>
  );
}

export default FoodForm;

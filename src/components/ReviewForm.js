import { useState } from "react";
import "./ReviewForm.css";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
};

function ReviewForm() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const { title, rating, content } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, rating, content });
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} type="text" value={values.title} />
      <input
        name="rating"
        onChange={handleChange}
        type="number"
        value={values.rating}
        min={0}
        max={5}
      />
      <textarea name="content" onChange={handleChange} value={values.content}></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;

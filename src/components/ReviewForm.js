import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const { title, rating, content, imgFile } = values;

  const handleChange = (name, value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, rating, content });
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={imgFile} onChange={handleChange} />
      <input name="title" onChange={handleInputChange} type="text" value={values.title} />
      <RatingInput
        name="rating"
        onChange={handleChange}
        type="number"
        value={values.rating}
        min={0}
        max={5}
      />
      <textarea name="content" onChange={handleInputChange} value={values.content}></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;

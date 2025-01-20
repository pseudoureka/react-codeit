import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({ initialValues = INITIAL_VALUES, onSubmitSuccess, onCancel, initialPreview }) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rating", rating);
    formData.append("content", content);
    formData.append("imgFile", imgFile);

    let result;
    try {
      setIsSubmitting(true);
      setError(null);
      result = await createReview(formData);
    } catch (e) {
      setError(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    onSubmitSuccess(review);
    setValues(initialValues);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
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
      {onCancel && <button onCancel={onCancel}>취소</button>}
      <button disabled={isSubmitting} type="submit">
        확인
      </button>
      {error?.message && <p>{error.message}</p>}
    </form>
  );
}

export default ReviewForm;

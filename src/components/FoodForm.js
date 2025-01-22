import { useState } from "react";
import "./FoodForm.css";
import FileInput from "./FileInput";
import { createFood } from "../api";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};
function FoodForm({ onCancel, initialValues = INITIAL_VALUES, onSubmitSuccess, initialPreview }) {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const { title, calorie, content, imgFile } = values;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("calorie", calorie);
    formData.append("content", content);
    formData.append("imgFile", imgFile);

    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await createFood(formData);
    } catch (e) {
      setLoadingError(e);
      return;
    } finally {
      setIsLoading(false);
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(initialValues);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input name="title" type="text" value={title} onChange={handleInputChange} />
      <input name="calorie" type="number" value={calorie} onChange={handleInputChange} />
      <input name="content" type="text" value={content} onChange={handleInputChange} />
      <button type="submit" disabled={isLoading}>
        저장
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {loadingError?.message && <p>{loadingError.message}</p>}
    </form>
  );
}

export default FoodForm;

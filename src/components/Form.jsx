import { useState } from "react";
import Model from "../services/chatgpttype";

export default function Form({ onSubmit, formData, setFormData, error }) {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <Model model={formData.model} />
      <div className="choices">
        <input
          className="box-border hover:box-content"
          type="radio"
          id="french"
          name="language"
          value="French"
          defaultChecked={formData.language}
          onChange={handleInputChange}
        />
        <label htmlFor="french">French</label>

        <input
          type="radio"
          id="spanish"
          name="language"
          value="Spanish"
          onChange={handleInputChange}
        />
        <label htmlFor="spanish">Spanish</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="portuguese"
          name="language"
          value="Portuguese"
          onChange={handleInputChange}
        />
        <label htmlFor="portuguese">Portuguese</label>

        <input
          type="radio"
          id="italian"
          name="language"
          value="Italian"
          onChange={handleInputChange}
        />
        <label htmlFor="italian">Italian</label>

        <input
          type="radio"
          id="japanese"
          name="language"
          value="Japanese"
          onChange={handleInputChange}
        />
        <label htmlFor="japanese">Japanese</label>
      </div>

      <textarea
        name="message"
        placeholder="Type your message here.."
        value={formData.message}
        onChange={handleInputChange}
      ></textarea>

      {error && <div className="error">{error}</div>}

      <button type="submit" className="dark:md:hover:bg-fuchsia-600">
        Translate
      </button>
    </form>
  );
}

export default function Form({ onSubmit, formData, setFormData, error }) {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="choices">
        <input
          className="box-border hover:box-content"
          type="radio"
          id="chagpt-3"
          name="model"
          value="gpt-3.5-turbo"
          defaultChecked={formData.model}
          onChange={handleInputChange}
        />
        <label htmlFor="chagpt-3">chagpt-3.5</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="chagpt-4"
          name="model"
          value="gpt-4"
          onChange={handleInputChange}
        />
        <label htmlFor="chagpt-4">chagpt-4</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="chagpt-4o"
          name="model"
          value="chagpt-4o"
          onChange={handleInputChange}
        />
        <label htmlFor="chagpt-4o">chagpt-4o</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="cl-3-op"
          name="model"
          value="cl-3-op"
          onChange={handleInputChange}
        />
        <label htmlFor="cl-3-op">cl-3-op</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="cl-3-hai"
          name="model"
          value="cl-3-hai"
          onChange={handleInputChange}
        />
        <label htmlFor="cl-3-hai">cl-3-hai</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="cl-3.5-s"
          name="model"
          value="cl-3.5-s"
          onChange={handleInputChange}
        />
        <label htmlFor="cl-3.5-s">cl-3.5-s</label>

        <input
          className="box-border hover:box-content"
          type="radio"
          id="deepl"
          name="model"
          value="deepl"
          onChange={handleInputChange}
        />
        <label htmlFor="deepl">deepl</label>
      </div>
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

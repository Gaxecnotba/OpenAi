export default function Form({ onSubmit, formData, setFormData, error }) {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleModelChange = (e) => {
    const models = {
      gpt: "gpt-3.5-turbo-0125",
      geminiAi: "gemini-1.5-pro",
      deepl: "Default",
    };
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.name === "model1" ? "version1" : "version2"]:
        models[e.target.value],
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="choices">
        <div className="select">
          <select
            name="model1"
            id="model1"
            value={formData.model1}
            onChange={handleModelChange}
          >
            <option value="gpt">GPT</option>
            <option value="geminiAi">GeminiAi</option>
            <option value="deepl">Deepl</option>
          </select>
        </div>
        {formData.model1 === "gpt" && (
          <select
            name="version1"
            id="version1"
            value={formData.version1}
            onChange={handleInputChange}
          >
            <option value="gpt-3.5-turbo-0125">gpt-3.5</option>
            <option value="gpt-4">gpt-4</option>
            <option value="gpt-4o">gpt-4o</option>
          </select>
        )}
        {formData.model1 === "geminiAi" && (
          <select
            name="version1"
            id="version1"
            value={formData.version1}
            onChange={handleInputChange}
          >
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
          </select>
        )}
        {formData.model1 === "deepl" && (
          <select
            name="version1"
            id="version1"
            value={formData.version1}
            onChange={handleInputChange}
          >
            <option value="Default">Default</option>
          </select>
        )}
      </div>

      {/* Second Model and Version */}
      <div className="choices">
        <div className="select">
          <select
            name="model2"
            id="model2"
            value={formData.model2}
            onChange={handleModelChange}
          >
            <option value="gpt">GPT</option>
            <option value="geminiAi">GeminiAi</option>
            <option value="deepl">Deepl</option>
          </select>
        </div>
        {formData.model2 === "gpt" && (
          <select
            name="version2"
            id="version2"
            value={formData.version2}
            onChange={handleInputChange}
          >
            <option value="gpt-3.5-turbo-0125">gpt-3.5</option>
            <option value="gpt-4">gpt-4</option>
            <option value="gpt-4o">gpt-4o</option>
          </select>
        )}
        {formData.model2 === "geminiAi" && (
          <select
            name="version2"
            id="version2"
            value={formData.version2}
            onChange={handleInputChange}
          >
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
          </select>
        )}
        {formData.model2 === "deepl" && (
          <select
            name="version2"
            id="version2"
            value={formData.version2}
            onChange={handleInputChange}
          >
            <option value="Default">Default</option>
          </select>
        )}
      </div>
      <div className="choices">
        <label htmlFor="languageselected">Select a language:</label>
        <select
          name="languageselected"
          id="languageselected"
          value={formData.languageselected}
          onChange={handleInputChange}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="Portuguese_PT">Portuguese Portugal</option>
          <option value="Portuguese_BR">Portuguese Brazil</option>
          <option value="Italian">Italian</option>
        </select>
      </div>
      <div className="choices">
        <label htmlFor="language">Translate to:</label>
        <select
          name="language"
          id="language"
          value={formData.language}
          onChange={handleInputChange}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="Portuguese_PT">Portuguese Portugal</option>
          <option value="Portuguese_BR">Portuguese Brazil</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
        </select>
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

{
  /* <div className="choices">
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
      </div> */
}

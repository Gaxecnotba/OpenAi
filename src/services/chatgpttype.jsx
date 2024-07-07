import { useState } from "react";

const Model = ({ model }) => {
  return (
    <div className="choices">
      <input
        className="box-border hover:box-content"
        type="radio"
        id="chagpt-3"
        name="model"
        value="Chagpt-3.5"
      />
      <label htmlFor="chagpt-3">chagpt-3.5</label>

      <input
        className="box-border hover:box-content"
        type="radio"
        id="chagpt-4"
        name="model"
        value="Chagpt-4"
      />
      <label htmlFor="chagpt-4">chagpt-4</label>

      <input
        className="box-border hover:box-content"
        type="radio"
        id="chagpt-4o"
        name="model"
        value="Chagpt-4o"
      />
      <label htmlFor="chagpt-4o">chagpt-4o</label>

      <input
        className="box-border hover:box-content"
        type="radio"
        id="cl-3-op"
        name="model"
        value="Cl-3-op"
      />
      <label htmlFor="cl-3-op">cl-3-op</label>

      <input
        className="box-border hover:box-content"
        type="radio"
        id="cl-3-hai"
        name="model"
        value="Cl-3-hai"
      />
      <label htmlFor="cl-3-hai">cl-3-hai</label>

      <input
        className="box-border hover:box-content"
        type="radio"
        id="cl-3.5-s"
        name="model"
        value="Cl-3.5-s"
      />
      <label htmlFor="cl-3.5-s">cl-3.5-s</label>

      <input
        className="box-border hover:box-content"
        type="radio"
        id="deepl"
        name="model"
        value="Deepl"
      />
      <label htmlFor="deepl">deepl</label>
    </div>
  );
};

export default Model;

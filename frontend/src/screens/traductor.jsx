import React, { useState } from "react";
import TranslationOutput from "../components/TranslationOutput";
import { getTranslation } from "../services/openAi";
import { copyToClipboard } from "../utils/copy";
import Form from "../components/Form";
export default function Tranductor() {
  const [formData, setFormData] = useState({
    language: "French",
    message: "",
    model1: "gpt",
    version1: "gpt-3.5-turbo-0125",
    model2: "geminiAi",
    version2: "gemini-1.5-pro",
    languageselected: "English",
  });

  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [translation, setTranslation] = useState("");
  // const [translation2, setTranslation2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please enter the message.");
      return;
    }
    setIsLoading(true);
    setError("");
    console.log(
      "Translation formData:",
      formData.model1 + " " + formData.version1,
      formData.model2 + " " + formData.version2,
      formData.language,
      formData.languageselected
    );
    try {
      const [translatedText1, translatedText2] = await Promise.all([
        getTranslation(
          formData.language,
          formData.message,
          formData.model1,
          formData.version1,
          formData.languageselected
        ),
        getTranslation(
          formData.language,
          formData.message,
          formData.model2,
          formData.version2,
          formData.languageselected
        ),
      ]);
      setTranslation(`${translatedText1}\n\n${translatedText2}`);
    } catch (error) {
      setError("An error occurred during translation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    copyToClipboard(translation)
      .then(() => displayNotification())
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Translation</h1>
      <Form
        onSubmit={handleOnSubmit}
        formData={formData}
        setFormData={setFormData}
        error={error}
      />
      <TranslationOutput
        isLoading={isLoading}
        translation={translation}
        handleCopy={handleCopy}
        showNotification={showNotification}
      />
    </div>
  );
}

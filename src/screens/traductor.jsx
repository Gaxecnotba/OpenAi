import React, { useState } from "react";
import TranslationOutput from "../components/TranslationOutput";
import { getTranslation } from "../services/openAi";
import { copyToClipboard } from "../utils/copy";
import Form from "../components/Form";
export default function Tranductor() {
  const [formData, setFormData] = useState({
    language: "French",
    message: "",
    model: "gpt-3.5-turbo",
  });
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please enter the message.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const translatedText = await getTranslation(
        formData.language,
        formData.message,
        formData.model
      );
      setTranslation(translatedText);
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

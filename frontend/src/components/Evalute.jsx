import { TranslationOutput } from "./TranslationOutput";

export default function Comparation() {
  return (
    <div
      className="max-width: 200px;
  max-height: 500px;"
    >
      <div>
        <span>Input Text</span>
      </div>

      <div className="model">
        <span>Model name</span>
      </div>

      <div>
        <span>Avg Score</span>
      </div>

      <div>
        Translation
        <TranslationOutput />
      </div>
    </div>
  );
}

import { useState } from "react";

const TaskInput = ({ addTask, isSubmitting }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="task-input">
      <div className="task-input-row">
        <input
          type="text"
          className="task-input-field"
          placeholder="Что нужно сделать?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={isSubmitting}
          className="btn btn-primary"
          onClick={() => {
            if (text.trim().length === 0) {
              setError("Строка не может быть пустой");
              return;
            } else {
              addTask(text);
              setText("");
              setError("");
            }
          }}
        >
          Добавить
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default TaskInput;

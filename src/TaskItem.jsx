import { useState } from "react";

const TaskItem = ({ item, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] = useState(item.text);

  function saveEdit() {
    if (draft.trim().length === 0) {
      return;
    } else {
      editTask(item.id, draft);
      setIsEditing(false);
    }
  }

  function handleChange(e) {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={item.isComplete}
        onChange={() => toggleTask(item.id)}
      />
      {isEditing ? (
        <div className="edit-group">
          <input
            className="edit-input"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleChange}
            onBlur={() => setIsEditing(false)}
          />
          <button
            className="btn btn-save"
            onMouseDown={(e) => e.preventDefault()}
            onClick={saveEdit}
          >
            Сохранить
          </button>
        </div>
      ) : (
        <span className={item.isComplete ? "task-text completed" : "task-text"}>
          {item.text}
        </span>
      )}
      {!isEditing && (
        <div className="task-actions">
          <button
            className="btn btn-edit"
            onClick={() => {
              setIsEditing(true);
              setDraft(item.text);
            }}
          >
            Редактировать
          </button>
          <button
            className="btn btn-delete"
            onClick={() => deleteTask(item.id)}
          >
            ×
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;

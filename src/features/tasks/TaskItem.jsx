import { useState } from "react";

const TaskItem = ({ item, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] = useState(item.title);

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
        checked={item.completed}
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
        <span className={item.completed ? "task-text completed" : "task-text"}>
          {item.title}
        </span>
      )}
      {!isEditing && (
        <div className="task-actions">
          <button
            className="btn btn-edit"
            onClick={() => {
              setIsEditing(true);
              setDraft(item.title);
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

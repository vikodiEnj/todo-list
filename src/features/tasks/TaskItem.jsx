import { useState } from "react";

const TaskItem = ({ item, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setSubmitting] = useState();
  const [draft, setDraft] = useState(item.title);

  function saveEdit() {
    if (draft.trim().length === 0) {
      return;
    } else {
      setSubmitting(true);
      editTask(item.id, draft).then(() => setSubmitting(false));
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
        disabled={isSubmitting}
        type="checkbox"
        className="task-checkbox"
        checked={item.completed}
        onChange={() => {
          (setSubmitting(true),
            toggleTask(item.id).then(() => setSubmitting(false)));
        }}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="btn btn-delete"
            onClick={() => {
              (setSubmitting(true),
                deleteTask(item.id).then(() => setSubmitting(false)));
            }}
          >
            ×
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;

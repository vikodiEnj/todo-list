import { useState } from "react";
import EditTaskForm from "./EditTaskForm";

const TaskItem = ({ item, toggleTask, deleteTask, actionLoading }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={item.completed}
        onChange={() => toggleTask(item.id)}
        disabled={actionLoading}
      />
      {isEditing ? (
        <EditTaskForm id={item.id} onDone={() => setIsEditing(false)} />
      ) : (
        <span className={item.completed ? "task-text completed" : "task-text"}>
          {item.title}
        </span>
      )}
      {!isEditing && (
        <div className="task-actions">
          <button
            className="btn btn-edit"
            onClick={() => setIsEditing(true)}
            disabled={actionLoading}
          >
            Редактировать
          </button>
          <button
            className="btn btn-delete"
            onClick={() => deleteTask(item.id)}
            disabled={actionLoading}
          >
            ×
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
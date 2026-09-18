import { useState, useEffect } from "react";
import { useGetTaskQuery, useEditTaskMutation } from "../../services/redevApi";

const EditTaskForm = ({ id, onDone }) => {
  const { data, isLoading } = useGetTaskQuery(id);
  const [editTask, { isLoading: isSaving }] = useEditTaskMutation();

  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setDraft(data.title);
    }
  }, [data]);

  function saveEdit() {
    if (draft.trim().length === 0) return;
    editTask({ id, newTitle: draft });
    onDone();
  }

  function handleChange(e) {
    if (e.key === "Enter") saveEdit();
    else if (e.key === "Escape") onDone();
  }

  return (
    <>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="edit-group">
          <input
            className="edit-input"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleChange}
            onBlur={onDone}
            disabled={isSaving}
          />
          <button
            className="btn btn-save"
            onMouseDown={(e) => e.preventDefault()}
            onClick={saveEdit}
            disabled={isSaving}
          >
            Сохранить
          </button>
        </div>
      )}
    </>
  );
};

export default EditTaskForm;
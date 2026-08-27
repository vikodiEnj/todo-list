export const addTaskAction = (text) => ({
  type: "addTask",
  payload: text,
});

export const toggleTaskAction = (id) => ({
  type: "toggleTask",
  payload: id,
});

export const deleteTaskAction = (id) => ({
  type: "deleteTask",
  payload: id,
});

export const editTaskAction = (id, text) => ({
  type: "editTask",
  payload: {
    id: id,
    text: text,
  },
});

export const clearCompletedAction = () => ({
  type: "clearCompleted",
});

export const setFilterAction = (filter) => ({
  type: "setFilter",
  payload: filter,
});

export const setSortOrderAction = (sort) => ({
  type: "setSortOrder",
  payload: sort,
});

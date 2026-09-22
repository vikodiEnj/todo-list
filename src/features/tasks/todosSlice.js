import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("tasks");

const initialState = saved
  ? JSON.parse(saved)
  : [
      { id: 1, text: "Покушать", isComplete: true },
      { id: 2, text: "Поесть", isComplete: false },
      { id: 3, text: "Пообедать", isComplete: false },
    ];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, isComplete: false });
    },
    toggleTask: (state, action) => {
      const toggledTask = state.find((item) => item.id === action.payload);
      toggledTask.isComplete = !toggledTask.isComplete;
    },
    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1, {
          id: state[index].id,
          text: action.payload.text,
          isComplete: state[index].isComplete,
        });
      }
    },
    clearCompleted: (state) => {
      return state.filter((item) => item.isComplete === false);
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/tasks/todosSlice";
import filterReducer from "../features/filter/filterSlice";
import sortReducer from "../features/filter/sortSlice";

const store = configureStore({
  reducer: {
    tasks: todosReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
});

export { store };

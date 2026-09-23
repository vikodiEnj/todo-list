import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/tasks/todosSlice";
import filterReducer from "../features/filter/filterSlice";
import sortReducer from "../features/filter/sortSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    tasks: todosReducer,
    filter: filterReducer,
    sort: sortReducer,
    auth: authReducer,
  },
});

export { store };

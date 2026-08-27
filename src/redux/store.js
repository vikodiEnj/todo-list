import { combineReducers, legacy_createStore as createStore } from "redux";
import { taskReducer } from "./tasksReducer";
import { filterReducer } from "./filterReducer";
import { sortReducer } from "./sortReducer";

const store = createStore(
  combineReducers({
    tasks: taskReducer,
    filter: filterReducer,
    sort: sortReducer,
  }),
);

export { store };

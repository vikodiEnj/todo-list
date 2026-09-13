import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { taskReducer } from "./tasksReducer";
import { filterReducer } from "./filterReducer";
import { sortReducer } from "./sortReducer";
import { thunk } from "redux-thunk";
import { loggerMiddleware } from "./loggerMiddleware";
import { thunkReducer } from "./thunkReducer";

const rootReducer = combineReducers({
  todosApi: thunkReducer,
  tasks: taskReducer,
  filter: filterReducer,
  sort: sortReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware),
);

export { store };

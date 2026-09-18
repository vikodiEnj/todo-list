import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { redevApi } from "../services/redevApi";
import filterReducer from "../features/filter/filterSlice";
import sortReducer from "../features/filter/sortSlice";

const store = configureStore({
  reducer: {
    [redevApi.reducerPath]: redevApi.reducer,
    filter: filterReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redevApi.middleware),
});

setupListeners(store.dispatch);

export { store };

import { loadingAction, successAction, errorAction } from "./actions";

export const fetchTodosThunk = () => {
  return async (dispatch) => {
    dispatch(loadingAction());
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(successAction(data));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };
};

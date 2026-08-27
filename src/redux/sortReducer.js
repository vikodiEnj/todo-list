const initialState = "newest";

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setSortOrder":
      return action.payload;
    default:
      return state;
  }
};

export { sortReducer };

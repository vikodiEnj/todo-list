const initialState = "All";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "All":
      return action.payload;
    default:
      return state;
  }
};

export { filterReducer };

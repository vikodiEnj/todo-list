const initialState = { loading: false, data: [], error: null };

const thunkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchLoading":
      return { ...state, loading: true, error: null };
    case "fetchSuccess":
      return { ...state, loading: false, data: action.payload };
    case "fetchError":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { thunkReducer };

import { createSlice } from "@reduxjs/toolkit";

const initialState = "newest";

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortOrder: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSortOrder } = sortSlice.actions;
export default sortSlice.reducer;

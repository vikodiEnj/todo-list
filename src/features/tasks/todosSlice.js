import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        return json.data;
      } else {
        return thunkAPI.rejectWithValue(response.statusText);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (title) => {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },
    toggleTask: (state, action) => {
      const toggledTask = state.items.find(
        (item) => item.id === action.payload,
      );
      toggledTask.completed = !toggledTask.completed;
    },
    deleteTask: (state, action) => {
      const index = state.items.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    editTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.items.splice(index, 1, {
          id: state.items[index].id,
          title: action.payload.title,
          completed: state.items[index].completed,
        });
      }
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTask, toggleTask, deleteTask, editTask, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;

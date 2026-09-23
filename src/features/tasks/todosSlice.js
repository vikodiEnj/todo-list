import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
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

export const addTask = createAsyncThunk(
  "todos/addTask",
  async (title, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        return thunkAPI.rejectWithValue(response.statusText);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editTask = createAsyncThunk(
  "todos/editTask",
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        },
      );
      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        return thunkAPI.rejectWithValue(response.statusText);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const toggleTask = createAsyncThunk(
  "todos/toggleTask",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          },
        },
      );
      if (response.ok) {
        const json = await response.json();
        return json.id;
      } else {
        return thunkAPI.rejectWithValue(response.statusText);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "todos/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
          },
        },
      );
      if (response.ok) {
        return id;
      } else {
        return thunkAPI.rejectWithValue(response.statusText);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const clearCompleted = createAsyncThunk(
  "todos/clearCompleted",
  async (_, thunkAPI) => {
    let completedIds = thunkAPI
      .getState()
      .tasks.items.filter((item) => item.completed)
      .map((task) => task.id);
    await Promise.all(
      completedIds.map((id) => thunkAPI.dispatch(deleteTask(id))),
    );
    return completedIds;
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task,
        );
        state.error = null;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        );
        state.error = null;
      })
      .addCase(toggleTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((task) => task.id != action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todosSlice.reducer;

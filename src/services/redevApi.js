import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redevApi = createApi({
  reducerPath: "redevApi",
  tagTypes: ["Task"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/todos`,
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/todos",
        method: "POST",
        body: { title: newTask },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    toggleTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    editTask: builder.mutation({
      query: ({ id, newTitle }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { title: newTitle },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetTasksQuery,
  useAddTaskMutation,
  useToggleTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} = redevApi;

import "./App.css";
import TaskList from "./features/tasks/TaskList";
import TaskInput from "./features/tasks/TaskInput";
import TaskFilter from "./features/filter/TaskFilter";
import Footer from "./features/tasks/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskMutation,
} from "./services/redevApi";
import { setFilter } from "./features/filter/filterSlice";
import { setSortOrder } from "./features/filter/sortSlice";

function App() {
  const { data: items = [], error: tasksError, isLoading } = useGetTasksQuery();
  const [addTask, { isLoading: isAdding, error: addError }] =
    useAddTaskMutation();
  const [deleteTask, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTaskMutation();
  const [toggleTask, { isLoading: isToggling, error: toggleError }] =
    useToggleTaskMutation();

  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);

  const dispatch = useDispatch();

  const loading = isDeleting || isToggling;

  const error = tasksError || addError || deleteError || toggleError;

  const filteredTasks = items.filter((item) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Active") {
      return !item.completed;
    } else {
      return item.completed;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  function toggleTaskFn(id) {
    toggleTask(id);
  }

  function deleteTaskFn(id) {
    deleteTask(id);
  }

  function addTaskFn(task) {
    addTask(task);
  }

  function setFilterFn(filter) {
    dispatch(setFilter(filter));
  }

  function setSortOrderFn(sort) {
    dispatch(setSortOrder(sort));
  }

  const leftTasks = items.filter((item) => !item.completed).length;

  return (
    <div className="app">
      <h1>Приветствую проверяющего</h1>
      <TaskInput addTask={addTaskFn} actionLoading={isAdding} />
      <TaskFilter
        filter={filter}
        setFilter={setFilterFn}
        sortOrder={sort}
        setSortOrder={setSortOrderFn}
      />
      {isLoading ? (
        <p className="loading-text">Загрузка...</p>
      ) : error ? (
        <div className="error-box">
          <p className="error-title">Что-то пошло не так</p>
        </div>
      ) : (
        <TaskList
          items={sortedTasks}
          toggleTask={toggleTaskFn}
          deleteTask={deleteTaskFn}
          actionLoading={loading}
        />
      )}
      <Footer leftTasks={leftTasks} />
    </div>
  );
}

export default App;

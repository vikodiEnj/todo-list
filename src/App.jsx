import "./App.css";
import TaskList from "./features/tasks/TaskList";
import TaskInput from "./features/tasks/TaskInput";
import TaskFilter from "./features/filter/TaskFilter";
import Footer from "./features/tasks/Footer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearCompleted,
  fetchTodos,
} from "./features/tasks/todosSlice";
import { setFilter } from "./features/filter/filterSlice";
import { setSortOrder } from "./features/filter/sortSlice";

function App() {
  const { items, loading, error } = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

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
    dispatch(toggleTask(id));
  }

  function deleteTaskFn(id) {
    dispatch(deleteTask(id));
  }

  function addTaskFn(task) {
    dispatch(addTask(task));
  }

  function editTaskFn(id, newText) {
    dispatch(editTask({ id, title: newText }));
  }

  function clearCompletedFn() {
    dispatch(clearCompleted());
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
      <TaskInput addTask={addTaskFn} />
      <TaskFilter
        filter={filter}
        setFilter={setFilterFn}
        sortOrder={sort}
        setSortOrder={setSortOrderFn}
      />
      {loading ? (
        <p className="loading-text">Загрузка...</p>
      ) : error ? (
        <div className="error-box">
          <p className="error-title">Ошибка, попробуйте снова</p>
          <p className="error-detail">{error}</p>
        </div>
      ) : (
        <TaskList
          items={sortedTasks}
          toggleTask={toggleTaskFn}
          deleteTask={deleteTaskFn}
          editTask={editTaskFn}
        />
      )}
      <button
        className="btn btn-refresh"
        onClick={() => dispatch(fetchTodos())}
      >
        Обновить данные
      </button>
      <Footer clearCompleted={clearCompletedFn} leftTasks={leftTasks} />
    </div>
  );
}

export default App;

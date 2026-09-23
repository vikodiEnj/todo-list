import "./App.css";
import TaskList from "./features/tasks/TaskList";
import TaskInput from "./features/tasks/TaskInput";
import TaskFilter from "./features/filter/TaskFilter";
import Footer from "./features/tasks/Footer";
import RegistrationForm from "./features/auth/RegistrationForm";
import LoginForm from "./features/auth/LoginForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  fetchTodos,
  clearCompleted,
} from "./features/tasks/todosSlice";
import { setFilter } from "./features/filter/filterSlice";
import { setSortOrder } from "./features/filter/sortSlice";
import { loginUser, registerUser } from "./features/auth/authSlice";

function App() {
  const { items, loading, error } = useSelector((state) => state.tasks);
  const {
    token,
    loading: loadingAuth,
    error: errorAuth,
  } = useSelector((state) => state.auth);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);

  const [isSubmitting, setSubmitting] = useState();
  const [authView, setAuthView] = useState("register");

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos());
    }
  }, [token]);

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

  function handleLogin(email, password) {
    dispatch(loginUser({ email, password }));
  }

  function handleRegister(name, email, password) {
    dispatch(registerUser({ name, email, password }));
  }

  function toggleTaskFn(id) {
    return dispatch(toggleTask(id));
  }

  function deleteTaskFn(id) {
    return dispatch(deleteTask(id));
  }

  function addTaskFn(task) {
    setSubmitting(true);
    dispatch(addTask(task)).then((v) => setSubmitting(false));
  }

  function editTaskFn(id, newText) {
    return dispatch(editTask({ id, title: newText }));
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

  return token ? (
    <div className="app">
      <h1>Приветствую проверяющего</h1>
      <TaskInput addTask={addTaskFn} isSubmitting={isSubmitting} />
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
        disabled={loading}
        onClick={() => dispatch(fetchTodos())}
      >
        Обновить данные
      </button>
      <Footer clearCompleted={clearCompletedFn} leftTasks={leftTasks} />
    </div>
  ) : authView === "register" ? (
    <RegistrationForm
      onSubmit={handleRegister}
      loading={loadingAuth}
      error={errorAuth}
      onSwitchToLogin={() => setAuthView("login")}
    />
  ) : (
    <LoginForm
      onSubmit={handleLogin}
      loading={loadingAuth}
      error={errorAuth}
      onSwitchToRegister={() => setAuthView("register")}
    />
  );
}

export default App;

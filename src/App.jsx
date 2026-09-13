import "./App.css";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import Footer from "./Footer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskAction,
  deleteTaskAction,
  toggleTaskAction,
  editTaskAction,
  clearCompletedAction,
  setSortOrderAction,
  setFilterAction,
} from "./redux/actions";
import Data from "./data";

function App() {
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((item) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Active") {
      return item.isComplete === false;
    } else {
      return item.isComplete === true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  function toggleTask(id) {
    dispatch(toggleTaskAction(id));
  }

  function deleteTask(id) {
    dispatch(deleteTaskAction(id));
  }

  function addTask(task) {
    dispatch(addTaskAction(task));
  }

  function editTask(id, newText) {
    dispatch(editTaskAction(id, newText));
  }

  function clearCompleted() {
    dispatch(clearCompletedAction());
  }

  function setFilter(filter) {
    dispatch(setFilterAction(filter));
  }

  function setSortOrder(sort) {
    dispatch(setSortOrderAction(sort));
  }

  const leftTasks = tasks.filter((item) => item.isComplete === false).length;

  return (
    <div className="app">
      <h1>Приветствую проверяющего</h1>
      <TaskInput addTask={addTask} />
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        sortOrder={sort}
        setSortOrder={setSortOrder}
      />
      <TaskList
        tasks={sortedTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <Footer clearCompleted={clearCompleted} leftTasks={leftTasks} />
      <Data />
    </div>
  );
}

export default App;

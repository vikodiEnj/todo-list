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
} from "./features/tasks/todosSlice";
import { setFilter } from "./features/filter/filterSlice";
import { setSortOrder } from "./features/filter/sortSlice";

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
    dispatch(editTask({ id, text: newText }));
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

  const leftTasks = tasks.filter((item) => item.isComplete === false).length;

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
      <TaskList
        tasks={sortedTasks}
        toggleTask={toggleTaskFn}
        deleteTask={deleteTaskFn}
        editTask={editTaskFn}
      />
      <Footer clearCompleted={clearCompletedFn} leftTasks={leftTasks} />
    </div>
  );
}

export default App;

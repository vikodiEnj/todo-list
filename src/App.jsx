import "./App.css";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import TaskFilter from "./TaskFilter";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Покушать", isComplete: true },
          { id: 2, text: "Поесть", isComplete: false },
          { id: 3, text: "Пообедать", isComplete: false },
        ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((item) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Active") {
      return item.isComplete === false;
    } else {
      return item.isComplete === true;
    }
  });

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addTask(task) {
    setTasks([...tasks, { id: Date.now(), text: task, isComplete: false }]);
  }

  function editTask(id, newText) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  }

  function clearCompleted() {
    setTasks(tasks.filter((item) => item.isComplete === false));
  }

  const leftTasks = tasks.filter((item) => item.isComplete === false).length;

  const [sortOrder, setSortOrder] = useState("newest");

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  return (
    <div className="app">
      <h1>Приветствую проверяющего</h1>
      <TaskInput addTask={addTask} />
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <TaskList
        tasks={sortedTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <Footer clearCompleted={clearCompleted} leftTasks={leftTasks} />
    </div>
  );
}

export default App;

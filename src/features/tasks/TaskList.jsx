import TaskItem from "./TaskItem";

const TaskList = ({ items, toggleTask, deleteTask, editTask }) => {
  return (
    <ul className="task-list">
      {items.length === 0 && <li className="empty-state">Задач нет</li>}
      {items.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;

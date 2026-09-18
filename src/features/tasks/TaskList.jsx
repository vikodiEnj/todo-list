import TaskItem from "./TaskItem";

const TaskList = ({
  items,
  toggleTask,
  deleteTask,
  actionLoading,
}) => {
  return (
    <ul className="task-list">
      {items.length === 0 && <li className="empty-state">Задач нет</li>}
      {items.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          actionLoading={actionLoading}
        />
      ))}
    </ul>
  );
};

export default TaskList;

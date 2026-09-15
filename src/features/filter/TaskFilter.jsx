const TaskFilter = ({ filter, setFilter, sortOrder, setSortOrder }) => {
  return (
    <div className="task-filter">
      <div className="filter-group">
        <button
          className={filter === "All" ? "btn btn-chip active" : "btn btn-chip"}
          onClick={() => setFilter("All")}
        >
          Все
        </button>
        <button
          className={
            filter === "Active" ? "btn btn-chip active" : "btn btn-chip"
          }
          onClick={() => setFilter("Active")}
        >
          Активные
        </button>
        <button
          className={
            filter === "Completed" ? "btn btn-chip active" : "btn btn-chip"
          }
          onClick={() => setFilter("Completed")}
        >
          Выполненные
        </button>
      </div>
      <div className="filter-group">
        <button
          className={
            sortOrder === "newest" ? "btn btn-chip active" : "btn btn-chip"
          }
          onClick={() => setSortOrder("newest")}
        >
          Сначала новые
        </button>
        <button
          className={
            sortOrder === "oldest" ? "btn btn-chip active" : "btn btn-chip"
          }
          onClick={() => setSortOrder("oldest")}
        >
          Сначала старые
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;

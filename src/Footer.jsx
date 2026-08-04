const Footer = ({ clearCompleted, leftTasks }) => {
  return (
    <div className="footer">
      <p className="left-count">Осталось задач: {leftTasks}</p>
      <button className="btn btn-clear" onClick={clearCompleted}>
        Очистить выполненные
      </button>
    </div>
  );
};

export default Footer;

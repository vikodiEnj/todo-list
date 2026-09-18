const Footer = ({ clearCompleted, leftTasks }) => {
  return (
    <div className="footer">
      <p className="left-count">Осталось задач: {leftTasks}</p>
    </div>
  );
};

export default Footer;

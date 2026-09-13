import { useSelector, useDispatch } from "react-redux";
import { fetchTodosThunk } from "./redux/thunkAction";

const Data = () => {
  const { data, loading, error } = useSelector((state) => state.todosApi);

  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="data-section">
        <p className="data-loading">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-section">
        <div className="data-error">
          <p className="data-error-text">Ошибка: {error}</p>
          <button
            className="btn btn-retry"
            onClick={() => dispatch(fetchTodosThunk())}
          >
            Повторить запрос
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="data-section">
      <button
        className="btn btn-primary"
        onClick={() => dispatch(fetchTodosThunk())}
      >
        Загрузить данные
      </button>
      {data && (
        <div className="data-results">
          <p className="data-title">Данные:</p>
          <ul className="data-list">
            {data.slice(0, 5).map((item) => (
              <li className="data-item" key={item.id}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Data;

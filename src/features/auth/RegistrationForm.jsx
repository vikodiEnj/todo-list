import { useState } from "react";

const RegistrationForm = ({ onSubmit, loading, error, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, email, password);
  }

  return (
    <div className="app">
      <h1>Регистрация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Логин"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          Отправить
        </button>
      </form>

      {loading && <p className="auth-status">Отправка...</p>}
      {error && <p className="error-text">{error}</p>}

      <p className="auth-status">
        Уже есть аккаунт?{" "}
        <button
          type="button"
          className="btn btn-clear"
          onClick={onSwitchToLogin}
        >
          Войти
        </button>
      </p>
    </div>
  );
};

export default RegistrationForm;

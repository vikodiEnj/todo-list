import { useState } from "react";

const LoginForm = ({ onSubmit, loading, error, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div className="app">
      <h1>Вход</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
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
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          Войти
        </button>
      </form>

      {loading && <p className="auth-status">Отправка...</p>}
      {error && <p className="error-text">{error}</p>}

      <p className="auth-status">
        Нет аккаунта?{" "}
        <button
          type="button"
          className="btn btn-clear"
          onClick={onSwitchToRegister}
        >
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

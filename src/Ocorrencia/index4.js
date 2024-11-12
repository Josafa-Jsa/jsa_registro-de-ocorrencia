import React, { useState } from "react";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { toast } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false); // Visitante flag
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar ou esconder senha

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
    } else if (!username || !password || !email) {
      setError("Todos os campos são obrigatórios.");
    } else {
      setError("Cadastro realizado com sucesso!");
      setView("login");
    }
  };

  const handleResetPassword = () => {
    if (!email) {
      setError("Insira o seu e-mail.");
    } else {
      setError("Instruções de redefinição enviadas para o seu e-mail.");
    }
  };

  const continueAsVisitor = () => {
    setIsVisitor(true);
    setIsLoggedIn(false);
  };

  const requireLogin = () => {
    if (!isLoggedIn && isVisitor) {
      setError("É necessário realizar login para salvar dados.");
      setView("login");
    }
  };

  if (!isLoggedIn && !isVisitor) {
    return (
      <div className="login-container">
        <h1>
          {view === "login"
            ? "Login"
            : view === "register"
            ? "Cadastro"
            : "Redefinir Senha"}
        </h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {view === "login" && (
          <>
            <div className="login-field">
              <label>Usuário:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite o seu usuário"
              />
            </div>

            <div className="login-field">
              <label>Senha:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Ocultar" : "Mostrar"} Senha
              </button>
            </div>

            <button onClick={handleLogin}>Entrar</button>

            <p>
              Não tem uma conta?{" "}
              <a href="#" onClick={() => setView("register")}>
                Cadastre-se
              </a>
            </p>
            <p>
              Esqueceu sua senha?{" "}
              <a href="#" onClick={() => setView("reset")}>
                Redefinir Senha
              </a>
            </p>
            <p>
              <button onClick={continueAsVisitor}>
                Continuar como Visitante
              </button>
            </p>
          </>
        )}

        {view === "register" && (
          <>
            <div className="login-field">
              <label>Usuário:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite o seu usuário"
              />
            </div>

            <div className="login-field">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu e-mail"
              />
            </div>

            <div className="login-field">
              <label>Senha:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Ocultar" : "Mostrar"} Senha
              </button>
            </div>

            <div className="login-field">
              <label>Confirmar Senha:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a sua senha"
              />
            </div>

            <button onClick={handleRegister}>Cadastrar</button>

            <p>
              Já tem uma conta?{" "}
              <a href="#" onClick={() => setView("login")}>
                Faça login
              </a>
            </p>
          </>
        )}

        {view === "reset" && (
          <>
            <div className="login-field">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu e-mail para redefinir a senha"
              />
            </div>

            <button onClick={handleResetPassword}>Redefinir Senha</button>

            <p>
              Lembrou sua senha?{" "}
              <a href="#" onClick={() => setView("login")}>
                Faça login
              </a>
            </p>
          </>
        )}
      </div>
    );
  }

  return <App isLoggedIn={isLoggedIn} requireLogin={requireLogin} />;
}

// function Ocorrencia();
export default App;

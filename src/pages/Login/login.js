import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth"; 

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sucesso = await login(email, senha); 
    setLoading(false);

    if (sucesso) {
      alert("Login realizado com sucesso!");
      navigate("/"); // redireciona para página principal
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className="container2">
      <form id="quadrado_login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="grupo">
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Logar"}
        </button>
      </form>
    </div>
  );
}

export default Login;

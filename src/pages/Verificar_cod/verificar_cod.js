import "./verificar_cod.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // importa o Axios configurado

function Verificar() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");

  const handleChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cnpj = localStorage.getItem("cnpj");

    if (!codigo) {
      alert("Por favor, insira o código recebido por SMS.");
      return;
    }

    try {
      const response = await api.post("/verifica/code", {
        cnpj: cnpj,
        codigo_digitado: codigo,
      });

      alert("Código verificado com sucesso!");
      console.log("Código verificado:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erro:", error);
      alert("Código inválido ou expirado!");
    }
  };

  return (
    <div className="container">
      <form id="cadastro_form" onSubmit={handleSubmit}>
        <h2>Confirme sua conta:</h2>
        <div className="grupo">
          <input
            name="codigo_validacao"
            placeholder="Código"
            value={codigo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Verificar</button>
      </form>
    </div>
  );
}

export default Verificar;

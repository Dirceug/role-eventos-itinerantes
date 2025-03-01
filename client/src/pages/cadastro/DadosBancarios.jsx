import React from 'react';
import { useNavigate } from 'react-router-dom';

function DadosBancarios() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Implementar lógica para enviar todos os dados registrados ao backend
    alert("Cadastro completado com sucesso")
    navigate('/usuarios');
  };

  return (
    <div>
      <h1>Registro de Dados Bancários</h1>
      <button onClick={handleSubmit}>Enviar Dados</button>
    </div>
  );
}

export default DadosBancarios;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrarUsuario() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  const handleNext = () => {
    // Implementar lógica de registro do usuário aqui e armazenar os dados no estado global ou contexto
    navigate('/cadastro/atualizarendereco');
  };

  return (
    <div>
      <h1>Cadastrar Usuário</h1>
      <div>
        <label>
          Nome:
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          CPF:
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </label>
      </div>
      <button onClick={handleNext}>Próximo</button>
    </div>
  );
}

export default RegistrarUsuario;
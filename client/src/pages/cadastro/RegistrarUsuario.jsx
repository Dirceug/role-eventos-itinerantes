import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGrande from '../../components/ButtonGrande';
import LabelInput from '../../components/LabelInput';
import UserContext from '../../contexts/UserContext';
import '../../App.css'

function RegistrarUsuario() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!displayName) newErrors.displayName = "Nome é obrigatório";
    if (!email) newErrors.email = "Email é obrigatório";
    if (!cpf) newErrors.cpf = "CPF é obrigatório";
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) newErrors.cpf = "CPF inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayName, email, cpf })
      });
      if (response.ok) {
        const userData = { displayName, email, cpf };
        setUser(userData);
        navigate('/cadastro/atualizarendereco');
      } else {
        console.error('Erro ao registrar usuário');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <div className='paginaCadastro'>
      <h1 className='tituloLogin'>Cadastrar Usuário</h1>
      <div>
        <LabelInput
          label="Nome:"
          type="text"
          placeholder="Nome"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          error={errors.displayName}
        />
        <LabelInput
          label="Email:"
          type="email"
          placeholder="nome@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <LabelInput
          label="CPF:"
          type="text"
          placeholder="123.456.789-10"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          error={errors.cpf}
        />
      </div>
      <ButtonGrande onClick={handleNext} className='invertido'>
        Registrar Usuário
      </ButtonGrande>
    </div>
  );
}

export default RegistrarUsuario;
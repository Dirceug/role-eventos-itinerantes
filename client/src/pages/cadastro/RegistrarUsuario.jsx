import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi'; // Importando o Joi diretamente
import ButtonGrande from '../../components/buttons/ButtonGrande';
import LabelInput from '../../components/LabelInput';
import UserContext from '../../contexts/UserContext';
import '../../App.css';

// Definindo o esquema de validação com Joi e mensagens de erro personalizadas
const schema = Joi.object({
  displayName: Joi.string()
    .pattern(/^[a-zA-Z]{3,} [a-zA-Z]{3,}$/)
    .required()
    .label('Nome')
    .messages({
      'string.pattern.base': '{#label} deve conter nome e sobrenome, cada um com pelo menos 3 letras.',
      'string.empty': '{#label} não pode estar vazio.',
      'any.required': '{#label} é obrigatório.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email')
    .messages({
      'string.email': '{#label} deve ser um email válido.',
      'string.empty': '{#label} não pode estar vazio.',
      'any.required': '{#label} é obrigatório.'
    }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/(?=.*[a-z])/)
    .pattern(/(?=.*[A-Z])/)
    .pattern(/(?=.*\d)/)
    .pattern(/(?=.*[@$!%*?&])/)
    .required()
    .label('Senha')
    .messages({
      'string.min': '{#label} deve ter pelo menos 8 caracteres.',
      'string.max': '{#label} deve ter no máximo 64 caracteres.',
      'string.pattern.base': '{#label} deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
      'string.empty': '{#label} não pode estar vazio.',
      'any.required': '{#label} é obrigatório.'
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Repetir Senha')
    .messages({
      'any.only': 'As senhas não coincidem.',
      'string.empty': '{#label} não pode estar vazio.',
      'any.required': '{#label} é obrigatório.'
    }),
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .label('CPF')
    .messages({
      'string.pattern.base': '{#label} deve estar no formato 123.456.789-10.',
      'string.empty': '{#label} não pode estar vazio.',
      'any.required': '{#label} é obrigatório.'
    }),
  apelido: Joi.string()
    .min(3)
    .allow('')
    .label('Apelido')
    .messages({
      'string.min': '{#label} deve ter pelo menos 3 caracteres.'
    })
});

function RegistrarUsuario() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [apelido, setApelido] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const result = schema.validate({ displayName, email, password, confirmPassword, cpf, apelido }, { abortEarly: false });
    if (!result.error) {
      setErrors({});
      return true;
    }

    const newErrors = {};
    for (let item of result.error.details) {
      newErrors[item.path[0]] = item.message;
    }
    setErrors(newErrors);
    return false;
  };

  const handleNext = async () => {
    if (!validate()) return;
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayName, email, password, cpf, apelido })
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        navigate('/cadastro/atualizarendereco');
      } else {
        console.error('Erro ao registrar usuário');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os três primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os três próximos dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona traço antes dos dois últimos dígitos
  };

  return (
    <div className='paginaCadastro'>
      <h1 className='tituloLogin'>Cadastrar Usuário</h1>
      <div className='cinquentaPorCento'>
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
          label="Senha:"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <LabelInput
          label="Repetir Senha:"
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <LabelInput
          label="CPF:"
          type="text"
          placeholder="123.456.789-10"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          error={errors.cpf}
          mask={maskCPF} // Usando a função de máscara customizada
        />
        <LabelInput
          label="Apelido (opcional):"
          type="text"
          placeholder="Apelido"
          value={apelido}
          onChange={(e) => setApelido(e.target.value)}
          error={errors.apelido}
        />
      </div>
      <ButtonGrande onClick={handleNext} className='invertido'>
        Registrar Usuário
      </ButtonGrande>
    </div>
  );
}

export default RegistrarUsuario;
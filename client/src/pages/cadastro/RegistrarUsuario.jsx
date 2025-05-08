import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi'; // Importando o Joi diretamente
import ButtonGrande from '../../components/buttons/ButtonGrande';
import LabelInput from '../../components/LabelInput';
import UserContext from '../../contexts/UserContext';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importar o método de criação de usuário do Firebase
import { auth } from '../../firebase'; // Importar a instância do Firebase
import '../../App.css';

// Definindo o esquema de validação com Joi e mensagens de erro personalizadas
const schema = Joi.object({
  displayName: Joi.string()
    // .pattern(/^[a-zA-Z]{3,}( [a-zA-Z]{3,})+$/) 
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
    .min(4)
    .max(64)
    // .pattern(/(?=.*[a-z])/)
    // .pattern(/(?=.*[A-Z])/)
    // .pattern(/(?=.*\d)/)
    // .pattern(/(?=.*[@$!%*?&])/)
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
      // Registrar usuário no FirebaseAuth
      const firebaseResult = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = firebaseResult.user;
      //console.log('Usuário registrado no Firebase:', firebaseUser);

      // Obter o token de autenticação do Firebase
      const idToken = await firebaseUser.getIdToken();

      // Construir a URL com a variável de ambiente
      const apiUrl = import.meta.env.VITE_API_URL; // Certifique-se de que esta variável está definida
      if (!apiUrl) {
        throw new Error('A variável de ambiente VITE_API_URL não está definida.');
      }
      //console.log("API_URL:", apiUrl )
      // Enviar dados do usuário para o backend
      const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` // Enviar o token no cabeçalho
        },
        body: JSON.stringify({
          displayName,
          email,
          cpf,
          apelido,
          firebaseUid: firebaseUser.uid, // UID do Firebase
          emailVerified: firebaseUser.emailVerified,
          isAnonymous: firebaseUser.isAnonymous
        })
      });

      if (response.ok) {
        const userData = await response.json();
        //console.log('Usuário registrado no backend:', userData);
        setUser(userData);
        navigate('/logincomemail');
      } else {
        const errorData = await response.json();
        console.error('Erro ao registrar usuário no backend:', errorData);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Erro: O e-mail já está em uso.');
        alert('Esse e-mail já está registrado. Tente fazer login ou usar outro e-mail.');
        toast.error('Esse e-mail já está registrado. Tente fazer login ou usar outro e-mail.')
      } else {
        console.error('Erro ao registrar usuário:', error);
      }
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
          label="Senha:(6letras)"
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
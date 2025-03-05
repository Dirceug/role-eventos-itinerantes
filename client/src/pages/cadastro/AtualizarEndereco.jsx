import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import LabelInput from '../../components/LabelInput';
import ButtonGrande from '../../components/ButtonGrande';
import UserContext from '../../contexts/UserContext';
import '../../App.css';
import '../Pages.css';

// Definindo o esquema de validação com Joi e mensagens de erro personalizadas
const schema = Joi.object({
  tipo: Joi.string().required().label('Tipo').messages({
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  }),
  cep: Joi.string().pattern(/^\d{2}.\d{3}-\d{3}$/).required().min(10).max(10).label('CEP').messages({
    'string.min': '{#label} deve ter pelo menos 8 caracteres.',
    'string.max': '{#label} deve ter no máximo 8 caracteres.',
    'string.pattern.base': '{#label} deve estar no formato 00000-000.',
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  }),
  rua: Joi.string().required().label('Rua').messages({
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  }),
  numero: Joi.string().required().label('Número').messages({
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  }),
  complemento: Joi.string().allow('').label('Complemento'),
  referencia: Joi.string().allow('').label('Referencia'),
  bairro: Joi.string().required().label('Bairro').messages({
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  }),
  cidade: Joi.string().required().label('Cidade').messages({
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  }),
  estado: Joi.string().required().label('Estado').messages({
    'string.empty': '{#label} não pode estar vazio.',
    'any.required': '{#label} é obrigatório.'
  })
});

function AtualizarEndereco() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    tipo: 'Casa',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    referencia: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const validate = () => {
    const result = schema.validate(address, { abortEarly: false });
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
      const response = await fetch('http://localhost:5000/api/users/updateAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
      });
      if (response.ok) {
        navigate('/cadastro/dadosbancarios');
      } else {
        console.error('Erro ao atualizar endereço');
      }
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
    }
  };

  const maskCEP = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona traço após os cinco primeiros dígitos
      .replace(/(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após os dois primeiros dígitos
  };

  return (
    <div className='paginaCadastro'>
      <h1>Atualizar Endereço</h1>
      <div className='cinquentaPorCento'>
        <LabelInput 
          label="Endereço:" 
          type="text" 
          placeholder="Tipo" 
          name="tipo" 
          value={address.tipo} 
          onChange={handleChange} 
          error={errors.tipo} 
        />
        <LabelInput 
          label="CEP:" 
          type="text" 
          placeholder="00.000-000" 
          name="cep" 
          value={address.cep} 
          onChange={(e) => {
            const maskedValue = maskCEP(e.target.value);
            handleChange({ target: { name: 'cep', value: maskedValue } });
          }} 
          error={errors.cep} 
        />
        <LabelInput 
          label="Rua:" 
          type="text" 
          placeholder="nome da rua ou avenida" 
          name="rua" 
          value={address.rua} 
          onChange={handleChange} 
          error={errors.rua} 
        />
        <LabelInput 
          label="Número:" 
          type="text" 
          placeholder="000" 
          name="numero" 
          value={address.numero} 
          onChange={handleChange} 
          error={errors.numero} 
        />
        <LabelInput 
          label="Complemento:" 
          type="text" 
          placeholder="Ap 12 Bloco 7" 
          name="complemento" 
          value={address.complemento} 
          onChange={handleChange} 
          error={errors.complemento} 
        />
        <LabelInput 
          label="Ponto Referência:" 
          type="text" 
          placeholder="Perto de ****" 
          name="referencia" 
          value={address.referencia} 
          onChange={handleChange} 
          error={errors.referencia} 
        />
        <LabelInput 
          label="Bairro:" 
          type="text" 
          placeholder="nome do bairro" 
          name="bairro" 
          value={address.bairro} 
          onChange={handleChange} 
          error={errors.bairro} 
        />
        <LabelInput 
          label="Cidade:" 
          type="text" 
          placeholder="Franca" 
          name="cidade" 
          value={address.cidade} 
          onChange={handleChange} 
          error={errors.cidade} 
        />
        <LabelInput 
          label="Estado:" 
          type="text" 
          placeholder="São Paulo" 
          name="estado" 
          value={address.estado} 
          onChange={handleChange} 
          error={errors.estado} 
        />
      </div>
      <ButtonGrande onClick={handleNext} className='invertido'>
        Enviar Endereço
      </ButtonGrande>
    </div>
  );
}

export default AtualizarEndereco;
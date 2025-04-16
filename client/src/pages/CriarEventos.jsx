import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Joi from 'joi'; // Importe a biblioteca Joi
import UserContext from '../contexts/UserContext';
import './CriarEventos.css';
import BackButton from '../components/buttons/BackButton'; // Importe o BackButton aqui

// Função para formatar o identificador no formato XX-XX-X
function formatIdentifier(identifier) {
  if (!identifier || identifier.length !== 5) return identifier; // Valida o identificador
  return `${identifier.slice(0, 2)} - ${identifier.slice(2, 4)} - ${identifier.slice(4)}`;
}

const schema = Joi.object({
  nome: Joi.string().max(100).required().messages({
    'string.empty': 'O nome do evento é obrigatório.',
    'string.max': 'O nome do evento deve ter no máximo 100 caracteres.',
  }),
  descricao: Joi.string().max(2000).required().messages({
    'string.empty': 'A descrição do evento é obrigatória.',
    'string.max': 'A descrição deve ter no máximo 2000 caracteres.',
  }),
  data: Joi.date().iso().required().messages({
    'date.base': 'A data é obrigatória e deve ser uma data válida.',
    'date.iso': 'A data deve estar no formato ISO.',
  }),
  status: Joi.string().valid('Ativo', 'Inativo', 'Pausado', 'Apagado').required().messages({
    'any.only': 'O status deve ser Ativo, Inativo, Pausado ou Apagado.',
    'string.empty': 'O status é obrigatório.',
  }),
  endereco: Joi.object({
    apelido: Joi.string().required().messages({
      'string.empty': 'O apelido do endereço é obrigatório.',
    }),
    cep: Joi.string().optional(),
    logradouro: Joi.string().required().messages({
      'string.empty': 'O logradouro é obrigatório.',
    }),
    numero: Joi.string().required().messages({
      'string.empty': 'O número do endereço é obrigatório.',
    }),
    complemento: Joi.string().optional(),
    bairro: Joi.string().required().messages({
      'string.empty': 'O bairro é obrigatório.',
    }),
    cidade: Joi.string().required().messages({
      'string.empty': 'A cidade é obrigatória.',
    }),
    estado: Joi.string().required().messages({
      'string.empty': 'O estado é obrigatório.',
    }),
    pontoReferencia: Joi.string().optional(),
    status: Joi.string().valid('ativo').required(),
  }).required(),
  dataEvento: Joi.array().items(
    Joi.object({
      dataAbertura: Joi.date().iso().required().messages({
        'date.base': 'A data de abertura deve ser uma data válida.',
        'date.iso': 'A data de abertura deve estar no formato ISO.',
        'any.required': 'A data de abertura é obrigatória.',
      }),
      dataFechamento: Joi.date().iso().required().messages({
        'date.base': 'A data de fechamento deve ser uma data válida.',
        'date.iso': 'A data de fechamento deve estar no formato ISO.',
        'any.required': 'A data de fechamento é obrigatória.',
      }),
    })
  ).min(1).required(),
});

const EventForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [endereco, setEndereco] = useState({
    apelido: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pontoReferencia: '',
    status: 'ativo',
  });
  const [dataEvento, setDataEvento] = useState([
    { dataAbertura: '', horaAbertura: '', dataFechamento: '', horaFechamento: '' },
  ]);
  const [errors, setErrors] = useState({});

  const handleDataEventoChange = (index, field, value) => {
    const newDataEvento = [...dataEvento];
    if (field === 'dataAbertura' || field === 'dataFechamento') {
      newDataEvento[index][field] = value;
      newDataEvento[index][`hora${field.charAt(4).toUpperCase() + field.slice(5)}`] = value.split('T')[1];
    } else {
      newDataEvento[index][field] = value;
    }
    setDataEvento(newDataEvento);
  };

  const addDataEvento = () => {
    setDataEvento([
      ...dataEvento,
      { dataAbertura: '', horaAbertura: '', dataFechamento: '', horaFechamento: '' },
    ]);
  };

  const validate = () => {
    const event = {
      nome,
      descricao,
      data,
      status,
      endereco,
      dataEvento,
    };

    const { error } = schema.validate(event, { abortEarly: false });
    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path.join('.')] = detail.message;
      });
      setErrors(errorMessages);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const token = Cookies.get('authToken');
    const event = {
      nome,
      descricao,
      data,
      endereco,
      dataEvento,
      status,
      organizadores: [
        {
          nome: user.displayName,
          uid: user._id,
        },
      ],
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

      await axios.post(`${apiUrl}/events`, event, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/eventos');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="event-form">
      <BackButton />
      <h1>Cadastre seu evento</h1>
      <h1>
        Nome do Responsável: {user.displayName} ( {formatIdentifier(user.identifier)} )
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do evento:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength="100"
            required
          />
          {errors['nome'] && <p className="error">{errors['nome']}</p>}
        </label>
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            maxLength="2000"
            required
          />
          {errors['descricao'] && <p className="error">{errors['descricao']}</p>}
        </label>
        <label>
          Data:
          <input
            type="datetime-local"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          {errors['data'] && <p className="error">{errors['data']}</p>}
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Pausado">Pausado</option>
            <option value="Apagado">Apagado</option>
          </select>
          {errors['status'] && <p className="error">{errors['status']}</p>}
        </label>
        <hr />
        <h2>Endereço</h2>
        {/* Campos do endereço */}
        <hr />
        <h2>Horário de Funcionamento</h2>
        {dataEvento.map((item, index) => (
          <div key={index} className="data-evento">
            <label>
              Data e Hora de Abertura:
              <input
                type="datetime-local"
                value={item.dataAbertura}
                onChange={(e) =>
                  handleDataEventoChange(index, 'dataAbertura', e.target.value)
                }
                required
              />
              {errors[`dataEvento.${index}.dataAbertura`] && (
                <p className="error">
                  {errors[`dataEvento.${index}.dataAbertura`]}
                </p>
              )}
            </label>
            <label>
              Data e Hora de Fechamento:
              <input
                type="datetime-local"
                value={item.dataFechamento}
                onChange={(e) =>
                  handleDataEventoChange(index, 'dataFechamento', e.target.value)
                }
                required
              />
              {errors[`dataEvento.${index}.dataFechamento`] && (
                <p className="error">
                  {errors[`dataEvento.${index}.dataFechamento`]}
                </p>
              )}
            </label>
          </div>
        ))}
        <button type="button" onClick={addDataEvento}>
          Adicionar outra data
        </button>
        <hr />
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default EventForm;
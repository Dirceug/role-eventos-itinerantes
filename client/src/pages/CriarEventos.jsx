import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Joi from 'joi';
import UserContext from '../contexts/UserContext';
import './CriarEventos.css';
import BackButton from '../components/buttons/BackButton'; // Botão de voltar

// Função para formatar o identificador no formato XX-XX-X
function formatIdentifier(identifier) {
  if (!identifier || identifier.length !== 5) return identifier; // Valida o identificador
  return `${identifier.slice(0, 2)} - ${identifier.slice(2, 4)} - ${identifier.slice(4)}`;
}

// Validação com Joi
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
  status: Joi.string().valid('Ativo', 'Inativo', 'Pausado').required().messages({
    'any.only': 'O status deve ser Ativo, Inativo ou Pausado.',
    'string.empty': 'O status é obrigatório.',
  }),
  endereco: Joi.object({
    apelido: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'O apelido do endereço é obrigatório.',
      'string.min': 'O apelido deve ter no mínimo 3 caracteres.',
      'string.max': 'O apelido deve ter no máximo 50 caracteres.',
    }),
    cep: Joi.string().pattern(/^\d{5}-\d{3}$/).required().messages({
      'string.empty': 'O CEP é obrigatório.',
      'string.pattern.base': 'O CEP deve estar no formato 00.000-000.',
    }),
    logradouro: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'O logradouro é obrigatório.',
      'string.min': 'O logradouro deve ter no mínimo 3 caracteres.',
      'string.max': 'O logradouro deve ter no máximo 50 caracteres.',
    }),
    numero: Joi.string().min(1).max(20).required().messages({
      'string.empty': 'O número é obrigatório.',
      'string.min': 'O número deve ter no mínimo 1 caractere.',
      'string.max': 'O número deve ter no máximo 20 caracteres.',
    }),
    complemento: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'O complemento é obrigatório.',
      'string.min': 'O complemento deve ter no mínimo 3 caracteres.',
      'string.max': 'O complemento deve ter no máximo 50 caracteres.',
    }),
    bairro: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'O bairro é obrigatório.',
      'string.min': 'O bairro deve ter no mínimo 3 caracteres.',
      'string.max': 'O bairro deve ter no máximo 50 caracteres.',
    }),
    cidade: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'A cidade é obrigatória.',
      'string.min': 'A cidade deve ter no mínimo 3 caracteres.',
      'string.max': 'A cidade deve ter no máximo 50 caracteres.',
    }),
    estado: Joi.string().length(2).required().messages({
      'string.empty': 'O estado é obrigatório.',
      'string.length': 'O estado deve ter exatamente 2 caracteres.',
    }),
    pontoReferencia: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'O ponto de referência é obrigatório.',
      'string.min': 'O ponto de referência deve ter no mínimo 3 caracteres.',
      'string.max': 'O ponto de referência deve ter no máximo 50 caracteres.',
    }),
    status: Joi.string().valid('ativo', 'inativo', 'pausado').required().messages({
      'any.only': 'O status deve ser Ativo, Inativo ou Pausado.',
    }),
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
      horaAbertura: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        'string.pattern.base': 'A hora de abertura deve estar no formato HH:mm.',
      }),
      horaFechamento: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        'string.pattern.base': 'A hora de fechamento deve estar no formato HH:mm.',
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

  // Campos de endereço
  const handleEnderecoChange = (field, value) => {
    setEndereco((prev) => ({ ...prev, [field]: value }));
  };

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
      console.log('Validation Errors:', error.details);
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
    if (!validate()) return;

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
      await axios.post(`${apiUrl}/events`, event, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/eventos');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
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
            required
          />
          {errors['nome'] && <p className="error">{errors['nome']}</p>}
        </label>
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
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
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Pausado">Pausado</option>
          </select>
          {errors['status'] && <p className="error">{errors['status']}</p>}
        </label>
        <hr />
        <h2>Endereço</h2>
        <label>
          Nome do local:
          <input
            type="text"
            value={endereco.apelido}
            onChange={(e) => handleEnderecoChange('apelido', e.target.value)}
            placeholder='Nome do local'
            required
          />
          {errors['endereco.apelido'] && <p className="error">{errors['endereco.apelido']}</p>}
        </label>
        <label>
          CEP:
          <input
            type="text"
            value={endereco.cep}
            onChange={(e) => handleEnderecoChange('cep', e.target.value)}
            maxLength="9"
            placeholder="00.000-000"
            required
          />
          {errors['endereco.cep'] && <p className="error">{errors['endereco.cep']}</p>}
        </label>
        <label>
          Logradouro:
          <input
          type="text"
          value={endereco.logradouro}
          onChange={(e) => handleEnderecoChange('logradouro', e.target.value)}
          placeholder="'Rua Esta' ou 'Avenida Aquela'"
          required
          />
          {errors['endereco.logradorou'] && <p className="error">{errors['endereco.logradouro']}</p>}
        </label>
        <label>
        Número:
        <input
          type="text"
          value={endereco.numero}
          onChange={(e) => handleEnderecoChange('numero', e.target.value)}
          placeholder="000"
          required
        />
        {errors['endereco.numero'] && <p className="error">{errors['endereco.numero']}</p>}
      </label>
      <label>
        Complemento:
        <input
          type="text"
          value={endereco.complemento}
          onChange={(e) => handleEnderecoChange('complemento', e.target.value)}
          placeholder="Complemento"
          required
        />
        {errors['endereco.complemento'] && <p className="error">{errors['endereco.complemento']}</p>}
      </label>
      <label>
        Bairro:
        <input
          type="text"
          value={endereco.bairro}
          onChange={(e) => handleEnderecoChange('bairro', e.target.value)}
          placeholder="Bairro"
          required
        />
        {errors['endereco.bairro'] && <p className="error">{errors['endereco.bairro']}</p>}
      </label>
      <label>
        Cidade:
        <input
          type="text"
          value={endereco.cidade}
          onChange={(e) => handleEnderecoChange('cidade', e.target.value)}
          placeholder="Cidade"
          required
        />
        {errors['endereco.cidade'] && <p className="error">{errors['endereco.cidade']}</p>}
      </label>
      <label>
        Estado:
        <select
          value={endereco.estado}
          onChange={(e) => handleEnderecoChange('estado', e.target.value)}
          required
        >
          <option value="">Selecione o estado</option>
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AP">AP</option>
          <option value="AM">AM</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MT">MT</option>
          <option value="MS">MS</option>
          <option value="MG">MG</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PR">PR</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RS">RS</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="SC">SC</option>
          <option value="SP">SP</option>
          <option value="SE">SE</option>
          <option value="TO">TO</option>
        </select>
        {errors['endereco.estado'] && <p className="error">{errors['endereco.estado']}</p>}
      </label>
      <label>
        Ponto de Referência:
        <input
          type="text"
          value={endereco.pontoReferencia}
          onChange={(e) => handleEnderecoChange('pontoReferencia', e.target.value)}
          placeholder="Ponto de referência"
          required
        />
        {errors['endereco.pontoReferencia'] && <p className="error">{errors['endereco.pontoReferencia']}</p>}
      </label>
      <label>
        Status:
        <select
          value={endereco.status}
          onChange={(e) => handleEnderecoChange('status', e.target.value)}
          required
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="pausado">Pausado</option>
        </select>
        {errors['endereco.status'] && <p className="error">{errors['endereco.status']}</p>}
      </label>
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
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default EventForm;
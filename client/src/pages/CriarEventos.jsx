import React, { useState, useContext, useCallback } from 'react';
import { debounce } from 'lodash'; 
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

const schemaBarraca = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'O nome da barraca é obrigatório.',
    'string.min': 'O nome da barraca deve ter no mínimo 3 caracteres.',
    'string.max': 'O nome da barraca deve ter no máximo 50 caracteres.',
  }),
  descricao: Joi.string().min(20).max(500).required().messages({
    'string.empty': 'A descrição da barraca é obrigatória.',
    'string.min': 'A descrição deve ter no mínimo 20 caracteres.',
    'string.max': 'A descrição deve ter no máximo 500 caracteres.',
  }),
  responsaveis: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    displayName: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
  })).min(1).required(),
  funcionarios: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    displayName: Joi.string().required(),
  })),
  pratos: Joi.array().items(Joi.object({
    nome: Joi.string().min(3).max(50).required(),
    ingredientes: Joi.string().min(3).max(200).required(),
    valor: Joi.number().greater(0).required(),
    imagem: Joi.string().allow(''),
    estoque: Joi.number().integer().min(0).required(),
    status: Joi.string().valid('Ativo').default('Ativo'),
    tempoPreparo: Joi.number().greater(0).required(),
  })).min(1).required(),
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
  const [isEditingOrganizers, setIsEditingOrganizers] = useState(false);
  // Estados para Responsáveis pela Barraca
  const [isEditingResponsaveisBarraca, setIsEditingResponsaveisBarraca] = useState(false);
  const [novoResponsavelBarraca, setNovoResponsavelBarraca] = useState('');
  const [responsaveisBarraca, setResponsaveisBarraca] = useState([]);
  // Estados para Funcionários
  const [isEditingFuncionariosBarraca, setIsEditingFuncionariosBarraca] = useState(false);
  const [novoFuncionarioBarraca, setNovoFuncionarioBarraca] = useState('');
  const [funcionariosBarraca, setFuncionariosBarraca] = useState([]);  const [novoResponsavel, setNovoResponsavel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [organizadoresAdicionais, setOrganizadoresAdicionais] = useState([]);

  const [usersResponsaveisBarraca, setUsersResponsaveisBarraca] = useState([]);
  const [loadingResponsaveisBarraca, setLoadingResponsaveisBarraca] = useState(false);
  const [messageResponsaveisBarraca, setMessageResponsaveisBarraca] = useState('');

  const [usersFuncionariosBarraca, setUsersFuncionariosBarraca] = useState([]);
  const [loadingFuncionariosBarraca, setLoadingFuncionariosBarraca] = useState(false);
  const [messageFuncionariosBarraca, setMessageFuncionariosBarraca] = useState('');
  


  const [barracas, setBarracas] = useState([]);

  const formatIdentifier = useCallback((value) => {
    const cleanedValue = value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
    let formattedValue = '';
    for (let i = 0; i < Math.min(cleanedValue.length, 5); i++) {
      formattedValue += cleanedValue[i];
      if ((i === 1 || i === 3) && i < cleanedValue.length - 1) {
        formattedValue += '-';
      }
    }
    return formattedValue;
  }, []);

  const toggleEditOrganizers = () => {
    setIsEditingOrganizers((prev) => !prev);
  };

  const toggleEditResponsaveisBarraca = () => {
    setIsEditingResponsaveisBarraca((prev) => !prev);
  };

  const toggleEditFuncionariosBarraca = () => {
    setIsEditingFuncionariosBarraca((prev) => !prev);
  };

  const addResponsavelBarraca = (responsavel) => {
    const exists = responsaveisBarraca.some((r) => r._id === responsavel._id);
    if (!exists) {
      setResponsaveisBarraca((prev) => [...prev, responsavel]);
    }
  };
  
  // Adicionar um funcionário à lista de Funcionários
  const addFuncionarioBarraca = (funcionario) => {
    const exists = funcionariosBarraca.some((f) => f._id === funcionario._id);
    if (!exists) {
      setFuncionariosBarraca((prev) => [...prev, funcionario]);
    }
  };

  //Funções para buscar usuários
  const fetchUsers = async (query) => {
    const sanitizedQuery = query.replace(/-/g, '');
  
    if (sanitizedQuery.length < 3) {
      setMessage('Digite pelo menos 3 caracteres para buscar.');
      setUsers([]);
      return;
    }  
  
    setLoading(true);
    setMessage('');
    try {
      const token = Cookies.get('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/search?identifier=${sanitizedQuery}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        if (response.status === 404) {
          setMessage('Nenhum usuário encontrado com esse identificador.');
          return [];
        } else {
          return [];
          setMessage('Erro ao buscar usuários. Tente novamente.');
        }
        setUsers([]);
        return;
      }
      const data = await response.json();
      // if (data) {
      //   setUsers([data]);
      //   if (sanitizedQuery.length === 5) {
      //     setMessage('Busca por correspondência exata.');
      //   }
      // } else {
      //   setUsers([]);
      //   setMessage('Nenhum usuário encontrado.');
      // }
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setMessage('Erro ao buscar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const handleNovoResponsavelChange = useCallback((e) => {
    const formattedValue = formatIdentifier(e.target.value);
    setNovoResponsavel(formattedValue);

    // Remover os traços para a pesquisa
    const sanitizedValue = e.target.value.replace(/-/g, '');
    if (sanitizedValue.length === 5) {
      fetchUsers(sanitizedValue).then((results) => {
        setUsers(results); // Atualiza corretamente o estado `users`
        if (results.length === 0) {
          setMessage('Nenhum usuário encontrado.');
        } else {
          setMessage(''); // Limpar mensagem de erro se resultados forem encontrados
        }
      });
      } else {
      setUsers([]);
      setMessage('Digite 5 caracteres para buscar.');
    }
  }, [fetchUsers]);

  const handleNovoResponsavelBarracaChange = useCallback((e) => {
    const formattedValue = formatIdentifier(e.target.value);
    setNovoResponsavelBarraca(formattedValue);
  
    const sanitizedValue = e.target.value.replace(/-/g, '');
    if (sanitizedValue.length === 5) {
      fetchUsers(sanitizedValue).then((results) => {
        setUsersResponsaveisBarraca(results);
      });
    } else {
      setUsersResponsaveisBarraca([]);
      setMessageResponsaveisBarraca('Digite 5 caracteres para buscar.');
    }
  }, [fetchUsers]);
  
  const handleNovoFuncionarioBarracaChange = useCallback((e) => {
    const formattedValue = formatIdentifier(e.target.value);
    setNovoFuncionarioBarraca(formattedValue);
  
    const sanitizedValue = e.target.value.replace(/-/g, '');
    if (sanitizedValue.length === 5) {
      fetchUsers(sanitizedValue).then((results) => {
        setUsersFuncionariosBarraca(results);
      });
      } else {
      setUsersFuncionariosBarraca([]);
      setMessageFuncionariosBarraca('Digite 5 caracteres para buscar.');
    }
  }, [fetchUsers]);
  
  
  const debouncedFetchUsers = useCallback(
    debounce((query) => fetchUsers(query), 500, { leading: false, trailing: true }),
    []
  );
  
  const handleSearchInputChange = (event) => {
    const query = event.target.value.trim();
    setSearchTerm(query);
    if (query.length >= 4) {
      debouncedFetchUsers(query);
    } else {
      setUsers([]);
      setMessage('Digite pelo menos 4 caracteres para buscar.');
    }
  };

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
      barracas,
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

    // Validação adicional para barracas
    for (const barraca of barracas) {
      if (!barraca.nome || !barraca.descricao) {
        setErrors((prev) => ({
          ...prev,
          barracas: 'Todas as barracas devem ter nome e descrição.',
        }));
        return false;
      }
    }

  // Adiciona um organizador à lista
  const addOrganizer = (organizer) => {
    const exists = organizadoresAdicionais.some((o) => o._id === organizer._id);
    console.log('Organizadores Adicionais:', organizadoresAdicionais);
    if (!exists) {
      setOrganizadoresAdicionais((prev) => [...prev, organizer]);
    }
  };

  // Adicionar uma barraca
  const addBarraca = () => {
    setBarracas((prev) => [
      ...prev,
      {
        nome: '',
        descricao: '',
        responsaveis: [],
        funcionarios: [],
        pratos: [],
      },
    ]);
  };

  // Remover uma barraca
  const removeBarraca = (index) => {
    setBarracas((prev) => prev.filter((_, i) => i !== index));
  };

  // Atualizar informações da barraca
  const updateBarraca = (barracaIndex, field, value, pratoIndex = null) => {
    setBarracas((prev) => {
      const updated = [...prev];
      if (pratoIndex !== null && field.startsWith('pratos')) {
        // Atualizar um prato específico
        const pratoField = field.split('.')[1]; // Extraia o campo do prato, ex: "nome"
        updated[barracaIndex].pratos[pratoIndex][pratoField] = value;
      } else {
        // Atualizar um campo da barraca
        updated[barracaIndex][field] = value;
      }
      return updated;
    });
  };

  // Adicionar um prato
  const addPrato = (barracaIndex) => {
    setBarracas((prev) => {
      const updated = [...prev];
      updated[barracaIndex].pratos.push({
        nome: '',
        ingredientes: '',
        valor: 0,
        imagem: '',
        estoque: 0,
        status: 'Ativo',
        tempoPreparo: 0,
      });
      return updated;
    });
  };

  // Remover um prato
  const removePrato = (barracaIndex, pratoIndex) => {
    setBarracas((prev) => {
      const updated = [...prev];
      updated[barracaIndex].pratos = updated[barracaIndex].pratos.filter((_, i) => i !== pratoIndex);
      return updated;
    });
  };

  // Remove um organizador da lista
  const removeOrganizer = (organizerId) => {
    setOrganizadoresAdicionais((prev) => prev.filter((o) => o._id !== organizerId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = Cookies.get('authToken');
    // Construir a lista de organizadores
    const organizadores = [
      {
        nome: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        identifier: user.identifier,
        uid: user._id,
        status: 'Ativo',
      },
      ...organizadoresAdicionais.map((organizer) => ({
        nome: organizer.displayName,
        email: organizer.email,
        photoURL: organizer.photoURL,
        identifier: organizer.identifier,
        uid: organizer._id,
        status: 'Ativo',
      })),
    ];
    const event = {
      nome,
      descricao,
      data,
      endereco,
      dataEvento,
      barracas, 
      status,
      organizadores,
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
      <div className="bloco">
        <p>
          Nome do Responsável: {user.displayName}        
        </p>
        <p>
        <img
            src={user.photoURL || '/src/img/icones/userCracha.png'}
            alt="Responsável"
            className='imgResponsavel'
        />
          {formatIdentifier(user.identifier)}
        </p>
        <button
        type="button"
        onClick={toggleEditOrganizers}
        >
        Buscar usuários
      </button>
      {isEditingOrganizers && (
        <div>
          <label>
            Código Itentificador :
            <input
              type="text"
              value={novoResponsavel}
              placeholder='XX-XX-X'
              onChange={handleNovoResponsavelChange}
              className='codigoUsuario'
            />
          </label>
          {loading && <p>Carregando...</p>}
          {message && <p className="message">{message}</p>}
          <div className="search-results">
            {users.length > 0 ? (
                <ul>
                  {users.map((user) => (
                    <li key={user._id} className="user-card">
                      <div>
                        <img
                          src={user.photoURL || '../img/icones/userCracha.png'}
                          alt={user.displayName}
                          className="imgResponsavel"
                          />
                      </div>          
                      <div>
                        <strong>Nome:</strong> {user.displayName} <br />
                        <strong>Email:</strong> {user.email} <br />
                        <button
                          onClick={() => addOrganizer(user)}
                          type="button"
                        >
                          Adicionar Organizador
                        </button>
                      </div>
                  </li>
                  ))}
                </ul>
            ) : (
              <p>Nenhum usuário encontrado.</p>
            )}
          </div>
        </div>
      )}
      <h3>Organizadores Adicionais:</h3>
      <ul>
        {organizadoresAdicionais.map((organizer) => (
          <li key={organizer._id} className="organizer-card">
            <div>
              <img
                src={organizer.photoURL || '../img/icones/userCracha.png'}
                alt={organizer.displayName}
                className="imgOrganizadorAdicional"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            </div>
            <div>
              <strong>Nome:</strong> {organizer.displayName} <br />
              <button
                onClick={() => removeOrganizer(organizer._id)}
                type="button"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
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
        <hr />
        <div className="adicionarBarracas">
          <h2>Adicionar barracas</h2>
          <h2>Barracas</h2>
          {barracas.map((barraca, barracaIndex) => (
            <div key={barracaIndex} className="barraca">
              <h3>Barraca {barracaIndex + 1}</h3>
              <label>
                Nome da Barraca:
                <input
                  type="text"
                  value={barraca.nome || ''}
                  onChange={(e) => updateBarraca(barracaIndex, 'nome', e.target.value)}
                  required
                />
              </label>
              <label>
                Descrição da Barraca:
                <textarea
                  value={barraca.descricao || ''}
                  onChange={(e) => updateBarraca(barracaIndex, 'descricao', e.target.value)}
                  required
                />
              </label>
              <h4>Responsáveis Pela barraca</h4>
              {/* <button type="button" onClick={() => toggleEditOrganizersBarraca()}>Adicionar Responsável</button> */}
              <button
                type="button"
                onClick={() => toggleEditResponsaveisBarraca()}
                >
                Buscar usuários
              </button>
              {isEditingResponsaveisBarraca && (
                <div>
                  <label>
                    Código Itentificador :
                    <input
                      type="text"
                      value={novoResponsavelBarraca}
                      placeholder='XX-XX-X'
                      onChange={handleNovoResponsavelBarracaChange}
                      className='codigoUsuario'
                    />
                  </label>
                  {loadingResponsaveisBarraca && <p>Carregando...</p>}
                  {messageResponsaveisBarraca && <p className="message">{messageResponsaveisBarraca}</p>}
                  <div className="search-results">
                    {usersResponsaveisBarraca.length > 0 ? (
                        <ul>
                          {usersResponsaveisBarraca.map((user) => (
                            <li key={user._id} className="user-card">
                              <div>
                                <img
                                  src={user.photoURL || '../img/icones/userCracha.png'}
                                  alt={user.displayName}
                                  className="imgResponsavel"
                                  />
                              </div>          
                              <div>
                                <strong>Nome:</strong> {user.displayName} <br />
                                <strong>Email:</strong> {user.email} <br />
                                <button
                                  onClick={() => addResponsavelBarraca(user)}
                                  type="button"
                                >
                                  Adicionar Organizador Barraca
                                </button>
                              </div>
                          </li>
                          ))}
                        </ul>
                    ) : (
                      <p>Nenhum usuário encontrado.</p>
                    )}
                  </div>
                </div>
              )}
              <ul>
                {responsaveisBarraca.map((responsavel, index) => (
                  <li key={index}>
                    {responsavel.displayName} ({responsavel.email})
                    <button type="button" onClick={() => setResponsaveisBarraca((prev) =>
                      prev.filter((r) => r._id !== responsavel._id)
                    )}>
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <h4>Funcionários</h4>
              <button
                type="button"
                onClick={toggleEditFuncionariosBarraca}
                >
                Buscar usuários
              </button>
              {isEditingFuncionariosBarraca && (
                <div>
                  <label>
                    Código Itentificador :
                    <input
                      type="text"
                      value={novoFuncionarioBarraca}
                      placeholder='XX-XX-X'
                      onChange={handleNovoFuncionarioBarracaChange}
                      className='codigoUsuario'
                    />
                  </label>
                  {loadingFuncionariosBarraca && <p>Carregando...</p>}
                  {messageFuncionariosBarraca && <p className="message">{messageFuncionariosBarraca}</p>}
                  <div className="search-results">
                    {usersFuncionariosBarraca.length > 0 ? (
                        <ul>
                          {usersFuncionariosBarraca.map((user) => (
                            <li key={user._id} className="user-card">
                              <div>
                                <img
                                  src={user.photoURL || '../img/icones/userCracha.png'}
                                  alt={user.displayName}
                                  className="imgResponsavel"
                                  />
                              </div>          
                              <div>
                                <strong>Nome:</strong> {user.displayName} <br />
                                <strong>Email:</strong> {user.email} <br />
                                <button
                                  onClick={() => addFuncionarioBarraca(user)}
                                  type="button"
                                >
                                  Adicionar Funcionário Barraca
                                </button>
                              </div>
                          </li>
                          ))}
                        </ul>
                    ) : (
                      <p>Nenhum usuário encontrado.</p>
                    )}
                  </div>
                </div>
              )}              
              <ul>
                {funcionariosBarraca.map((funcionario, index) => (
                  <li key={index}>
                    {funcionario.displayName} ({funcionario.email})
                    <button type="button" onClick={
                      () => setFuncionariosBarraca((prev) =>
                        prev.filter((f) => f._id !== funcionario._id)
                      )}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <h4>Pratos</h4>
              {barraca.pratos.map((prato, pratoIndex) => (
                <div key={pratoIndex} className="prato">
                  <label>
                    Nome:
                    <input
                      type="text"
                      value={prato.nome || ''}
                      onChange={(e) => updateBarraca(barracaIndex, 'pratos.nome', e.target.value, pratoIndex)}
                      required
                    />
                  </label>
                  <label>
                    Ingredientes:
                    <textarea
                      value={prato.ingredientes || ''}
                      onChange={(e) => updateBarraca(barracaIndex, 'pratos.ingredientes', e.target.value, pratoIndex)}
                      required
                    />
                  </label>
                  <label>
                    Valor:
                    <input
                      type="number"
                      value={prato.valor || ''}
                      onChange={(e) => updateBarraca(barracaIndex, 'pratos.valor', e.target.value, pratoIndex)}
                      required
                    />
                  </label>
                  <label>
                    Estoque:
                    <input
                      type="number"
                      value={prato.estoque || ''}
                      onChange={(e) => updateBarraca(barracaIndex, 'pratos.estoque', e.target.value, pratoIndex)}
                      required
                    />
                  </label>
                  <label>
                    Tempo de Preparo:
                    <input
                      type="number"
                      value={prato.tempoPreparo || ''}
                      onChange={(e) => updateBarraca(barracaIndex, 'pratos.tempoPreparo', e.target.value, pratoIndex)}
                      required
                    />
                  </label>
                  <button type="button" onClick={() => removePrato(barracaIndex, pratoIndex)}>Remover Prato</button>
                </div>
              ))}
              <button type="button" onClick={() => addPrato(barracaIndex)}>Adicionar Prato</button>
              <button type="button" onClick={() => removeBarraca(barracaIndex)}>Remover Barraca</button>
            </div>
          ))}
          <button type="button" onClick={addBarraca}>Adicionar Barraca</button>
        </div>
        <hr />
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default EventForm;
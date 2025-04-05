import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserContext from '../contexts/UserContext';
import './CriarEventos.css';

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
    status: 'ativo'
  });
  const [dataEvento, setDataEvento] = useState([
    { dataAbertura: '', horaAbertura: '', dataFechamento: '', horaFechamento: '' }
  ]);

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
    setDataEvento([...dataEvento, { dataAbertura: '', horaAbertura: '', dataFechamento: '', horaFechamento: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('authToken');
    const event = {
      nome,
      descricao,
      data,
      endereco,
      dataEvento,
      status,
      organizadores: [{
        nome: user.displayName,
        uid: user._id
      }]
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

      await axios.post(`${apiUrl}/events`, event, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/eventos');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="event-form">
      <button className="back-button" onClick={() => navigate(-1)}>Voltar</button>
      <h1>Cadastre seu evento</h1>
      <p>Nome do Responsável: {user.displayName}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} maxLength="100" required />
        </label>
        <label>
          Descrição:
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} maxLength="2000" required />
        </label>
        <label>
          Data:
          <input type="datetime-local" value={data} onChange={(e) => setData(e.target.value)} required />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Pausado">Pausado</option>
            <option value="Apagado">Apagado</option>
          </select>
        </label>
        <hr />
        <h2>Endereço</h2>
        <label>
          Apelido:
          <input type="text" value={endereco.apelido} onChange={(e) => setEndereco({ ...endereco, apelido: e.target.value })} required />
        </label>
        <label>
          CEP:
          <input type="text" value={endereco.cep} onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })} />
        </label>
        <label>
          Logradouro:
          <input type="text" value={endereco.logradouro} onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })} required />
        </label>
        <label>
          Número:
          <input type="text" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} required />
        </label>
        <label>
          Complemento:
          <input type="text" value={endereco.complemento} onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })} />
        </label>
        <label>
          Bairro:
          <input type="text" value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} required />
        </label>
        <label>
          Cidade:
          <input type="text" value={endereco.cidade} onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })} required />
        </label>
        <label>
          Estado:
          <input type="text" value={endereco.estado} onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })} required />
        </label>
        <label>
          Ponto de Referência:
          <input type="text" value={endereco.pontoReferencia} onChange={(e) => setEndereco({ ...endereco, pontoReferencia: e.target.value })} />
        </label>
        <hr />
        <h2>Horário de Funcionamento</h2>
        {dataEvento.map((item, index) => (
          <div key={index} className="data-evento">
            <label>
              Data e Hora de Abertura:
              <input type="datetime-local" value={item.dataAbertura} onChange={(e) => handleDataEventoChange(index, 'dataAbertura', e.target.value)} required />
            </label>
            <label>
              Data e Hora de Fechamento:
              <input type="datetime-local" value={item.dataFechamento} onChange={(e) => handleDataEventoChange(index, 'dataFechamento', e.target.value)} required />
            </label>
          </div>
        ))}
        <button type="button" onClick={addDataEvento}>Adicionar outra data</button>
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default EventForm;
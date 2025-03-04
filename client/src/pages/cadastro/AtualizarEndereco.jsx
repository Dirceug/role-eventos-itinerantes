import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LabelInput from '../../components/LabelInput';
import ButtonGrande from '../../components/ButtonGrande';
import '../../App.css'
import '../Pages.css'


function AtualizarEndereco() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    tipo: 'Casa',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Implementar lógica para armazenar os dados do endereço no estado global ou contexto
    navigate('/cadastro/dadosbancarios');
  };

  return (
    <div className='paginaCadastro'>
      <h1>Atualizar Endereço</h1>
      <div className='cinquentaPorCento'>
      <LabelInput label="Endereço:" type="text" placeholder="Nome" value={address.tipo} onChange={(e) => setDisplayName(e.target.value)} />
      <LabelInput label="CEP:" type="text" placeholder="00.000-000" value={address.cep} onChange={(e) => setDisplayName(e.target.value)} />
      <LabelInput label="Rua:" type="text" placeholder="nome da rua ou avenida" value={address.rua} onChange={(e) => setDisplayName(e.target.value)} />
      <LabelInput label="Número:" type="text" placeholder="000" value={address.numero} onChange={(e) => setDisplayName(e.target.value)} />
      <LabelInput label="Complemento:" type="text" placeholder="Ap 12 Bloco 7" value={address.complemento} onChange={(e) => setDisplayName(e.target.value)} />
      <LabelInput label="Bairro:" type="text" placeholder="nome do bairro" value={address.bairro} onChange={(e) => setDisplayName(e.target.value)} />
      <LabelInput label="Cidade:" type="text" placeholder="Franca" value={address.cidade} onChange={(e) => setDisplayName(e.target.value)} />  
      <LabelInput label="Estado:" type="text" placeholder="São Paulo" value={address.estado} onChange={(e) => setDisplayName(e.target.value)} />  
      </div>
      <ButtonGrande onClick={handleNext} className='invertido'>
      Enviar Endereço
      </ButtonGrande>
    </div>
  );
}

export default AtualizarEndereco;
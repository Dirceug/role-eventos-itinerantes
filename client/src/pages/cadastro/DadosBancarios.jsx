import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LabelInput from '../../components/LabelInput';
import ButtonGrande from '../../components/ButtonGrande';
import '../../App.css'
import '../Pages.css'

function AtualizarDadosBancarios() {
  const navigate = useNavigate();
  const [banco, setBanco] = useState({
    numeroBanco: '',
    nomeBanco: '',
    tipoConta: '',
    numeroConta: '',
    digitoConta: '',
    numeroAgencia: '',
    digitoAgencia: '',
    chavePIX: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanco((prevBanco) => ({
      ...prevBanco,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Implementar lógica para armazenar os dados bancários no estado global ou contexto
    navigate('/cadastro/confirmacao');
  };

  return (
    <div className='paginaCadastro'>
      <h1>Registro de Dados Bancários</h1>
      <div className='cinquentaPorCento'>
        <LabelInput label="Número do Banco:" type="text" name="numeroBanco" placeholder="000" value={banco.numeroBanco} onChange={handleChange} />
        <LabelInput label="Nome do Banco:" type="text" name="nomeBanco" placeholder="Nome do Banco" value={banco.nomeBanco} onChange={handleChange} />
        <LabelInput label="Tipo de Conta:" type="text" name="tipoConta" placeholder="Corrente/Poupança" value={banco.tipoConta} onChange={handleChange} />
        <LabelInput label="Número da Conta:" type="text" name="numeroConta" placeholder="00000-0" value={banco.numeroConta} onChange={handleChange} />
        <LabelInput label="Dígito da Conta:" type="text" name="digitoConta" placeholder="0" value={banco.digitoConta} onChange={handleChange} />
        <LabelInput label="Número da Agência:" type="text" name="numeroAgencia" placeholder="0000" value={banco.numeroAgencia} onChange={handleChange} />
        <LabelInput label="Dígito da Agência:" type="text" name="digitoAgencia" placeholder="0" value={banco.digitoAgencia} onChange={handleChange} />
        <LabelInput label="Chave PIX:" type="text" name="chavePIX" placeholder="Chave PIX" value={banco.chavePIX} onChange={handleChange} />
      </div>
      <ButtonGrande onClick={handleNext} className='invertido'>
        Finalizar Cadastro
      </ButtonGrande>
    </div>
  );
}

export default AtualizarDadosBancarios;
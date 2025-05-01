import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LabelInput from '../../components/LabelInput';
import ButtonGrande from '../../components/buttons/ButtonGrande';
import Cookies from 'js-cookie'; // Importar a biblioteca de cookies
import '../../App.css';
import '../Pages.css';

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

  const handleNext = async () => {
    try {
      const token = Cookies.get('authToken'); // Obter o token de autenticação dos cookies
      const response = await fetch('${process.env.REACT_APP_API_URL}/users/updateBankDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Adicionar o token de autenticação ao cabeçalho da requisição
        },
        body: JSON.stringify(banco)
      });
      if (response.ok) {
        navigate('/cadastro/confirmacao');
      } else {
        console.error('Erro ao atualizar dados bancários');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados bancários:', error);
    }
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Atualizar Endereço</h1>
      <div>
        <label>
          Tipo:
          <input type="text" name="tipo" value={address.tipo} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          CEP:
          <input type="text" name="cep" value={address.cep} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Rua:
          <input type="text" name="rua" value={address.rua} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Número:
          <input type="text" name="numero" value={address.numero} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Complemento:
          <input type="text" name="complemento" value={address.complemento} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Bairro:
          <input type="text" name="bairro" value={address.bairro} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Cidade:
          <input type="text" name="cidade" value={address.cidade} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Estado:
          <input type="text" name="estado" value={address.estado} onChange={handleChange} />
        </label>
      </div>
      <button onClick={handleNext}>Próximo</button>
    </div>
  );
}

export default AtualizarEndereco;
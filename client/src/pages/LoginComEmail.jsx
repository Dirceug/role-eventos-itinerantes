import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGrande from '../components/ButtonGrande';
import './Pages.css'
import '../components/LoginComponent.css';  // Certifique-se de importar os estilos do LoginComponent
import LabelInput from '../components/LabelInput'



function AuthEmailPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        navigate('/events');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='paginaCadastro'>
      <h1 className='tituloLogin'>Login</h1>
      <div>
      <LabelInput label="E-mail: " type="text" placeholder="nome@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <LabelInput label="Senha: " type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {/*<div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>*/}
      <ButtonGrande onClick={handleEmailLogin} className="invertido">
      Login
      </ButtonGrande>
      <ButtonGrande onClick={() => navigate('/cadastro/registrarusuario')} className="invertido">
      Cadastrar Usuário
      </ButtonGrande>
    </div>
  );
}

export default AuthEmailPassword;
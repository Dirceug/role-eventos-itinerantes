import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGrande from '../components/ButtonGrande';
import './Pages.css'
import '../components/LoginComponent.css';  // Certifique-se de importar os estilos do LoginComponent


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
    <div className='paginaLogin'>
      <h1 className='tituloLogin'>Login</h1>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <ButtonGrande onClick={handleEmailLogin} className="social-button">
      Login
      </ButtonGrande>
      <button onClick={() => navigate('/cadastro/registrarusuario')} className="social-button">Cadastrar Usuário</button>
    </div>
  );
}

export default AuthEmailPassword;
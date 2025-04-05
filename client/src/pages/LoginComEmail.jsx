import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGrande from '../components/buttons/ButtonGrande';
import './Pages.css';
import '../pages/LoginComponent.css'; // Certifique-se de importar os estilos do LoginComponent
import LabelInput from '../components/LabelInput';
import Cookies from 'js-cookie'; // Importar a biblioteca de cookies
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function AuthEmailPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        Cookies.set('authToken', result.user.accessToken); // Definir o cookie de autenticação
        navigate('/usuarios');
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
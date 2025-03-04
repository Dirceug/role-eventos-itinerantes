import React from 'react';
import LoginComponent from '../components/LoginComponent'
import dancing from '../img/icones/dancing.png';

import './Pages.css'

function Login() {
  return (
    <div className='paginaLogin'>
      <img src={dancing} alt=""  className='dancing'/>
      <h1 className='role'>Rolê</h1>
      <LoginComponent />
      {/* Conteúdo do Login */}
    </div>
  );
}

export default Login;
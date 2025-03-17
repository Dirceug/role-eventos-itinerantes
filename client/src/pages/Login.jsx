import React, {lazy }from 'react';
import dancing from '../img/icones/dancing.png';
import './Pages.css'

const LoginComponent = lazy(() => import('../components/LoginComponent'))
//import LoginComponent from '../components/LoginComponent'

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
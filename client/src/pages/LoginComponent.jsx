import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import ButtonGrande from '../components/buttons/ButtonGrande';

function LoginComponent() {
  const navigate = useNavigate();

  const handleCognitoLogin = () => {
    console.log("Cognito Domain:", import.meta.env.VITE_COGNITO_DOMAIN);
    console.log("Cognito Client ID:", import.meta.env.VITE_COGNITO_CLIENT_ID);
    console.log("Redirect URI:", import.meta.env.VITE_COGNITO_REDIRECT_URI);
    // Redirecionar o usuário para o Cognito
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN; // Cognito domain (e.g., https://myapp.auth.us-east-1.amazoncognito.com)
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID; // Cognito App Client ID
    const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI; // URI configurado no Cognito

    const authUrl = `${cognitoDomain}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid email profile`;

    window.location.href = authUrl;
  };

  const navigateToSignup = () => {
    navigate('/logincomemail');
  };

  return (
    <div className="login">
      <ButtonGrande onClick={handleCognitoLogin} className="social-button">
        Entrar com Cognito
      </ButtonGrande>
      <ButtonGrande onClick={navigateToSignup} className="social-button">
        Entrar com e-mail
      </ButtonGrande>
    </div>
  );
}

export default LoginComponent;
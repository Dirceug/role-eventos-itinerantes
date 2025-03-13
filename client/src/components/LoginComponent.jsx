import React, { useContext } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie'; // Importar a biblioteca de cookies
import './LoginComponent.css';
import ButtonGrande from './ButtonGrande';

function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        console.log('User information:', user);

        const idToken = await user.getIdToken();

        // Armazenar o token no cookie
        Cookies.set('authToken', idToken);

        // Enviar requisição para salvar o usuário no backend
        console.log('Registering user with token:', idToken);
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            firebaseUid: user.uid,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous
          })
        });

        console.log('Response status:', response.status);
        const data = await response.json();

        if (response.ok) {
          console.log('User registered successfully:', data);
          setUser(user);  // Atualizar o contexto com os dados do usuário
          navigate('/usuarios');
        } else {
          console.error('Error saving user:', data);
        }
      })
      .catch((error) => {
        console.error('Error during Google login:', error);
      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const user = result.user;
        console.log('User information:', user);

        const idToken = await user.getIdToken();

        // Armazenar o token no cookie
        Cookies.set('authToken', idToken);

        console.log('Registering user with token:', idToken);
        setUser(user);  // Atualizar o contexto com os dados do usuário
        navigate('/usuarios');
      })
      .catch((error) => {
        console.error('Error during Facebook login:', error);
      });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;
        console.log('User information:', user);

        const idToken = await user.getIdToken();

        // Armazenar o token no cookie
        Cookies.set('authToken', idToken);

        console.log('Registering user with token:', idToken);
        setUser(user);  // Atualizar o contexto com os dados do usuário
        navigate('/events');
      })
      .catch((error) => {
        console.error('Error during email login:', error);
      });
  };

  const navigateToSignup = () => {
    navigate('/logincomemail');
  };

  return (
    <div className="login">
      <ButtonGrande onClick={handleGoogleLogin} className="social-button">
        Entrar com Google
      </ButtonGrande>
      <ButtonGrande onClick={handleFacebookLogin} className="social-button">
        Entrar com Facebook
      </ButtonGrande>
      <ButtonGrande onClick={navigateToSignup} className="social-button">
        Entrar com e-mail
      </ButtonGrande>
    </div>
  );
}

export default LoginComponent;
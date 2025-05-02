import React, { useContext } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';
import './LoginComponent.css';
import ButtonGrande from '../components/buttons/ButtonGrande';

function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleGoogleLogin = async () => {
    console.log('Iniciando login com Google...');
    try {
      // Inicia o login com o Firebase Auth
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Usuário autenticado com Google:', user);

      // Obter o token JWT do usuário autenticado
      const idToken = await user.getIdToken();
      console.log('Token JWT obtido:', idToken);
      Cookies.set('authToken', idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

      // Registrar o usuário no backend
      const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
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

      const data = await response.json();

      if (response.ok) {
        console.log('Usuário registrado no backend:', data);
        setUser(data);
        navigate('/usuarios');
      } else {
        console.error('Erro ao salvar usuário no backend:', data);
      }
    } catch (error) {
      console.error('Erro durante login com Google:', error);
    }
  };

  const handleFacebookLogin = async () => {
    console.log('Iniciando login com Facebook...');
    try {
      // Inicia o login com o Firebase Auth
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log('Usuário autenticado com Facebook:', user);

      // Obter o token JWT do usuário autenticado
      const idToken = await user.getIdToken();
      console.log('Token JWT obtido:', idToken);
      Cookies.set('authToken', idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

      // Registrar o usuário no backend
      const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
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

      const data = await response.json();

      if (response.ok) {
        console.log('Usuário registrado no backend:', data);
        setUser(data);
        navigate('/usuarios');
      } else {
        console.error('Erro ao salvar usuário no backend:', data);
      }
    } catch (error) {
      console.error('Erro durante login com Facebook:', error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log('Iniciando login com e-mail...');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log('Usuário autenticado com e-mail:', user);

      const idToken = await user.getIdToken();
      console.log('Token JWT obtido:', idToken);
      Cookies.set('authToken', idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

      // Registrar o usuário no backend
      const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
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

      const data = await response.json();

      if (response.ok) {
        console.log('Usuário registrado no backend:', data);
        setUser(data);
        navigate('/events');
      } else {
        console.error('Erro ao salvar usuário no backend:', data);
      }
    } catch (error) {
      console.error('Erro durante login com e-mail:', error);
    }
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
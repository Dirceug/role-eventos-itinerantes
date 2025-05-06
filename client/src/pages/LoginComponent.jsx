import React, { useContext } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';
import './LoginComponent.css';
import ButtonGrande from '../components/buttons/ButtonGrande';

// Funções auxiliares para salvar e recuperar tokens
const saveToken = (token) => {
  sessionStorage.setItem('authToken', token);
  localStorage.setItem('authToken', token);
  Cookies.set('authToken', token, { secure: true, sameSite: 'Strict' });
  //console.log('Token salvo em sessionStorage, localStorage e Cookies.');
};

const getToken = () => {
  let token = sessionStorage.getItem('authToken');
  if (!token) {
    token = localStorage.getItem('authToken');
    //console.log('Token recuperado do localStorage.');
  } else {
    //console.log('Token recuperado do sessionStorage.');
  }
  return token;
};

function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleGoogleLogin = async () => {
    //console.log('Iniciando login com Google...');
    let popupMonitor = null;
    try {
      // Inicia o monitoramento do estado do popup
      popupMonitor = setInterval(() => {
        if (!auth.currentUser) {
          console.warn('O popup pode ter sido fechado antes de concluir o login.');
        }
      }, 1000); // Verifica a cada 1 segundo
  
      // Inicia o login com o Firebase Auth
      const result = await signInWithPopup(auth, googleProvider);
      //console.log('Popup aberto com sucesso.');
      const user = result.user;
      //console.log('Usuário autenticado com Google:', user);

      const idToken = await user.getIdToken();
      //console.log('Token JWT obtido:', idToken);
      saveToken(idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

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
        //console.log('Usuário registrado no backend:', data);
        setUser(data);
        navigate('/usuarios');
      } else {
        console.error('Erro ao salvar usuário no backend:', data);
      }
    } catch (error) {
      if (popupMonitor) clearInterval(popupMonitor); // Para o monitoramento em caso de erro
      console.error('Erro durante login com Google:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        console.warn('O popup foi fechado pelo usuário antes de concluir o login.');
      } else {
        console.error('Erro inesperado durante login com Google:', error);
      }
    }
  };

  const handleFacebookLogin = async () => {
    //console.log('Iniciando login com Facebook...');
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      //console.log('Usuário autenticado com Facebook:', user);

      const idToken = await user.getIdToken();
      //console.log('Token JWT obtido:', idToken);
      saveToken(idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

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
        //console.log('Usuário registrado no backend:', data);
        setUser(data);
        navigate('/usuarios');
      } else {
        console.error('Erro ao salvar usuário no backend:', data);
      }
    } catch (error) {
      console.error('Erro durante login com Facebook:', error);

      if (error.message.includes('Cross-Origin-Opener-Policy')) {
        console.error('Erro relacionado à política COOP/COEP. Verifique as configurações do servidor.');
      }
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //console.log('Iniciando login com e-mail...');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      //console.log('Usuário autenticado com e-mail:', user);

      const idToken = await user.getIdToken();
      //console.log('Token JWT obtido:', idToken);
      saveToken(idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined');
        return;
      }

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
        //console.log('Usuário registrado no backend:', data);
        setUser(data);
        navigate('/events');
      } else {
        console.error('Erro ao salvar usuário no backend:', data);
      }
    } catch (error) {
      console.error('Erro durante login com e-mail:', error);

      if (error.message.includes('Cross-Origin-Opener-Policy')) {
        console.error('Erro relacionado à política COOP/COEP. Verifique as configurações do servidor.');
      }
    }
  };

  const navigateToSignup = () => {
    navigate('/logincomemail');
  };

  return (
    <div className="login">
      {/* <ButtonGrande onClick={handleGoogleLogin} className="social-button">
        Entrar com Google (em desenvolvimento)
      </ButtonGrande>
      <ButtonGrande onClick={handleFacebookLogin} className="social-button">
        Entrar com Facebook (em des)
      </ButtonGrande> */}
      <ButtonGrande className="social-button">
        Entrar com Google (em desenvolvimento)
      </ButtonGrande>
      <ButtonGrande className="social-button">
        Entrar com Facebook (em desenvolvimento)
      </ButtonGrande>
      <ButtonGrande onClick={navigateToSignup} className="social-button">
        Entrar com e-mail
      </ButtonGrande>
    </div>
  );
}

export default LoginComponent;
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

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken();
        Cookies.set('authToken', idToken);

        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          console.error('API URL is not defined');
          return;
        }

        let response = await fetch(`${apiUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });
        const userData = await response.json();
        console.log(userData);

        response = await fetch(`${apiUrl}/users/register`, {
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
          setUser(data);
          navigate('/usuarios');
        } else {
          console.error('Error saving user:', data);
        }
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          console.warn('O usuário fechou o pop-up de login.');
          setErrorMessage('O pop-up de login foi fechado. Tente novamente.');
        } else {
          console.error('Erro durante o login com Google:', error);
          setErrorMessage('Erro ao tentar fazer login com o Google. Tente novamente mais tarde.');
        }      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken();
        Cookies.set('authToken', idToken);
        setUser(user);
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
        const idToken = await user.getIdToken();
        Cookies.set('authToken', idToken);
        setUser(user);
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
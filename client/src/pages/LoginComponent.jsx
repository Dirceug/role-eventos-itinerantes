import React, { useContext } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';
import './LoginComponent.css';
import ButtonGrande from '../components/buttons/ButtonGrande';

function LoginComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('Google login successful. Firebase user:', user);

      const idToken = await user.getIdToken();
      Cookies.set('authToken', idToken);

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.error('API URL is not defined in environment variables.');
        return;
      }

      // Fetch user data from the API
      try {
        const response = await fetch(`${apiUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch user data:', {
            status: response.status,
            statusText: response.statusText,
            body: await response.text(),
          });
          return;
        }

        const userData = await response.json();
        console.log('Fetched user data:', userData);

        // Register user in the database
        const registerResponse = await fetch(`${apiUrl}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            firebaseUid: user.uid,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
          }),
        });

        if (!registerResponse.ok) {
          console.error('Failed to register user:', {
            status: registerResponse.status,
            statusText: registerResponse.statusText,
            body: await registerResponse.text(),
          });
          return;
        }

        const registerData = await registerResponse.json();
        console.log('User registered successfully:', registerData);

        setUser(registerData);
        navigate('/usuarios');
      } catch (apiError) {
        console.error('Error during API calls:', apiError);
      }
    } catch (error) {
      console.error('Error during Google login:', {
        code: error.code,
        message: error.message,
        fullError: error,
      });

      if (error.code === 'auth/popup-closed-by-user') {
        console.warn('The user closed the login pop-up before completing the process.');
        alert('Pop-up de login foi fechado. Tente novamente.');
      } else {
        alert('Erro ao tentar fazer login com o Google. Tente novamente mais tarde.');
      }
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      console.log('Facebook login successful. Firebase user:', user);

      const idToken = await user.getIdToken();
      Cookies.set('authToken', idToken);

      setUser(user);
      navigate('/usuarios');
    } catch (error) {
      console.error('Error during Facebook login:', {
        code: error.code,
        message: error.message,
        fullError: error,
      });

      alert('Erro ao tentar fazer login com o Facebook. Tente novamente mais tarde.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      console.log('Email login successful. Firebase user:', user);

      const idToken = await user.getIdToken();
      Cookies.set('authToken', idToken);

      setUser(user);
      navigate('/events');
    } catch (error) {
      console.error('Error during email login:', {
        code: error.code,
        message: error.message,
        fullError: error,
      });

      alert('Erro ao tentar fazer login com e-mail. Tente novamente mais tarde.');
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
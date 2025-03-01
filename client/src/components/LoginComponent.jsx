import React from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import googleIcon from '../img/icones/google.png';
import facebookIcon from '../img/icones/facebook.png';

function LoginComponent() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        navigate('/usuarios');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result.user);
        navigate('/usuarios');
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login">
      <button onClick={handleGoogleLogin} className="social-button">
        Entrar com Google
      </button>
      <button onClick={handleFacebookLogin} className="social-button">
        Entrar com Facebook
      </button>
      {/*<form onSubmit={handleEmailLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login com e-mail</button>
      </form>*/}
        <button onClick={navigateToSignup} className="social-button">Entrar com e-mail</button>
    </div>
  );
}

export default LoginComponent;
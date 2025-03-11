import React from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importar a biblioteca de cookies
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log(result.user);
        const idToken = await result.user.getIdToken();
        Cookies.set('authToken', idToken); // Armazenar o token no cookie
        navigate('/events');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
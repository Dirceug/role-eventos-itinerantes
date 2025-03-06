import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import './Navbar.css';

function Navbar() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      console.log('User in Navbar:', user);
      if (user.photoURL) {
        console.log('User photoURL:', user.photoURL);
      } else {
        console.log('User does not have a photoURL');
      }
    } else {
      console.log('No user logged in');
    }
  }, [user]);

  return (
    <nav className="navbar">
      <h1>Role Eventos Itinerantes</h1>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/events">Events</Link></li>
      </ul>
      {user && user.photoURL && (
        <img src={user.photoURL} alt={user.displayName} className="navbar-user-photo"/>
      )}
    </nav>
  );
}

export default Navbar;
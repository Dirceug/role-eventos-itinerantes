import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './ProtectedRoute.css';

function ProtectedRoute({ children }) {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="protected-route">
      {children}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default ProtectedRoute;
import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CoracaoPreenchido from '../../img/icones/coracaoPreenchido.png';
import CoracaoVazado from '../../img/icones/coracaoVazado.png';
import './CurtidasButton.css';
import UserContext from '../../contexts/UserContext';

const CurtidasButton = ({ eventId, initialLikesCount }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const checkLikedStatus = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/curtidas?eventoId=${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const userLiked = data.some(curtida => curtida.usuarioId.firebaseUid === user.firebaseUid);
          setLiked(userLiked);
          setLikesCount(data.length);
        } else {
          console.error('Error checking liked status:', response.statusText);
        }
      } catch (error) {
        console.error('Error checking liked status:', error);
      }
    };

    checkLikedStatus();
  }, [eventId, user.firebaseUid]);

  const handleLikeClick = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert('Você precisa estar logado para curtir um evento.');
      navigate('/login');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/curtidas`, {
        method: liked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventoId: eventId })
      });

      if (response.ok) {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      } else {
        console.error('Error updating like status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <button onClick={handleLikeClick} className="like-button no-hover">
      <img src={liked ? CoracaoPreenchido : CoracaoVazado} alt="Like" />
      {likesCount}
    </button>
  );
};

export default CurtidasButton;
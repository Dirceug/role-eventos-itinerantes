import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const showToast = (message) => {
    toast(message);
  };

  const showAlert = (message) => {
    alert(message); // Pode ser substituído por uma implementação mais sofisticada
  };

  const showVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const notify = (message, type) => {
    showToast(message);
    if (type === 'purchase') {
      showAlert(message);
      showVibration();
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};
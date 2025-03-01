import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import Servico from './pages/Servico';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios/*" element={<Usuarios />} />
        <Route path="/servico/*" element={<Servico />} />
      </Routes>
    </Router>
  );
}

export default App;
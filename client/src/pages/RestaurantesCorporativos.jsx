import React, { lazy, Suspense } from 'react';
import './Emconstrucao.css';

const Navbar = lazy(() => import('../components/layout/Navbar'));

const RestaurantesComportativos = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Navbar />
      <div className="construction-container">
        <h1>Em construção</h1>
      </div>
    </Suspense>
  );
};

export default RestaurantesComportativos;
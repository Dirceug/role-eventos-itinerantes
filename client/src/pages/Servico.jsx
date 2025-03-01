import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProducaoAcompanhamento from '../components/usuarios/ProducaoAcompanhamento';
import ControleVendasFluxoFinanceiro from '../components/usuarios/ControleVendasFluxo';

function Servico() {
  return (
    <div>
      <nav>
        <Link to="producao-acompanhamento">Produção e Acompanhamento</Link>
        <Link to="controle-vendas-fluxo-financeiro">Controle de Vendas e Fluxo Financeiro</Link>
      </nav>
      <Routes>
        <Route path="producao-acompanhamento" element={<ProducaoAcompanhamento />} />
        <Route path="controle-vendas-fluxo-financeiro" element={<ControleVendasFluxoFinanceiro />} />
      </Routes>
    </div>
  );
}

export default Servico;
/*
  Projeto: Cálculo de Valor a Receber na Rescisão/Despedimento
  Autor: Júlio César Rodrigues
  Website: https://julio-cr.pt/
  Github: https://github.com/julioz07
  Data: 2025-05-19
  Descrição: Ferramenta React para cálculo justo e transparente dos valores a receber em caso de rescisão voluntária ou despedimento, conforme a legislação portuguesa. Inclui geração de carta de despedimento, base legal, links úteis e aviso de natureza indicativa dos cálculos.
  Licença: MIT
*/

import { Routes, Route, Link, useLocation } from 'react-router-dom';
// Importar as páginas (a criar)
import CalculoRescisaoVoluntaria from './pages/CalculoRescisaoVoluntaria';
import CalculoDespedimentoEmpregador from './pages/CalculoDespedimentoEmpregador';
import GerarCartaDespedimento from './pages/GerarCartaDespedimento';
import './index.css';

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 font-sans">
      <nav className="bg-white/90 shadow-lg mb-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
            {/* Ícone de contrato */}
            <span className="hidden sm:inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-blue-600">
                <rect x="4" y="2" width="16" height="20" rx="2" fill="#3B82F6"/>
                <rect x="7" y="6" width="10" height="2" rx="1" fill="#fff"/>
                <rect x="7" y="10" width="10" height="2" rx="1" fill="#fff"/>
                <rect x="7" y="14" width="7" height="2" rx="1" fill="#fff"/>
                <rect x="7" y="18" width="4" height="2" rx="1" fill="#fff"/>
              </svg>
            </span>
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Cálculo - Rescisão Voluntária
            </Link>
            <Link 
              to="/despedimento" 
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                location.pathname === '/despedimento' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Cálculo - Despedimento
            </Link>
            <Link 
              to="/carta" 
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                location.pathname === '/carta' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Gerar Carta de Rescisão
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-0 pb-10">
        <Routes>
          <Route path="/" element={<CalculoRescisaoVoluntaria />} />
          <Route path="/despedimento" element={<CalculoDespedimentoEmpregador />} />
          <Route path="/carta" element={<GerarCartaDespedimento />} />
        </Routes>
      </main>
      <footer className="w-full text-center py-4 bg-white/80 mt-8 text-gray-700 text-sm">
        <span className="inline-block align-middle mr-1">©</span>Todos os direitos reservado a Júlio César Rodrigues -
        <span className="text-blue-700 font-semibold ml-1">Feito com dedicação para qualquer um que precise desta ajuda</span>
        {' '} - <a href="https://julio-cr.pt/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 ml-1">dev website</a>
      </footer>
    </div>
  );
}

export default App;

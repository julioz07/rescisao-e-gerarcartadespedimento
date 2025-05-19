/*
  Projeto: Cálculo de Valor a Receber na Rescisão/Despedimento
  Autor: Júlio César Rodrigues
  Website: https://julio-cr.pt/
  Github: https://github.com/julioz07
  Data: 2025-05-19
  Descrição: Página para cálculo do valor a receber em caso de despedimento pelo empregador, conforme legislação portuguesa. Inclui todos os direitos legais, aviso indicativo e links úteis.
  Licença: MIT
*/

import { useState } from 'react';

export default function CalculoDespedimentoEmpregador() {
  const [form, setForm] = useState({
    nome: '',
    dataAdmissao: '',
    dataSaida: '',
    salario: '',
    subsidioAlimentacao: '',
    diasFerias: '',
    subsidioFerias: 'sim',
    subsidioNatal: 'sim',
    ultimoMesPago: 'sim',
    tipoDespedimento: 'coletivo',
    avisoPrevio: 'sim',
    horasFormacao: '0',
    formacaoRecebida: 'sim',
    horasFormacaoRecebidas: '',
    turnosOuFolgas: 'nao',
    diasTrabalhadosTurnos: '',
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  }

  function validarDatas() {
    const admissao = new Date(form.dataAdmissao);
    const saida = new Date(form.dataSaida);
    const hoje = new Date();
    
    if (admissao > saida) {
      setErrors(prev => ({ ...prev, dataSaida: 'A data de saída deve ser posterior à data de admissão' }));
      return false;
    }
    if (saida > hoje) {
      setErrors(prev => ({ ...prev, dataSaida: 'A data de saída não pode ser futura' }));
      return false;
    }
    return true;
  }

  function calcular(e) {
    e.preventDefault();
    setErrors({});
    if (!validarDatas()) return;
    const admissao = new Date(form.dataAdmissao);
    const saida = new Date(form.dataSaida);
    const diff = saida - admissao;
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const anos = Math.floor(dias / 365.25);
    const meses = Math.floor((dias % 365.25) / 30.44);
    const salario = parseFloat(form.salario.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const subsidioAlimentacao = parseFloat(form.subsidioAlimentacao.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const diasFerias = parseInt(form.diasFerias) || 0;
    const horasFormacao = parseInt(form.horasFormacao) || 0;

    // Dias trabalhados no ano da saída
    let diasAno = 0;
    if (form.dataSaida) {
      const anoSaida = new Date(form.dataSaida).getFullYear();
      const inicioAno = new Date(`${anoSaida}-01-01`);
      const dataAdmissao = new Date(form.dataAdmissao);
      const dataInicio = dataAdmissao > inicioAno ? dataAdmissao : inicioAno;
      const dataSaida = new Date(form.dataSaida);
      diasAno = Math.ceil((dataSaida - dataInicio) / (1000 * 60 * 60 * 24)) + 1;
    }
    // Subsídio de férias proporcional (dias trabalhados/365)
    const propFerias = form.subsidioFerias === 'sim' ? salario * (diasAno / 365) : 0;
    // Subsídio de Natal proporcional (dias trabalhados/365)
    const propNatal = form.subsidioNatal === 'sim' ? salario * (diasAno / 365) : 0;
    
    // Férias não gozadas
    const valorFeriasNaoGozadas = (salario / 22) * diasFerias;
    
    // Indemnização por despedimento
    let indemnizacao = 0;
    if (["coletivo", "extincao", "semjusta"].includes(form.tipoDespedimento)) {
      indemnizacao = anos * salario * 0.66;
    }

    // Cálculo do valor das horas de formação não dadas
    let horasRecebidas = 0;
    if (form.formacaoRecebida === 'sim') {
      horasRecebidas = parseInt(form.horasFormacaoRecebidas) || 0;
    }
    const horasEmFalta = Math.max(40 - horasRecebidas, 0);
    const valorHora = salario / 160;
    const valorFormacao = valorHora * horasEmFalta;

    // Dias de subsídio de alimentação no mês da saída
    let diasUteisMesSaida = 0;
    if (form.dataSaida) {
      const dataSaida = new Date(form.dataSaida);
      const ano = dataSaida.getFullYear();
      const mes = dataSaida.getMonth();
      const diaSaida = dataSaida.getDate();
      for (let d = 1; d <= diaSaida; d++) {
        const data = new Date(ano, mes, d);
        const diaSemana = data.getDay();
        if (diaSemana !== 0 && diaSemana !== 6) diasUteisMesSaida++;
      }
    }
    // Se trabalha por turnos/folgas rotativas e preencheu dias, usar esse valor
    let diasParaSubsidio = diasUteisMesSaida;
    if (form.turnosOuFolgas === 'sim' && form.diasTrabalhadosTurnos) {
      diasParaSubsidio = parseInt(form.diasTrabalhadosTurnos) || 0;
    }
    // Total estimado a receber
    const total = salario + propFerias + propNatal + valorFeriasNaoGozadas + 
                 (subsidioAlimentacao * diasParaSubsidio) + indemnizacao + valorFormacao;
    setResult({
      salario,
      propFerias,
      propNatal,
      valorFeriasNaoGozadas,
      indemnizacao,
      valorFormacao,
      horasEmFalta,
      diasUteisMesSaida,
      diasParaSubsidio,
      subsidioAlimentacao,
      total,
      anos,
      meses,
      dias,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'salario' || name === 'subsidioAlimentacao') {
      formattedValue = value.replace(/[^\d,]/g, '');
      const parts = formattedValue.split(',');
      if (parts.length > 2) {
        formattedValue = parts[0] + ',' + parts.slice(1).join('');
      }
    }

    setForm(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-8 min-w-[380px] max-w-3xl mx-auto border border-blue-300 backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Cálculo - Despedimento pelo Empregador</h2>
      <form onSubmit={calcular} className="grid gap-5">
        <div>
          <input 
            name="nome" 
            value={form.nome} 
            onChange={handleChange} 
            className={`input ${errors.nome ? 'border-red-500' : ''}`} 
            placeholder="Nome" 
            required 
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-blue-600 font-semibold mb-1" htmlFor="dataAdmissao">Data de admissão</label>
            <input type="date" id="dataAdmissao" name="dataAdmissao" value={form.dataAdmissao} onChange={handleChange} className={`input w-full ${errors.dataAdmissao ? 'border-red-500' : ''}`} required />
            {errors.dataAdmissao && <p className="text-red-500 text-sm mt-1">{errors.dataAdmissao}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-blue-600 font-semibold mb-1" htmlFor="dataSaida">Data de saída</label>
            <input type="date" id="dataSaida" name="dataSaida" value={form.dataSaida} onChange={handleChange} className={`input w-full ${errors.dataSaida ? 'border-red-500' : ''}`} required />
            {errors.dataSaida && <p className="text-red-500 text-sm mt-1">{errors.dataSaida}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            name="salario" 
            value={form.salario} 
            onChange={handleChange} 
            className="input flex-1" 
            placeholder="Salário base mensal (€)" 
            required 
          />
          <input 
            type="text" 
            name="subsidioAlimentacao" 
            value={form.subsidioAlimentacao} 
            onChange={handleChange} 
            className="input flex-1" 
            placeholder="Subsídio de alimentação diário (€)" 
            required 
          />
        </div>

        <input 
          type="number" 
          name="diasFerias" 
          value={form.diasFerias} 
          onChange={handleChange} 
          className="input" 
          placeholder="Dias de férias não gozadas" 
          required 
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 flex-1">
            <span className="text-blue-600">Irá receber o subsídio de férias proporcional?</span>
            <select name="subsidioFerias" value={form.subsidioFerias} onChange={handleChange} className="input">
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </label>
          <label className="flex items-center gap-2 flex-1">
            <span className="text-blue-600">Irá receber o subsídio de Natal proporcional?</span>
            <select name="subsidioNatal" value={form.subsidioNatal} onChange={handleChange} className="input">
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </label>
          <label className="flex items-center gap-2 flex-1">
            <span className="text-blue-600">Tem salário do último mês por receber?</span>
            <select name="ultimoMesPago" value={form.ultimoMesPago} onChange={handleChange} className="input">
              <option value="nao">Sim</option>
              <option value="sim">Não</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 flex-1"><span className="text-blue-600">Recebeu horas de formação este ano?</span>
            <select name="formacaoRecebida" value={form.formacaoRecebida} onChange={handleChange} className="input"><option value="sim">Sim</option><option value="nao">Não</option></select>
          </label>
          {form.formacaoRecebida === 'sim' && (
            <input type="number" name="horasFormacaoRecebidas" value={form.horasFormacaoRecebidas} onChange={handleChange} className="input flex-1" placeholder="Quantas horas de formação recebeu este ano?" min="0" max="40" required />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Campo para turnos/folgas rotativas */}
          <label className="flex items-center gap-2 flex-1">
            <span className="text-blue-600">Trabalha por turnos/folgas rotativas?</span>
            <select name="turnosOuFolgas" value={form.turnosOuFolgas} onChange={handleChange} className="input">
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </label>
          {form.turnosOuFolgas === 'sim' && (
            <input
              type="number"
              name="diasTrabalhadosTurnos"
              value={form.diasTrabalhadosTurnos}
              onChange={handleChange}
              className="input flex-1"
              placeholder="Dias trabalhados até à saída"
              min="0"
              required
            />
          )}
        </div>

        <button type="submit" className="bg-gradient-btn text-white rounded-lg px-6 py-2 font-bold shadow hover:scale-105 transition">
          Calcular
        </button>
      </form>

      {result && (
        <div className="mt-8 grid gap-4 relative">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
            <div className="font-bold text-blue-600">Tempo de trabalho:</div>
            <div className="text-blue-800">{result.anos} anos, {result.meses} meses ({result.dias} dias)</div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
            <div className="font-bold text-blue-600">Salário base:</div>
            <div className="text-blue-800">{formatarMoeda(result.salario)}</div>
          </div>
          {result.propFerias > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
              <div className="font-bold text-blue-600">Subsídio de férias proporcional:</div>
              <div className="text-blue-800">{formatarMoeda(result.propFerias)}</div>
            </div>
          )}
          {result.propNatal > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
              <div className="font-bold text-blue-600">Subsídio de Natal proporcional:</div>
              <div className="text-blue-800">{formatarMoeda(result.propNatal)}</div>
            </div>
          )}
          {result.valorFeriasNaoGozadas > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
              <div className="font-bold text-blue-600">Férias não gozadas:</div>
              <div className="text-blue-800">{formatarMoeda(result.valorFeriasNaoGozadas)}</div>
            </div>
          )}
          {result.indemnizacao > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
              <div className="font-bold text-blue-600">Indemnização:</div>
              <div className="text-blue-800">{formatarMoeda(result.indemnizacao)}</div>
            </div>
          )}
          {result.valorFormacao > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
              <div className="font-bold text-blue-600">Valor das horas de formação não dadas ({result.horasEmFalta}h):</div>
              <div className="text-blue-800">{formatarMoeda(result.valorFormacao)}</div>
            </div>
          )}
          {result && result.subsidioAlimentacao > 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 shadow flex flex-col sm:flex-row justify-between items-center">
              <div className="font-bold text-blue-600">Subsídio de alimentação ({result.diasParaSubsidio} dias no mês da saída):</div>
              <div className="text-blue-800">{(result.subsidioAlimentacao * result.diasParaSubsidio).toFixed(2)} €</div>
            </div>
          )}
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4 shadow font-bold text-lg text-green-800 flex flex-col sm:flex-row justify-between items-center">
            <span>Total estimado a receber:</span>
            <span className="flex items-center gap-2 text-green-800">
              {formatarMoeda(result.total)}
            </span>
          </div>
        </div>
      )}

      {/* Secção de links úteis e leis */}
      <div className="mt-10">
        <details className="bg-blue-50 rounded-lg shadow p-4 cursor-pointer group transition-all duration-200">
          <summary className="font-bold text-blue-700 text-lg cursor-pointer group-open:text-blue-900 transition">Base legal e links úteis</summary>
          <div className="mt-3 space-y-2 text-blue-900">
            <div>
              <span className="font-semibold">Cálculos baseados em:</span>
              <ul className="list-disc ml-6 mt-1 text-sm">
                <li>Artigos 129.º a 143.º do <a href="https://dre.pt/dre/detalhe/lei/7-2009-484818" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">Código do Trabalho</a> (Lei n.º 7/2009)</li>
                <li>Artigo 131.º: Direito a 40 horas de formação anual</li>
                <li>Artigo 237.º: Férias e subsídios</li>
                <li>Artigo 366.º: Compensação por cessação do contrato</li>
              </ul>
            </div>
            <div className="mt-3">
              <span className="font-semibold">Links úteis:</span>
              <ul className="list-disc ml-6 mt-1 text-sm">
                <li><a href="https://www.act.gov.pt/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">Autoridade para as Condições do Trabalho (ACT)</a></li>
                <li><a href="https://www.cite.gov.pt/pt/acite/faq/faq_cessacao.html" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">FAQ sobre Cessação do Contrato de Trabalho (CITE)</a></li>
                <li><a href="https://www.seg-social.pt/cessacao-do-contrato-de-trabalho" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">Segurança Social - Cessação do Contrato</a></li>
                <li><a href="https://www.sindicatos.pt/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">Organização Sindical (Sindicatos)</a></li>
              </ul>
            </div>
          </div>
        </details>
      </div>

      {/* Ícone de aviso fixo no canto inferior direito */}
      <div className="fixed z-40 bottom-6 right-6 group">
        <button
          type="button"
          aria-label="Aviso: cálculos indicativos"
          className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" fill="#facc15"/>
            <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
        </button>
        <div className="hidden group-hover:block group-focus:block absolute right-0 bottom-16 w-80 bg-white border border-yellow-400 text-yellow-900 rounded-lg shadow-xl p-4 text-sm font-medium transition z-50">
          <strong>Aviso importante:</strong><br/>
          Os cálculos apresentados são meramente indicativos, baseados na legislação em vigor, e podem não refletir todas as particularidades do seu caso. Fatores como acordos coletivos, contratos individuais, situações específicas ou alterações legais podem influenciar o valor final. Em caso de dúvida, consulte sempre um contabilista, advogado ou as entidades oficiais de apoio aos trabalhadores (ACT, Segurança Social, CITE).
        </div>
      </div>
    </div>
  );
}
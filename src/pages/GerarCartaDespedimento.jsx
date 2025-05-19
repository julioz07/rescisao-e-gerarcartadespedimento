/*
  Projeto: Cálculo de Valor a Receber na Rescisão/Despedimento
  Autor: Júlio César Rodrigues
  Website: https://julio-cr.pt/
  Github: https://github.com/julioz07
  Data: 2025-05-19
  Descrição: Página para geração de carta de despedimento personalizada, pronta para exportação em PDF. Inclui campos dinâmicos, pedido de apuramento de contas e base legal.
  Licença: MIT
*/

import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function GerarCartaDespedimento() {
  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    empresa: '',
    dataInicio: '',
    dataSaida: '',
    motivo: '',
    tipoCarta: 'empregador',
    avisoPrevio: 'sim',
    periodoAviso: '30',
    incluirPedidoValores: true,
  });
  const [showPreview, setShowPreview] = useState(false);
  const cartaRef = useRef();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowPreview(true);
  }

  async function downloadPDF() {
    const element = cartaRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('CartaDespedimento.pdf');
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-accent backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Gerar Carta de Despedimento</h2>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-3">
          <label className="text-primary font-semibold">Tipo de Carta:</label>
          <select name="tipoCarta" value={form.tipoCarta} onChange={handleChange} className="input">
            <option value="empregador">Despedimento pelo Empregador</option>
            <option value="trabalhador">Despedimento pelo Trabalhador</option>
          </select>
        </div>

        <input name="nome" value={form.nome} onChange={handleChange} className="input" placeholder="Nome completo" required />
        <input name="cargo" value={form.cargo} onChange={handleChange} className="input" placeholder="Cargo" required />
        <input name="empresa" value={form.empresa} onChange={handleChange} className="input" placeholder="Nome da empresa" required />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-primary font-semibold mb-1" htmlFor="dataInicio">Data de início do contrato</label>
            <input type="date" id="dataInicio" name="dataInicio" value={form.dataInicio} onChange={handleChange} className="input w-full" required />
          </div>
          <div className="flex-1">
            <label className="block text-primary font-semibold mb-1" htmlFor="dataSaida">Data de saída</label>
            <input type="date" id="dataSaida" name="dataSaida" value={form.dataSaida} onChange={handleChange} className="input w-full" required />
          </div>
        </div>

        {form.tipoCarta === 'empregador' && (
          <div className="grid gap-3">
            <label className="text-primary font-semibold">Aviso Prévio:</label>
            <select name="avisoPrevio" value={form.avisoPrevio} onChange={handleChange} className="input">
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
            {form.avisoPrevio === 'sim' && (
              <input 
                type="number" 
                name="periodoAviso" 
                value={form.periodoAviso} 
                onChange={handleChange} 
                className="input" 
                placeholder="Período de aviso prévio (dias)" 
                required 
              />
            )}
          </div>
        )}

        <textarea 
          name="motivo" 
          value={form.motivo} 
          onChange={handleChange} 
          className="input min-h-[80px]" 
          placeholder={form.tipoCarta === 'empregador' ? "Motivo da rescisão" : "Motivo da despedimento"} 
          required 
        />
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="incluirPedidoValores"
            name="incluirPedidoValores"
            checked={form.incluirPedidoValores}
            onChange={e => setForm({ ...form, incluirPedidoValores: e.target.checked })}
            className="accent-blue-600 w-4 h-4"
          />
          <label htmlFor="incluirPedidoValores" className="text-primary font-medium cursor-pointer">
            Incluir pedido de apuramento e pagamento dos valores devidos (recomendado)
          </label>
        </div>

        <button type="submit" className="bg-gradient-btn text-white rounded-lg px-6 py-2 font-bold shadow hover:scale-105 transition">
          Gerar Carta
        </button>
      </form>

      {showPreview && (
        <div className="mt-8 flex flex-col items-center">
          <div ref={cartaRef} className="bg-white rounded-xl p-8 shadow-lg text-gray-900 w-full max-w-lg border border-accent min-h-[400px] text-[0.84rem] sm:text-[1rem]" style={{ fontSize: '0.84rem' }}>
            <div className="mb-4 text-right text-sm text-primary">{formatarData(new Date())}</div>
            <div className="mb-4 font-semibold">À atenção de {form.empresa}</div>
            <div className="mb-4 font-semibold">Assunto: Rescisão do Contrato de Trabalho</div>
            <div className="mb-4">Exmos. Senhores,</div>
            
            {form.tipoCarta === 'empregador' ? (
              <>
                <div className="mb-4">
                  Vimos por este meio comunicar a rescisão do contrato de trabalho do(a) Sr(a). {form.nome}, 
                  exercendo as funções de <span className="font-semibold">{form.cargo}</span>, 
                  iniciado em <span className="font-semibold">{formatarData(form.dataInicio)}</span>, 
                  com efeitos a partir de <span className="font-semibold">{formatarData(form.dataSaida)}</span>.
                </div>
                {form.avisoPrevio === 'sim' && (
                  <div className="mb-4">
                    O presente aviso é dado com a antecedência de {form.periodoAviso} dias, conforme previsto na legislação laboral.
                  </div>
                )}
              </>
            ) : (
              <div className="mb-4">
                Venho por este meio comunicar a minha decisão de rescindir o contrato de trabalho que mantenho com a vossa empresa, 
                exercendo as funções de <span className="font-semibold">{form.cargo}</span>, 
                iniciado em <span className="font-semibold">{formatarData(form.dataInicio)}</span>, 
                com efeitos a partir de <span className="font-semibold">{formatarData(form.dataSaida)}</span>.
              </div>
            )}

            <div className="mb-4">Motivo: <span className="italic">{form.motivo}</span></div>
            <div className="mb-4">Agradeço a oportunidade e colaboração durante o período em que estive ao serviço da empresa.</div>
            
            {form.incluirPedidoValores && (
              <div className="mb-4">
                Solicito ainda que seja efetuado o apuramento das contas finais e o pagamento de todos os valores a que tenho direito, nomeadamente férias vencidas e não gozadas, proporcionais, subsídios e demais créditos laborais, dentro do prazo legal.
              </div>
            )}
            <div className="mb-4">Com os melhores cumprimentos,</div>
            <div className="mt-8 font-bold text-primary">{form.nome}</div>
          </div>
          <button 
            onClick={downloadPDF} 
            className="mt-6 bg-gradient-btn text-white rounded-lg px-6 py-2 font-bold shadow hover:scale-105 transition"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
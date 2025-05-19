# Calculadora de Rescisão e Despedimento

Ferramenta gratuita para calcular o valor a receber em caso de rescisão voluntária ou despedimento, conforme a legislação portuguesa. Permite também gerar automaticamente uma carta de despedimento/modelo de carta de rescisão pronta a usar.

## Por que usar este projeto?
Esta calculadora é ideal para integrar em sites de contabilidade, portais de finanças, blogs de recursos humanos ou qualquer plataforma que deseje oferecer ferramentas de apoio a trabalhadores e empregadores em Portugal. Facilita o esclarecimento de dúvidas sobre direitos laborais e agiliza o apuramento de valores em processos de rescisão ou despedimento.

## Stack e Tecnologias Utilizadas
- **React**: Framework principal para construção da interface e lógica da aplicação.
- **Vite**: Ferramenta de build e desenvolvimento rápido para projetos React modernos.
- **Tailwind CSS**: Estilização moderna, responsiva e personalizável.
- **React Router**: Navegação entre páginas (cálculo, carta, etc.).
- **jsPDF** e **html2canvas**: Geração de PDF da carta de despedimento.

## Funcionalidades
- Cálculo de todos os direitos legais: férias, subsídios, indemnização, salário em dívida, subsídio de alimentação, formação, etc.
- Suporte a trabalho por turnos/folgas rotativas.
- Geração automática de carta de despedimento (modelo gratuito e personalizável).
- Base legal e links úteis para trabalhadores em Portugal.
- Interface moderna, responsiva e acessível.
- Aviso visual sobre a natureza indicativa dos cálculos.

## Como usar
1. Clone o repositório:
   ```bash
   git clone https://github.com/julioz07/rescisao-e-gerarcartadespedimento.git
   ```
2. Instale as dependências:
   ```bash
   cd projeto-calculo-rescisao
   npm install
   ```
3. Execute em modo desenvolvimento:
   ```bash
   npm run dev
   ```
4. Para gerar o build de produção:
   ```bash
   npm run build
   ```
5. Faça upload da pasta `dist` para a sua hospedagem (inclua o `.htaccess` para SPA em Apache).

## Demonstração
- [Aceda à calculadora online](https://rescisao.julio-cr.pt)

## Licença
Este projeto é de utilização livre e gratuita para fins pessoais e profissionais, mas **é proibida a venda, revenda ou distribuição comercial do código-fonte**. Veja o ficheiro LICENSE para mais detalhes.

---

Desenvolvido por [Júlio César Rodrigues](https://julio-cr.pt/)

# Calculadora de Rescisão e Despedimento

Ferramenta gratuita para calcular o valor a receber em caso de rescisão voluntária ou despedimento, conforme a legislação portuguesa. Permite também gerar automaticamente uma carta de despedimento/modelo de carta de rescisão pronta a usar.

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
   git clone https://github.com/julioz07/calculadora-rescisao.git
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

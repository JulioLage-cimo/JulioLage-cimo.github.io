/* ============================================================
   MOTRIX — App data (fictício · Belo Horizonte)
   Exports to window: MX (helpers), MOTRIX_DATA
   ============================================================ */

// ---- formatting helpers ----------------------------------------------------
const _brl = (n, dec = 2) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
const brl = (n, dec = 2) => 'R$\u00A0' + _brl(n, dec);
const num = (n, dec = 2) => _brl(n, dec);
const pct = (n) => (n > 0 ? '+' : '') + num(n, 1) + '%';

// classification → label + color token
const CLASS = {
  otima: { label: 'Ótima', color: 'var(--mx-pos)', dot: 'var(--mx-pos)' },
  boa:   { label: 'Boa',   color: 'var(--mx-sand)', dot: 'var(--mx-sand)' },
  ruim:  { label: 'Ruim',  color: 'var(--mx-neg)', dot: 'var(--mx-neg)' },
};

// ---- driver + vehicle ------------------------------------------------------
const DRIVER = {
  name: 'Marcos Ferreira',
  first: 'Marcos',
  city: 'Belo Horizonte · MG',
  since: 'Cliente desde mar 2025',
  plan: 'Pro',
  initials: 'MF',
  email: 'marcos.ferreira@gmail.com',
  phone: '(31) 9 8841-2207',
};

const VEHICLE = {
  model: 'Chevrolet Onix 1.0 LT',
  year: '2019',
  plate: 'PYZ-2F19',
  odo: 168432,        // km
  fuel: 'Flex · Gasolina',
  tankPct: 64,        // %
  kmL: 11.8,          // km/l atual
  custoKm: 2.18,      // R$/km operacional
};

const SENSOR = {
  status: 'Conectado',
  model: 'Motrix OBD-II · M1',
  firmware: '2.4.1',
  signal: 92,          // %
  lastSync: 'há 2 min',
  voltage: 13.9,       // V
  coolant: 91,         // °C
  rpmIdle: 780,
  dtc: 0,              // códigos de falha
};

// ---- today snapshot --------------------------------------------------------
const TODAY = {
  lucro: 312.40,
  lucroDelta: 8.4,        // % vs ontem
  receita: 487.10,
  custos: 174.70,
  rPerKm: 4.33,
  rPerHora: 82.20,
  custoKm: 2.18,
  custoHora: 14.90,
  lucroCorrida: 8.72,
  corridas: 18,
  horas: 6.4,
  kmRodado: 142.6,
  ocioso: '1h 24m',
  nota: 4.93,
  // lucro por hora (sparkbars 06h-22h)
  porHora: [12, 18, 26, 44, 38, 22, 14, 9, 16, 28, 40, 52, 46, 30, 20, 11],
};

// ---- rides (corridas do dia) -----------------------------------------------
const RIDES = [
  { id: 'c18', time: '20:14', plat: 'Uber', from: 'Savassi',        to: 'Aeroporto Confins',   km: 38.4, min: 42, gross: 96.30, cost: 41.20, cls: 'otima', nota: 4.91, rkm: 4.71 },
  { id: 'c17', time: '19:36', plat: '99',   from: 'Funcionários',   to: 'Buritis',             km: 8.2,  min: 22, gross: 21.40, cost: 9.80,  cls: 'boa',   nota: 4.12, rkm: 2.61 },
  { id: 'c16', time: '19:02', plat: 'Uber', from: 'Lourdes',        to: 'Savassi',             km: 2.9,  min: 11, gross: 9.20,  cost: 5.40,  cls: 'ruim',  nota: 2.34, rkm: 3.17 },
  { id: 'c15', time: '18:21', plat: 'Uber', from: 'Centro',         to: 'Pampulha',            km: 11.6, min: 28, gross: 28.70, cost: 12.10, cls: 'boa',   nota: 4.05, rkm: 2.47 },
  { id: 'c14', time: '17:48', plat: '99',   from: 'Praça Sete',     to: 'Cidade Nova',         km: 6.4,  min: 18, gross: 18.90, cost: 7.90,  cls: 'boa',   nota: 4.21, rkm: 2.95 },
  { id: 'c13', time: '17:05', plat: 'Uber', from: 'Savassi',        to: 'Belvedere',           km: 5.1,  min: 16, gross: 22.40, cost: 6.30,  cls: 'otima', nota: 4.83, rkm: 4.39 },
  { id: 'c12', time: '16:22', plat: 'Uber', from: 'Floresta',       to: 'Contagem Centro',     km: 17.8, min: 34, gross: 39.60, cost: 17.40, cls: 'boa',   nota: 4.30, rkm: 2.22 },
  { id: 'c11', time: '15:40', plat: '99',   from: 'Santa Efigênia', to: 'Lourdes',             km: 4.2,  min: 14, gross: 11.10, cost: 5.60,  cls: 'ruim',  nota: 2.61, rkm: 2.64 },
  { id: 'c10', time: '14:58', plat: 'Uber', from: 'Pampulha',       to: 'Savassi',             km: 12.3, min: 26, gross: 31.80, cost: 12.90, cls: 'boa',   nota: 4.18, rkm: 2.59 },
  { id: 'c09', time: '13:30', plat: 'Uber', from: 'Buritis',        to: 'Cidade Jardim',       km: 7.7,  min: 19, gross: 26.50, cost: 9.10,  cls: 'otima', nota: 4.62, rkm: 3.44 },
  { id: 'c08', time: '12:12', plat: '99',   from: 'Barreiro',       to: 'Centro',              km: 14.9, min: 31, gross: 33.20, cost: 15.20, cls: 'boa',   nota: 4.02, rkm: 2.23 },
  { id: 'c07', time: '10:46', plat: 'Uber', from: 'Cidade Nova',    to: 'Aeroporto Pampulha',  km: 9.6,  min: 21, gross: 27.90, cost: 10.40, cls: 'otima', nota: 4.55, rkm: 2.91 },
];

// ---- 30-day series for charts ----------------------------------------------
// lucro líquido diário (R$) — últimos 30 dias
const LUCRO_30D = [
  198, 244, 176, 0, 287, 312, 268, 224, 190, 0,
  256, 301, 277, 312, 289, 244, 0, 198, 332, 308,
  276, 254, 0, 221, 297, 341, 318, 286, 263, 312,
];
// receita bruta diária correspondente
const RECEITA_30D = LUCRO_30D.map(v => v === 0 ? 0 : Math.round(v * 1.56));

// melhores faixas de horário (lucro médio/h)
const HORARIOS = [
  { faixa: '06–09', label: 'Manhã / pico', v: 38 },
  { faixa: '09–12', label: 'Manhã', v: 22 },
  { faixa: '12–15', label: 'Almoço', v: 31 },
  { faixa: '15–18', label: 'Tarde', v: 26 },
  { faixa: '18–21', label: 'Pico noturno', v: 52 },
  { faixa: '21–00', label: 'Noite', v: 34 },
];

// ---- financeiro mensal -----------------------------------------------------
const FIN = {
  periodo: 'Maio 2026',
  receita: 9840.50,
  custos: 3612.30,
  lucro: 6228.20,
  custos_breakdown: [
    { k: 'Combustível',         v: 1842.60, color: 'var(--mx-sand)' },
    { k: 'Manutenção',          v: 612.40,  color: '#a8916b' },
    { k: 'Depreciação',         v: 738.90,  color: '#7d6c50' },
    { k: 'Taxas das plataformas', v: 418.40, color: '#5c5240' },
  ],
  // MEI
  meiTeto: 81000,
  meiAcumulado: 47280,   // faturamento acumulado no ano
  dasMensal: 75.90,
  dasStatus: 'Pago',
};

// receita mensal (12 meses)
const RECEITA_12M = [6420, 6980, 7310, 7050, 8120, 8640, 9210, 8730, 9050, 9480, 9620, 9840];
const LUCRO_12M   = RECEITA_12M.map(v => Math.round(v * 0.63));
const MESES = ['Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai'];

// ---- recomendações Motrix --------------------------------------------------
const RECS = [
  { tag: 'Posicionamento', txt: 'Savassi entre 18h e 21h rende em média R$ 52/h — sua faixa mais lucrativa.' },
  { tag: 'Evite', txt: 'Corridas curtas no Centro após 22h: lucro médio de R$ 3,10. Recuse e reposicione.' },
  { tag: 'Custo', txt: 'Consumo subiu 6% nesta semana. Calibre os pneus — pode economizar R$ 0,11/km.' },
];

// ---- período: histórico de corridas (Hoje / Semana / Mês) ------------------
// resumo por dia (últimos 7 dias — usado na aba Semana)
const DAY_SUMMARY = [
  { d: 'Sex', dia: '22 mai', lucro: 287.10, corridas: 16, km: 121.4, top: 'boa' },
  { d: 'Sáb', dia: '23 mai', lucro: 341.60, corridas: 21, km: 168.9, top: 'otima' },
  { d: 'Dom', dia: '24 mai', lucro: 198.40, corridas: 12, km: 96.2,  top: 'ruim' },
  { d: 'Seg', dia: '25 mai', lucro: 264.30, corridas: 15, km: 118.7, top: 'boa' },
  { d: 'Ter', dia: '26 mai', lucro: 252.80, corridas: 14, km: 112.1, top: 'boa' },
  { d: 'Qua', dia: '27 mai', lucro: 286.70, corridas: 17, km: 134.7, top: 'boa' },
  { d: 'Qui', dia: '28 mai', lucro: 312.40, corridas: 18, km: 142.6, top: 'otima' },
];
// resumo por semana (mês corrente — usado na aba Mês)
const WEEK_SUMMARY = [
  { d: 'Sem 1', dia: '28 abr – 04 mai', lucro: 1502.30, corridas: 78, km: 712.4, top: 'boa' },
  { d: 'Sem 2', dia: '05 – 11 mai',     lucro: 1486.90, corridas: 74, km: 698.1, top: 'boa' },
  { d: 'Sem 3', dia: '12 – 18 mai',     lucro: 1395.70, corridas: 71, km: 675.3, top: 'ruim' },
  { d: 'Sem 4', dia: '19 – 28 mai',     lucro: 1843.30, corridas: 89, km: 894.6, top: 'otima' },
];
// totais + qualidade por período
const PERIODS_RIDES = {
  'Hoje':   { lucro: 312.40,  corridas: 18,  km: 142.6,  split: { otima: 4,  boa: 6,   ruim: 2  }, date: 'Quinta · 28 maio', list: 'rides' },
  'Semana': { lucro: 1943.30, corridas: 113, km: 894.6,  split: { otima: 34, boa: 61,  ruim: 18 }, date: '22 – 28 maio',     list: 'days'  },
  'Mês':    { lucro: 6228.20, corridas: 312, km: 2980.5, split: { otima: 96, boa: 165, ruim: 51 }, date: 'Maio 2026',        list: 'weeks' },
};

// ---- período: financeiro (Semana / Mês / Ano) ------------------------------
const PERIODS_FIN = {
  'Semana': { periodo: '22 – 28 maio',     receita: 3070.20,  custos: 1126.90,  lucro: 1943.30,  das: 17.20,  dasLabel: 'DAS-MEI · proporc.' },
  'Mês':    { periodo: 'Maio 2026',        receita: 9840.50,  custos: 3612.30,  lucro: 6228.20,  das: 75.90,  dasLabel: 'DAS-MEI · maio' },
  'Ano':    { periodo: '2026 · acumulado', receita: 47280.00, custos: 17352.00, lucro: 29928.00, das: 442.50, dasLabel: 'DAS-MEI · acum.' },
};

// ---- período: visão geral desktop (Hoje / Semana / Mês) --------------------
const PERIODS_OVERVIEW = {
  'Hoje':   { lucro: 312.40,  lucroD: 8.4,  receita: 487.10,  recD: 5.1, custoKm: 2.18, custoKmD: -1.2, corridas: 18,  corrD: 12.5, sub: 'vs ontem' },
  'Semana': { lucro: 1943.30, lucroD: 6.2,  receita: 3070.20, recD: 4.0, custoKm: 2.21, custoKmD: 1.4,  corridas: 113, corrD: 3.1,  sub: 'vs sem. ant.' },
  'Mês':    { lucro: 6228.20, lucroD: 11.2, receita: 9840.50, recD: 6.4, custoKm: 2.18, custoKmD: -2.1, corridas: 312, corrD: 4.8,  sub: 'vs abr' },
};

const MOTRIX_DATA = {
  DRIVER, VEHICLE, SENSOR, TODAY, RIDES,
  LUCRO_30D, RECEITA_30D, HORARIOS, FIN,
  RECEITA_12M, LUCRO_12M, MESES, RECS,
  DAY_SUMMARY, WEEK_SUMMARY, PERIODS_RIDES, PERIODS_FIN, PERIODS_OVERVIEW,
};

const MX = { brl, num, pct, CLASS };

Object.assign(window, { MX, MOTRIX_DATA });

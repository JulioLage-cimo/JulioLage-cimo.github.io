/* ============================================================
   MOTRIX — Desktop screens (área logada)
   Exports to window: MOTRIX_DESKTOP_SCREENS, DPanel
   ============================================================ */
const { useState: dUseState } = React;

// ---- shared desktop primitives --------------------------------------------
function DPanel({ title, action, children, style = {}, pad = 22 }) {
  return (
    <div style={{ background: 'var(--mx-surface)', border: '1px solid var(--mx-rule)',
      borderRadius: 'var(--mx-r)', padding: pad, ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--mx-serif)', fontSize: 19, fontWeight: 500, color: 'var(--mx-ink)' }}>{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
function DLabel({ children }) {
  return <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--mx-sand-dim)', fontFamily: 'var(--mx-sans)', fontWeight: 600 }}>{children}</div>;
}
function DPlatTag({ plat }) {
  const is99 = plat === '99';
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 5, fontFamily: 'var(--mx-num)',
    background: is99 ? 'rgba(255,210,40,0.14)' : 'rgba(255,255,255,0.08)', color: is99 ? '#e8c24a' : 'var(--mx-ink)' }}>{plat}</span>;
}

// ============================================================
// VISÃO GERAL (cockpit)
// ============================================================
function OverviewScreen() {
  const { FIN, TODAY, LUCRO_30D, LUCRO_12M, MESES, RIDES, RECS, HORARIOS, PERIODS_OVERVIEW } = MOTRIX_DATA;
  const [per, setPer] = dUseState('Mês');
  const [chartRange, setChartRange] = dUseState('30d');
  const K = PERIODS_OVERVIEW[per];
  const split = { otima: 0, boa: 0, ruim: 0 };
  RIDES.forEach(r => split[r.cls]++);
  const donutSeg = [
    { v: split.otima, color: 'var(--mx-pos)' },
    { v: split.boa, color: 'var(--mx-sand)' },
    { v: split.ruim, color: 'var(--mx-neg)' },
  ];
  const hMax = Math.max(...HORARIOS.map(h => h.v));
  // suaviza dias de folga (0) interpolando vizinhos — evita picos em V
  const lucroSmooth = LUCRO_30D.map((v, i) => {
    if (v > 0) return v;
    const prev = [...LUCRO_30D.slice(0, i)].reverse().find(x => x > 0) || 0;
    const next = LUCRO_30D.slice(i + 1).find(x => x > 0) || prev;
    return Math.round((prev + next) / 2);
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: -4 }}>
        <DLabel>Resumo · {per}</DLabel>
        <Seg size="sm" options={['Hoje', 'Semana', 'Mês']} value={per} onChange={setPer} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <StatTile label={'Lucro líquido · ' + per} value={MX.brl(K.lucro)} accent="var(--mx-pos)" delta={K.lucroD} sub={K.sub} icon="finance" />
        <StatTile label={'Receita bruta · ' + per} value={MX.brl(K.receita)} delta={K.recD} sub={K.sub} icon="wallet" />
        <StatTile label="Custo por km" value={MX.brl(K.custoKm)} delta={K.custoKmD} sub={K.custoKmD < 0 ? 'melhorou' : K.sub} icon="fuel" />
        <StatTile label={'Corridas · ' + per} value={String(K.corridas)} delta={K.corrD} sub={K.sub} icon="rides" />
      </div>

      {/* main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* left: charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <DPanel title="Lucro líquido" action={<Seg size="sm" options={['30d', '12m']} value={chartRange} onChange={setChartRange} />}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--mx-num)', fontSize: 30, fontWeight: 700, color: 'var(--mx-ink)' }}>{MX.brl(chartRange === '30d' ? FIN.lucro : LUCRO_12M.reduce((a, b) => a + b, 0))}</span>
              <span style={{ color: 'var(--mx-pos)', fontFamily: 'var(--mx-num)', fontSize: 14, fontWeight: 600 }}>{MX.pct(chartRange === '30d' ? 11.2 : 18.6)}</span>
              <span style={{ color: 'var(--mx-ink-dim)', fontSize: 13, fontFamily: 'var(--mx-sans)' }}>{chartRange === '30d' ? 'nos últimos 30 dias' : 'nos últimos 12 meses'}</span>
            </div>
            <AreaChart data={chartRange === '30d' ? lucroSmooth : LUCRO_12M} h={210} color="var(--mx-sand)" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-num)' }}>
              {chartRange === '30d'
                ? (<React.Fragment><span>28 abr</span><span>13 mai</span><span>28 mai</span></React.Fragment>)
                : (<React.Fragment><span>{MESES[0]}</span><span>{MESES[Math.floor(MESES.length / 2)]}</span><span>{MESES[MESES.length - 1]}</span></React.Fragment>)}
            </div>
          </DPanel>

          <DPanel title="Hoje em números">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
              {[
                ['Lucro', MX.brl(TODAY.lucro), 'var(--mx-pos)'],
                ['R$ / km', MX.num(TODAY.rPerKm), 'var(--mx-ink)'],
                ['R$ / hora', MX.num(TODAY.rPerHora), 'var(--mx-ink)'],
                ['Tempo ocioso', TODAY.ocioso, 'var(--mx-neg)'],
              ].map(([l, v, c], i) => (
                <div key={l} style={{ padding: '0 18px', borderLeft: i ? '1px solid var(--mx-rule-soft)' : 'none' }}>
                  <DLabel>{l}</DLabel>
                  <div style={{ fontFamily: 'var(--mx-num)', fontSize: 24, fontWeight: 600, color: c, marginTop: 6 }}>{v}</div>
                </div>
              ))}
            </div>
          </DPanel>
        </div>

        {/* right: donut + recs + horarios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <DPanel title="Qualidade das corridas">
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <Donut segments={donutSeg} size={120} thickness={15}>
                <span style={{ fontFamily: 'var(--mx-num)', fontSize: 26, fontWeight: 700, color: 'var(--mx-ink)' }}>{RIDES.length}</span>
                <span style={{ fontSize: 10.5, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--mx-sans)' }}>corridas</span>
              </Donut>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['Ótima', split.otima, 'var(--mx-pos)'], ['Boa', split.boa, 'var(--mx-sand)'], ['Ruim', split.ruim, 'var(--mx-neg)']].map(([l, n, c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 999, background: c }} />
                    <span style={{ flex: 1, fontFamily: 'var(--mx-sans)', fontSize: 13.5, color: 'var(--mx-ink)' }}>{l}</span>
                    <span style={{ fontFamily: 'var(--mx-num)', fontSize: 14, fontWeight: 600, color: 'var(--mx-ink)' }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </DPanel>

          <DPanel title="Recomendações" pad={20}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {RECS.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 11 }}>
                  <span style={{ color: 'var(--mx-sand)', marginTop: 1, flexShrink: 0 }}><MIcon name="spark" size={17} /></span>
                  <div>
                    <div style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mx-sand-dim)', fontFamily: 'var(--mx-sans)', fontWeight: 600, marginBottom: 3 }}>{r.tag}</div>
                    <p style={{ margin: 0, fontFamily: 'var(--mx-sans)', fontSize: 13.5, lineHeight: 1.45, color: 'var(--mx-ink-dim)' }}>{r.txt}</p>
                  </div>
                </div>
              ))}
            </div>
          </DPanel>

          <DPanel title="Melhores horários" pad={20}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {HORARIOS.map(h => (
                <div key={h.faixa} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--mx-num)', fontSize: 12, color: 'var(--mx-ink-dim)', width: 42 }}>{h.faixa}</span>
                  <div style={{ flex: 1 }}><ProgressBar value={h.v} max={hMax} height={7}
                    color={h.v === hMax ? 'var(--mx-pos)' : 'color-mix(in oklab, var(--mx-sand) 55%, transparent)'} /></div>
                  <span style={{ fontFamily: 'var(--mx-num)', fontSize: 12.5, color: 'var(--mx-ink)', fontWeight: 600, width: 48, textAlign: 'right' }}>R$ {h.v}</span>
                </div>
              ))}
            </div>
          </DPanel>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CORRIDAS (tabela + detalhe)
// ============================================================
function RidesTableScreen() {
  const { RIDES } = MOTRIX_DATA;
  const [sel, setSel] = dUseState(RIDES[0].id);
  const [plat, setPlat] = dUseState('Todas');
  const rows = plat === 'Todas' ? RIDES : RIDES.filter(r => r.plat === plat);
  const cur = RIDES.find(r => r.id === sel);
  const cols = ['Hora', 'App', 'Trajeto', 'Km', 'Bruto', 'Lucro', 'Classe'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 20, alignItems: 'start' }}>
      <DPanel pad={0} style={{ minWidth: 0, overflow: 'hidden' }}>
        {/* toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--mx-rule)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, background: 'var(--mx-surface-2)',
            border: '1px solid var(--mx-rule)', borderRadius: 8, padding: '8px 12px', color: 'var(--mx-sand-dim)' }}>
            <MIcon name="search" size={16} />
            <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 13 }}>Buscar por bairro, app ou valor…</span>
          </div>
          <Seg size="sm" options={['Todas', 'Uber', '99']} value={plat} onChange={setPlat} />
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 8,
            border: '1px solid var(--mx-rule)', background: 'var(--mx-surface-2)', color: 'var(--mx-sand)',
            fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <MIcon name="export" size={15} /> Exportar
          </button>
        </div>
        {/* table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontFamily: 'var(--mx-sans)' }}>
          <colgroup>
            <col style={{ width: 58 }} /><col style={{ width: 66 }} /><col /><col style={{ width: 50 }} /><col style={{ width: 82 }} /><col style={{ width: 82 }} /><col style={{ width: 98 }} />
          </colgroup>
          <thead>
            <tr>{cols.map((c, i) => (
              <th key={c} style={{ textAlign: i > 2 ? 'right' : 'left', padding: '11px 12px', fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mx-sand-dim)', fontWeight: 600,
                borderBottom: '1px solid var(--mx-rule-soft)' }}>{c}</th>
            ))}</tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const on = r.id === sel;
              return (
                <tr key={r.id} onClick={() => setSel(r.id)} style={{ cursor: 'pointer',
                  background: on ? 'var(--mx-surface-2)' : 'transparent' }}>
                  <Td>{r.time}</Td>
                  <Td><DPlatTag plat={r.plat} /></Td>
                  <Td><span style={{ color: 'var(--mx-ink)' }}>{r.from}</span> <span style={{ color: 'var(--mx-sand-dim)' }}>→ {r.to}</span></Td>
                  <Td r num>{MX.num(r.km, 1)}</Td>
                  <Td r num>{MX.brl(r.gross)}</Td>
                  <Td r num pos>{MX.brl(r.gross - r.cost)}</Td>
                  <Td r><Badge cls={r.cls} size="sm" /></Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DPanel>

      {/* detail */}
      <DPanel pad={0} style={{ position: 'sticky', top: 0 }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--mx-rule)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DPlatTag plat={cur.plat} />
            <Badge cls={cur.cls} />
          </div>
          <div style={{ fontFamily: 'var(--mx-num)', fontSize: 32, fontWeight: 700, color: 'var(--mx-pos)', marginTop: 12 }}>{MX.brl(cur.gross - cur.cost)}</div>
          <div style={{ fontSize: 12.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>lucro líquido · {cur.time}</div>
        </div>
        {/* route */}
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--mx-rule-soft)' }}>
          <div style={{ display: 'flex', gap: 11 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--mx-sand)' }} />
              <span style={{ width: 1.5, flex: 1, background: 'var(--mx-rule)', margin: '4px 0' }} />
              <span style={{ width: 9, height: 9, borderRadius: 2, background: 'var(--mx-sand-dim)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontFamily: 'var(--mx-sans)', fontSize: 14, color: 'var(--mx-ink)' }}>
              <span>{cur.from}</span><span>{cur.to}</span>
            </div>
          </div>
        </div>
        {/* metrics */}
        <div style={{ padding: '6px 20px 18px' }}>
          {[
            ['Valor bruto', MX.brl(cur.gross)],
            ['Custos (comb. + desgaste)', '− ' + MX.brl(cur.cost)],
            ['Distância', MX.num(cur.km, 1) + ' km'],
            ['Tempo', cur.min + ' min'],
            ['R$ por km', MX.num(cur.rkm)],
            ['Nota Motrix', MX.num(cur.nota) + ' / 5'],
          ].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0',
              borderBottom: i < 5 ? '1px solid var(--mx-rule-soft)' : 'none', fontFamily: 'var(--mx-sans)', fontSize: 13.5 }}>
              <span style={{ color: 'var(--mx-ink-dim)' }}>{k}</span>
              <span style={{ fontFamily: 'var(--mx-num)', fontWeight: 600, color: 'var(--mx-ink)' }}>{v}</span>
            </div>
          ))}
        </div>
      </DPanel>
    </div>
  );
}
function Td({ children, r, num, dim, pos }) {
  return (
    <td style={{ textAlign: r ? 'right' : 'left', padding: '12px 12px', fontSize: 13.5,
      borderBottom: '1px solid var(--mx-rule-soft)',
      fontFamily: num ? 'var(--mx-num)' : 'var(--mx-sans)', fontWeight: num ? 600 : 400,
      color: pos ? 'var(--mx-pos)' : dim ? 'var(--mx-ink-dim)' : 'var(--mx-ink)',
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</td>
  );
}

// ============================================================
// RELATÓRIOS (MEI / imposto / exportação)
// ============================================================
function ReportsScreen() {
  const { FIN } = MOTRIX_DATA;
  const exports = [
    { icon: 'report', t: 'Relatório mensal', d: 'PDF · receita, custos e lucro de maio' },
    { icon: 'finance', t: 'Extrato para IR', d: 'Rendimentos e despesas dedutíveis · 2026' },
    { icon: 'export', t: 'Planilha completa', d: 'CSV · todas as corridas e lançamentos' },
    { icon: 'wallet', t: 'Guia DAS-MEI', d: 'PDF · boleto do mês corrente' },
  ];
  const fiscal = [
    { m: 'Maio', fat: 9840.50, das: 75.90, st: 'Pago' },
    { m: 'Abril', fat: 9480.20, das: 75.90, st: 'Pago' },
    { m: 'Março', fat: 9050.80, das: 75.90, st: 'Pago' },
    { m: 'Fevereiro', fat: 8730.10, das: 71.60, st: 'Pago' },
    { m: 'Janeiro', fat: 9210.40, das: 71.60, st: 'Pago' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* MEI */}
        <DPanel title="Enquadramento MEI · 2026">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <DLabel>Faturamento acumulado</DLabel>
              <div style={{ fontFamily: 'var(--mx-num)', fontSize: 32, fontWeight: 700, color: 'var(--mx-ink)', marginTop: 4 }}>{MX.brl(FIN.meiAcumulado, 0)}</div>
            </div>
            <Badge cls="boa" />
          </div>
          <ProgressBar value={FIN.meiAcumulado} max={FIN.meiTeto} color="var(--mx-sand)" height={12} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'var(--mx-num)', fontSize: 12.5, color: 'var(--mx-ink-dim)' }}>
            <span>{Math.round(FIN.meiAcumulado / FIN.meiTeto * 100)}% do teto</span>
            <span>limite {MX.brl(FIN.meiTeto, 0)}</span>
          </div>
          <p style={{ fontFamily: 'var(--mx-serif)', fontStyle: 'italic', fontSize: 15.5, color: 'var(--mx-ink-dim)',
            lineHeight: 1.5, marginTop: 18, marginBottom: 0, borderTop: '1px solid var(--mx-rule-soft)', paddingTop: 16 }}>
            No ritmo atual você fecha o ano em torno de R$ 71 mil — dentro do limite do MEI. A Motrix avisa quando faltar 15% para o teto.
          </p>
        </DPanel>
        {/* DAS */}
        <DPanel title="DAS-MEI · maio">
          <div style={{ fontFamily: 'var(--mx-num)', fontSize: 36, fontWeight: 700, color: 'var(--mx-ink)' }}>{MX.brl(FIN.dasMensal)}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, color: 'var(--mx-pos)',
            fontFamily: 'var(--mx-sans)', fontSize: 13.5, fontWeight: 600 }}>
            <MIcon name="check" size={16} /> Pago · vence dia 20
          </div>
          <button style={{ width: '100%', marginTop: 22, padding: '12px', borderRadius: 8, border: 'none',
            background: 'var(--mx-sand)', color: 'var(--mx-bg)', fontFamily: 'var(--mx-sans)', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <MIcon name="export" size={16} /> Baixar guia
          </button>
        </DPanel>
      </div>

      {/* exports */}
      <DPanel title="Exportar relatórios">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {exports.map(e => (
            <button key={e.t} style={{ textAlign: 'left', padding: 18, borderRadius: 'var(--mx-r-sm)',
              border: '1px solid var(--mx-rule)', background: 'var(--mx-surface-2)', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--mx-surface)',
                display: 'grid', placeItems: 'center', color: 'var(--mx-sand)' }}><MIcon name={e.icon} size={21} /></span>
              <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 14.5, fontWeight: 600, color: 'var(--mx-ink)' }}>{e.t}</span>
              <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 12, color: 'var(--mx-ink-dim)', lineHeight: 1.4 }}>{e.d}</span>
            </button>
          ))}
        </div>
      </DPanel>

      {/* fiscal table */}
      <DPanel title="Resumo fiscal">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mx-sans)' }}>
          <thead><tr>{['Mês', 'Faturamento', 'DAS-MEI', 'Status', ''].map((c, i) => (
            <th key={c} style={{ textAlign: i === 0 ? 'left' : i === 4 ? 'right' : 'right', padding: '10px 4px', fontSize: 11,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mx-sand-dim)', fontWeight: 600,
              borderBottom: '1px solid var(--mx-rule-soft)' }}>{c}</th>
          ))}</tr></thead>
          <tbody>
            {fiscal.map(f => (
              <tr key={f.m}>
                <td style={{ padding: '13px 4px', fontSize: 14, color: 'var(--mx-ink)', borderBottom: '1px solid var(--mx-rule-soft)' }}>{f.m}</td>
                <td style={{ padding: '13px 4px', textAlign: 'right', fontFamily: 'var(--mx-num)', fontSize: 14, fontWeight: 600, color: 'var(--mx-ink)', borderBottom: '1px solid var(--mx-rule-soft)' }}>{MX.brl(f.fat)}</td>
                <td style={{ padding: '13px 4px', textAlign: 'right', fontFamily: 'var(--mx-num)', fontSize: 14, color: 'var(--mx-ink-dim)', borderBottom: '1px solid var(--mx-rule-soft)' }}>{MX.brl(f.das)}</td>
                <td style={{ padding: '13px 4px', textAlign: 'right', borderBottom: '1px solid var(--mx-rule-soft)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--mx-pos)', fontSize: 12.5, fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--mx-pos)' }} />{f.st}</span>
                </td>
                <td style={{ padding: '13px 4px', textAlign: 'right', borderBottom: '1px solid var(--mx-rule-soft)' }}>
                  <span style={{ color: 'var(--mx-sand-dim)', cursor: 'pointer', display: 'inline-flex' }}><MIcon name="export" size={16} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DPanel>
    </div>
  );
}

window.MOTRIX_DESKTOP_SCREENS = { OverviewScreen, RidesTableScreen, ReportsScreen };
window.DPanel = DPanel;
window.DLabel = DLabel;

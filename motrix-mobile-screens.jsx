/* ============================================================
   MOTRIX — Mobile app (motorista)
   Exports to window: MobileApp
   ============================================================ */
const { useState: mUseState } = React;

// ---- small mobile helpers --------------------------------------------------
function MCard({ children, style = {}, pad = 16 }) {
  return (
    <div style={{
      background: 'var(--mx-surface)', border: '1px solid var(--mx-rule)',
      borderRadius: 'var(--mx-r)', padding: pad, ...style,
    }}>{children}</div>
  );
}
function SectionLabel({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '4px 2px 10px' }}>
      <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 12.5, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--mx-sand-dim)', fontWeight: 600 }}>{children}</span>
      {action && <span style={{ fontSize: 13, color: 'var(--mx-sand)', fontFamily: 'var(--mx-sans)' }}>{action}</span>}
    </div>
  );
}
function PlatTag({ plat }) {
  const is99 = plat === '99';
  return (
    <span style={{
      fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', padding: '2px 6px', borderRadius: 5,
      fontFamily: 'var(--mx-num)',
      background: is99 ? 'rgba(255,210,40,0.14)' : 'rgba(255,255,255,0.1)',
      color: is99 ? '#e8c24a' : 'var(--mx-ink)',
    }}>{plat}</span>
  );
}

// ---- ride row --------------------------------------------------------------
function RideRow({ r, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none',
      borderBottom: '1px solid var(--mx-rule-soft)', padding: '13px 2px', cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
        <span style={{ fontFamily: 'var(--mx-num)', fontSize: 13, color: 'var(--mx-ink-dim)', minWidth: 38 }}>{r.time}</span>
        <PlatTag plat={r.plat} />
        <span style={{ flex: 1, fontFamily: 'var(--mx-sans)', fontSize: 14, color: 'var(--mx-ink)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {r.from} <span style={{ color: 'var(--mx-sand-dim)' }}>→</span> {r.to}
        </span>
        <Badge cls={r.cls} size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 48 }}>
        <Meta k="Bruto" v={MX.brl(r.gross)} />
        <Meta k="Lucro" v={MX.brl(r.gross - r.cost)} pos />
        <Meta k="R$/km" v={MX.num(r.rkm)} />
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mx-num)', fontSize: 12, color: 'var(--mx-ink-dim)' }}>{r.km}km · {r.min}min</span>
      </div>
    </button>
  );
}
function Meta({ k, v, pos }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <span style={{ fontSize: 10, color: 'var(--mx-sand-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--mx-sans)' }}>{k}</span>
      <span style={{ fontFamily: 'var(--mx-num)', fontSize: 13.5, fontWeight: 600,
        color: pos ? 'var(--mx-pos)' : 'var(--mx-ink)' }}>{v}</span>
    </span>
  );
}

// ============================================================
// HOME / HOJE
// ============================================================
function HomeScreen({ onOpenLive, go }) {
  const { TODAY, RIDES, RECS, DRIVER, SENSOR } = MOTRIX_DATA;
  return (
    <div style={{ padding: '0 18px 20px' }}>
      {/* greeting */}
      <div style={{ margin: '6px 2px 16px' }}>
        <div style={{ fontFamily: 'var(--mx-serif)', fontSize: 23, color: 'var(--mx-ink)' }}>
          Boa noite, <span style={{ fontStyle: 'italic', color: 'var(--mx-sand)' }}>{DRIVER.first}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', marginTop: 2 }}>
          Quinta · 28 mai · {DRIVER.city}
        </div>
      </div>

      {/* hero — lucro do dia */}
      <MCard pad={20} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12.5, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--mx-sand-dim)', fontFamily: 'var(--mx-sans)', fontWeight: 600 }}>Lucro líquido · hoje</div>
            <div style={{ fontFamily: 'var(--mx-num)', fontSize: 46, fontWeight: 700, letterSpacing: '-0.03em',
              color: 'var(--mx-ink)', lineHeight: 1.05, marginTop: 6 }}>
              <span style={{ fontSize: 24, color: 'var(--mx-sand-dim)', marginRight: 2 }}>R$</span>312<span style={{ color: 'var(--mx-sand-dim)' }}>,40</span>
            </div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--mx-pos)',
            fontFamily: 'var(--mx-num)', fontSize: 13.5, fontWeight: 600, marginTop: 6 }}>
            <MIcon name="arrow" size={14} /> {MX.pct(TODAY.lucroDelta)}
          </span>
        </div>
        <div style={{ margin: '16px 0 6px' }}>
          <SparkBars data={TODAY.porHora} color="var(--mx-sand)" height={42} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5,
          color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-num)', letterSpacing: '0.02em' }}>
          <span>06h</span><span>lucro por hora</span><span>22h</span>
        </div>
      </MCard>

      {/* metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[
          { l: 'R$ / km', v: MX.num(TODAY.rPerKm) },
          { l: 'R$ / hora', v: MX.num(TODAY.rPerHora) },
          { l: 'Corridas', v: TODAY.corridas },
        ].map(m => (
          <div key={m.l} style={{ background: 'var(--mx-surface)', border: '1px solid var(--mx-rule)',
            borderRadius: 'var(--mx-r-sm)', padding: '12px 12px' }}>
            <div style={{ fontSize: 10.5, color: 'var(--mx-sand-dim)', letterSpacing: '0.06em',
              textTransform: 'uppercase', fontFamily: 'var(--mx-sans)' }}>{m.l}</div>
            <div style={{ fontFamily: 'var(--mx-num)', fontSize: 20, fontWeight: 600, color: 'var(--mx-ink)', marginTop: 3 }}>{m.v}</div>
          </div>
        ))}
      </div>

      {/* live CTA */}
      <button onClick={onOpenLive} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '15px 18px', marginBottom: 18,
        background: 'var(--mx-sand)', border: 'none', borderRadius: 'var(--mx-r)', cursor: 'pointer', textAlign: 'left',
      }}>
        <span style={{ width: 38, height: 38, borderRadius: 999, background: 'rgba(13,24,20,0.12)',
          display: 'grid', placeItems: 'center', color: 'var(--mx-bg)' }}><MIcon name="bolt" size={20} /></span>
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontFamily: 'var(--mx-sans)', fontSize: 15, fontWeight: 700, color: 'var(--mx-bg)' }}>Lucro ao vivo</span>
          <span style={{ display: 'block', fontSize: 12, color: 'rgba(13,24,20,0.7)', fontFamily: 'var(--mx-sans)' }}>Veredicto da corrida antes de aceitar</span>
        </span>
        <span style={{ color: 'var(--mx-bg)' }}><MIcon name="chevron" size={18} /></span>
      </button>

      {/* recomendação Motrix */}
      <SectionLabel>Recomendação Motrix</SectionLabel>
      <MCard pad={16} style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--mx-sand)', marginTop: 1 }}><MIcon name="spark" size={20} /></span>
          <p style={{ margin: 0, fontFamily: 'var(--mx-serif)', fontStyle: 'italic', fontSize: 17,
            lineHeight: 1.4, color: 'var(--mx-ink)' }}>
            {RECS[0].txt}
          </p>
        </div>
      </MCard>

      {/* recentes */}
      <SectionLabel action="Ver tudo">Corridas recentes</SectionLabel>
      <MCard pad={0} style={{ padding: '2px 14px' }}>
        {RIDES.slice(0, 4).map(r => <RideRow key={r.id} r={r} />)}
      </MCard>

      {/* sensor strip */}
      <button onClick={() => go('vehicle')} style={{ width: '100%', marginTop: 14, display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px', background: 'var(--mx-surface)', border: '1px solid var(--mx-rule)',
        borderRadius: 'var(--mx-r)', cursor: 'pointer' }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mx-pos)' }} />
        <span style={{ flex: 1, textAlign: 'left', fontFamily: 'var(--mx-sans)', fontSize: 13.5, color: 'var(--mx-ink)' }}>
          Sensor OBD conectado · sinal {SENSOR.signal}%
        </span>
        <span style={{ color: 'var(--mx-sand-dim)' }}><MIcon name="chevron" size={16} /></span>
      </button>
    </div>
  );
}

// ============================================================
// HISTÓRICO
// ============================================================
// summary row for aggregated day/week views
function SummaryRow({ s }) {
  const c = MX.CLASS[s.top];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 2px',
      borderBottom: '1px solid var(--mx-rule-soft)' }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: c.dot, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 14.5, fontWeight: 600, color: 'var(--mx-ink)' }}>{s.d}</div>
        <div style={{ fontSize: 12, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>{s.dia} · {s.corridas} corridas · {MX.num(s.km, 0)} km</div>
      </div>
      <span style={{ fontFamily: 'var(--mx-num)', fontSize: 16, fontWeight: 600, color: 'var(--mx-pos)' }}>{MX.brl(s.lucro)}</span>
    </div>
  );
}

function RidesScreen() {
  const { RIDES, PERIODS_RIDES, DAY_SUMMARY, WEEK_SUMMARY } = MOTRIX_DATA;
  const [per, setPer] = mUseState('Hoje');
  const P = PERIODS_RIDES[per];
  const split = P.split;
  const splitTotal = split.otima + split.boa + split.ruim;
  return (
    <div style={{ padding: '0 18px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 16px' }}>
        <Seg size="sm" options={['Hoje', 'Semana', 'Mês']} value={per} onChange={setPer} />
      </div>

      {/* summary */}
      <MCard pad={16} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11.5, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mx-sans)' }}>Lucro · {per}</div>
            <div style={{ fontFamily: 'var(--mx-num)', fontSize: 30, fontWeight: 700, color: 'var(--mx-ink)', marginTop: 2 }}>{MX.brl(P.lucro)}</div>
          </div>
          <div style={{ display: 'flex', gap: 18, textAlign: 'right' }}>
            <span><div style={{ fontSize: 10.5, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', fontFamily: 'var(--mx-sans)' }}>Corridas</div>
              <div style={{ fontFamily: 'var(--mx-num)', fontSize: 18, fontWeight: 600, color: 'var(--mx-ink)' }}>{P.corridas}</div></span>
            <span><div style={{ fontSize: 10.5, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', fontFamily: 'var(--mx-sans)' }}>Km</div>
              <div style={{ fontFamily: 'var(--mx-num)', fontSize: 18, fontWeight: 600, color: 'var(--mx-ink)' }}>{MX.num(P.km, 0)}</div></span>
          </div>
        </div>
        {/* classification bar */}
        <div style={{ display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', marginTop: 16, gap: 2 }}>
          <div style={{ flex: split.otima, background: 'var(--mx-pos)' }} />
          <div style={{ flex: split.boa, background: 'var(--mx-sand)' }} />
          <div style={{ flex: split.ruim, background: 'var(--mx-neg)' }} />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          {[['Ótima', split.otima, 'var(--mx-pos)'], ['Boa', split.boa, 'var(--mx-sand)'], ['Ruim', split.ruim, 'var(--mx-neg)']].map(([l, n, c]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'var(--mx-sans)', color: 'var(--mx-ink-dim)' }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: c }} />{l} {n}
            </span>
          ))}
        </div>
      </MCard>

      <SectionLabel>{per === 'Hoje' ? P.date : per === 'Semana' ? 'Por dia · ' + P.date : 'Por semana · ' + P.date}</SectionLabel>
      <MCard pad={0} style={{ padding: '2px 14px' }}>
        {P.list === 'rides' && RIDES.map(r => <RideRow key={r.id} r={r} />)}
        {P.list === 'days' && DAY_SUMMARY.map(s => <SummaryRow key={s.dia} s={s} />)}
        {P.list === 'weeks' && WEEK_SUMMARY.map(s => <SummaryRow key={s.dia} s={s} />)}
      </MCard>
    </div>
  );
}

// ============================================================
// FINANCEIRO
// ============================================================
function FinanceScreen() {
  const { FIN, PERIODS_FIN } = MOTRIX_DATA;
  const [per, setPer] = mUseState('Mês');
  const P = PERIODS_FIN[per];
  // escala o detalhamento de custos proporcionalmente ao período
  const ratio = P.custos / FIN.custos;
  const breakdown = FIN.custos_breakdown.map(c => ({ ...c, v: c.v * ratio }));
  return (
    <div style={{ padding: '0 18px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 16px' }}>
        <Seg size="sm" options={['Semana', 'Mês', 'Ano']} value={per} onChange={setPer} />
      </div>

      {/* lucro líquido */}
      <MCard pad={20} style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mx-sans)' }}>Lucro líquido · {P.periodo}</div>
        <div style={{ fontFamily: 'var(--mx-num)', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--mx-pos)', marginTop: 4 }}>{MX.brl(P.lucro)}</div>
        {/* receita vs custo */}
        <div style={{ display: 'flex', gap: 6, height: 12, borderRadius: 999, overflow: 'hidden', marginTop: 16 }}>
          <div style={{ flex: P.lucro, background: 'var(--mx-pos)' }} />
          <div style={{ flex: P.custos, background: 'color-mix(in oklab, var(--mx-sand) 55%, transparent)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <FinLeg c="var(--mx-pos)" k="Lucro" v={MX.brl(P.lucro)} />
          <FinLeg c="var(--mx-sand)" k="Custos" v={MX.brl(P.custos)} right />
        </div>
        <div style={{ borderTop: '1px solid var(--mx-rule-soft)', marginTop: 14, paddingTop: 12,
          display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mx-sans)', fontSize: 13.5, color: 'var(--mx-ink-dim)' }}>
          <span>Receita bruta</span>
          <span style={{ fontFamily: 'var(--mx-num)', color: 'var(--mx-ink)', fontWeight: 600 }}>{MX.brl(P.receita)}</span>
        </div>
      </MCard>

      {/* custos breakdown */}
      <SectionLabel>Para onde vai o custo</SectionLabel>
      <MCard pad={16} style={{ marginBottom: 14 }}>
        {breakdown.map((c, i) => (
          <div key={c.k} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mx-sans)', fontSize: 13.5, marginBottom: 6 }}>
              <span style={{ color: 'var(--mx-ink)' }}>{c.k}</span>
              <span style={{ fontFamily: 'var(--mx-num)', color: 'var(--mx-ink)', fontWeight: 600 }}>{MX.brl(c.v)}</span>
            </div>
            <ProgressBar value={c.v} max={breakdown[0].v} color={c.color} height={6} />
          </div>
        ))}
      </MCard>

      {/* MEI */}
      <SectionLabel>MEI · imposto</SectionLabel>
      <MCard pad={18}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 14, color: 'var(--mx-ink)', fontWeight: 600 }}>Faturamento anual</span>
          <Badge cls="boa" size="sm" />
        </div>
        <ProgressBar value={FIN.meiAcumulado} max={FIN.meiTeto} color="var(--mx-sand)" height={10} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'var(--mx-num)', fontSize: 12.5, color: 'var(--mx-ink-dim)' }}>
          <span style={{ color: 'var(--mx-ink)', fontWeight: 600 }}>{MX.brl(FIN.meiAcumulado, 0)}</span>
          <span>teto {MX.brl(FIN.meiTeto, 0)}</span>
        </div>
        <div style={{ borderTop: '1px solid var(--mx-rule-soft)', marginTop: 14, paddingTop: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--mx-sand-dim)', fontFamily: 'var(--mx-sans)' }}>{P.dasLabel}</div>
            <div style={{ fontFamily: 'var(--mx-num)', fontSize: 18, fontWeight: 600, color: 'var(--mx-ink)' }}>{MX.brl(P.das)}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--mx-pos)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--mx-sans)' }}>
            <MIcon name="check" size={16} /> {FIN.dasStatus}
          </span>
        </div>
      </MCard>
    </div>
  );
}
function FinLeg({ c, k, v, right }) {
  return (
    <span style={{ textAlign: right ? 'right' : 'left' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: right ? 'flex-end' : 'flex-start',
        fontSize: 11.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: c }} />{k}
      </span>
      <span style={{ fontFamily: 'var(--mx-num)', fontSize: 15, fontWeight: 600, color: 'var(--mx-ink)' }}>{v}</span>
    </span>
  );
}

// ============================================================
// VEÍCULO / SENSOR
// ============================================================
function VehicleScreen() {
  const { VEHICLE, SENSOR } = MOTRIX_DATA;
  const tele = [
    { icon: 'fuel', l: 'Combustível', v: VEHICLE.tankPct + '%', ring: VEHICLE.tankPct, c: 'var(--mx-sand)' },
    { icon: 'spark', l: 'Consumo', v: VEHICLE.kmL + ' km/l', ring: (VEHICLE.kmL / 16) * 100, c: 'var(--mx-pos)' },
    { icon: 'temp', l: 'Motor', v: SENSOR.coolant + '°C', ring: (SENSOR.coolant / 120) * 100, c: 'var(--mx-sand)' },
    { icon: 'battery', l: 'Bateria', v: SENSOR.voltage + 'V', ring: (SENSOR.voltage / 15) * 100, c: 'var(--mx-pos)' },
  ];
  return (
    <div style={{ padding: '0 18px 20px' }}>
      {/* vehicle card */}
      <MCard pad={18} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--mx-surface-2)',
            display: 'grid', placeItems: 'center', color: 'var(--mx-sand)' }}><MIcon name="vehicle" size={26} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 16, fontWeight: 600, color: 'var(--mx-ink)' }}>{VEHICLE.model}</div>
            <div style={{ fontSize: 12.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>{VEHICLE.year} · {VEHICLE.fuel}</div>
          </div>
          <span style={{ fontFamily: 'var(--mx-num)', fontSize: 13, letterSpacing: '0.08em', color: 'var(--mx-ink)',
            border: '1px solid var(--mx-rule)', borderRadius: 6, padding: '4px 8px' }}>{VEHICLE.plate}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, borderTop: '1px solid var(--mx-rule-soft)', paddingTop: 14 }}>
          <VMeta k="Odômetro" v={MX.num(VEHICLE.odo, 0) + ' km'} />
          <VMeta k="Custo / km" v={MX.brl(VEHICLE.custoKm)} />
        </div>
      </MCard>

      {/* sensor status */}
      <SectionLabel>Sensor OBD-II</SectionLabel>
      <MCard pad={16} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ color: 'var(--mx-sand)' }}><MIcon name="sensor" size={22} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 14, color: 'var(--mx-ink)', fontWeight: 600 }}>{SENSOR.model}</div>
            <div style={{ fontSize: 12, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>Firmware {SENSOR.firmware} · sync {SENSOR.lastSync}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--mx-pos)',
            fontSize: 12.5, fontWeight: 600, fontFamily: 'var(--mx-sans)' }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--mx-pos)' }} />{SENSOR.status}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
          {tele.map(t => (
            <div key={t.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <Ring value={t.ring} size={56} thickness={5} color={t.c}>
                <span style={{ color: 'var(--mx-sand-dim)' }}><MIcon name={t.icon} size={18} /></span>
              </Ring>
              <span style={{ fontFamily: 'var(--mx-num)', fontSize: 13, fontWeight: 600, color: 'var(--mx-ink)' }}>{t.v}</span>
              <span style={{ fontSize: 10, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--mx-sans)' }}>{t.l}</span>
            </div>
          ))}
        </div>
      </MCard>

      {/* diagnostics */}
      <MCard pad={16}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 999, display: 'grid', placeItems: 'center',
            background: 'color-mix(in oklab, var(--mx-pos) 14%, transparent)', color: 'var(--mx-pos)' }}><MIcon name="shield" size={22} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 14.5, fontWeight: 600, color: 'var(--mx-ink)' }}>Nenhum código de falha</div>
            <div style={{ fontSize: 12.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>Diagnóstico OBD sem alertas · próxima troca de óleo em 1.568 km</div>
          </div>
        </div>
      </MCard>
    </div>
  );
}
function VMeta({ k, v }) {
  return (
    <span>
      <span style={{ display: 'block', fontSize: 11, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--mx-sans)' }}>{k}</span>
      <span style={{ fontFamily: 'var(--mx-num)', fontSize: 17, fontWeight: 600, color: 'var(--mx-ink)' }}>{v}</span>
    </span>
  );
}

// ============================================================
// PERFIL / ASSINATURA
// ============================================================
function ProfileScreen() {
  const { DRIVER } = MOTRIX_DATA;
  const items = [
    { icon: 'wallet', l: 'Pagamento e faturas', d: 'Mastercard ·· 4821' },
    { icon: 'vehicle', l: 'Veículo e custos', d: 'Onix 2019' },
    { icon: 'bell', l: 'Notificações', d: 'Ativadas' },
    { icon: 'shield', l: 'Privacidade e dados', d: '' },
    { icon: 'settings', l: 'Preferências do app', d: '' },
  ];
  return (
    <div style={{ padding: '0 18px 20px' }}>
      {/* profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '4px 2px 18px' }}>
        <span style={{ width: 58, height: 58, borderRadius: 999, background: 'var(--mx-sand)', color: 'var(--mx-bg)',
          display: 'grid', placeItems: 'center', fontFamily: 'var(--mx-num)', fontSize: 22, fontWeight: 700 }}>{DRIVER.initials}</span>
        <div>
          <div style={{ fontFamily: 'var(--mx-serif)', fontSize: 21, color: 'var(--mx-ink)' }}>{DRIVER.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>{DRIVER.since}</div>
        </div>
      </div>

      {/* plan card */}
      <div style={{ position: 'relative', borderRadius: 'var(--mx-r)', overflow: 'hidden', marginBottom: 18,
        background: 'linear-gradient(135deg, var(--mx-surface-2), var(--mx-surface))', border: '1px solid var(--mx-rule)', padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mark size={22} />
              <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '0.24em', color: 'var(--mx-sand)' }}>PRO</span>
            </div>
            <div style={{ fontFamily: 'var(--mx-serif)', fontStyle: 'italic', fontSize: 19, color: 'var(--mx-ink)', marginTop: 10 }}>Lucro ao vivo, ativo</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--mx-num)', fontSize: 22, fontWeight: 700, color: 'var(--mx-ink)' }}>R$ 19,90</div>
            <div style={{ fontSize: 11.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>/mês · renova 12 jun</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          {['Veredicto em tempo real', 'Recomendação de corridas', 'Relatórios MEI'].map(f => (
            <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5,
              color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>
              <span style={{ color: 'var(--mx-pos)' }}><MIcon name="check" size={13} /></span>{f}
            </span>
          ))}
        </div>
        <button style={{ width: '100%', marginTop: 18, padding: '11px', background: 'transparent',
          border: '1px solid var(--mx-rule)', borderRadius: 999, color: 'var(--mx-sand)',
          fontFamily: 'var(--mx-sans)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Gerenciar assinatura</button>
      </div>

      {/* settings list */}
      <MCard pad={0} style={{ padding: '4px 0' }}>
        {items.map((it, i) => (
          <div key={it.l} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            borderBottom: i < items.length - 1 ? '1px solid var(--mx-rule-soft)' : 'none' }}>
            <span style={{ color: 'var(--mx-sand-dim)' }}><MIcon name={it.icon} size={20} /></span>
            <span style={{ flex: 1, fontFamily: 'var(--mx-sans)', fontSize: 14.5, color: 'var(--mx-ink)' }}>{it.l}</span>
            {it.d && <span style={{ fontSize: 12.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>{it.d}</span>}
            <span style={{ color: 'var(--mx-sand-dim)' }}><MIcon name="chevron" size={16} /></span>
          </div>
        ))}
      </MCard>
      <button style={{ width: '100%', marginTop: 16, padding: '13px', background: 'none', border: '1px solid var(--mx-rule)',
        borderRadius: 'var(--mx-r)', color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', fontSize: 14, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <MIcon name="logout" size={18} /> Sair
      </button>
    </div>
  );
}

window.MOTRIX_MOBILE_SCREENS = { HomeScreen, RidesScreen, FinanceScreen, VehicleScreen, ProfileScreen };
window.PlatTag = PlatTag;

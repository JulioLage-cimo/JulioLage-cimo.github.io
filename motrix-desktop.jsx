/* ============================================================
   MOTRIX — Desktop: Veículo, Configurações + shell
   Exports to window: DesktopApp
   ============================================================ */
const { useState: deUseState } = React;

// ============================================================
// VEÍCULO + SAÚDE DO SENSOR
// ============================================================
function VehicleDesktopScreen() {
  const { VEHICLE, SENSOR } = MOTRIX_DATA;
  const DP = window.DPanel, DL = window.DLabel;
  const tele = [
    { icon: 'fuel', l: 'Combustível', v: VEHICLE.tankPct + '%', ring: VEHICLE.tankPct, c: 'var(--mx-sand)' },
    { icon: 'spark', l: 'Consumo', v: VEHICLE.kmL, u: 'km/l', ring: (VEHICLE.kmL / 16) * 100, c: 'var(--mx-pos)' },
    { icon: 'temp', l: 'Arrefecimento', v: SENSOR.coolant, u: '°C', ring: (SENSOR.coolant / 120) * 100, c: 'var(--mx-sand)' },
    { icon: 'battery', l: 'Bateria', v: SENSOR.voltage, u: 'V', ring: (SENSOR.voltage / 15) * 100, c: 'var(--mx-pos)' },
  ];
  const sensorRows = [
    ['Modelo', SENSOR.model], ['Firmware', SENSOR.firmware],
    ['Qualidade do sinal', SENSOR.signal + '%'], ['Última sincronização', SENSOR.lastSync],
    ['Tensão da bateria', SENSOR.voltage + ' V'], ['RPM em marcha lenta', SENSOR.rpmIdle],
  ];
  const maint = [
    { t: 'Troca de óleo', km: 'em 1.568 km', pct: 78, soon: true },
    { t: 'Pastilhas de freio', km: 'em 6.200 km', pct: 42 },
    { t: 'Filtro de ar', km: 'em 3.100 km', pct: 60 },
    { t: 'Pneus (rodízio)', km: 'em 2.400 km', pct: 68 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* vehicle header */}
      <DP pad={22}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ width: 60, height: 60, borderRadius: 14, background: 'var(--mx-surface-2)',
            display: 'grid', placeItems: 'center', color: 'var(--mx-sand)' }}><MIcon name="vehicle" size={32} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mx-serif)', fontSize: 24, color: 'var(--mx-ink)' }}>{VEHICLE.model} <span style={{ color: 'var(--mx-sand-dim)' }}>· {VEHICLE.year}</span></div>
            <div style={{ fontSize: 13.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', marginTop: 2 }}>{VEHICLE.fuel} · placa {VEHICLE.plate}</div>
          </div>
          <div style={{ display: 'flex', gap: 30 }}>
            <span><DL>Odômetro</DL><div style={{ fontFamily: 'var(--mx-num)', fontSize: 22, fontWeight: 600, color: 'var(--mx-ink)', marginTop: 4 }}>{MX.num(VEHICLE.odo, 0)}<span style={{ fontSize: 13, color: 'var(--mx-sand-dim)' }}> km</span></div></span>
            <span><DL>Custo / km</DL><div style={{ fontFamily: 'var(--mx-num)', fontSize: 22, fontWeight: 600, color: 'var(--mx-ink)', marginTop: 4 }}>{MX.brl(VEHICLE.custoKm)}</div></span>
          </div>
        </div>
      </DP>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* sensor health */}
        <DP title="Sensor OBD-II" action={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--mx-pos)', fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mx-pos)' }} />{SENSOR.status}</span>
        }>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
            {tele.map(t => (
              <div key={t.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
                padding: '14px 4px', background: 'var(--mx-surface-2)', borderRadius: 'var(--mx-r-sm)' }}>
                <Ring value={t.ring} size={62} thickness={5} color={t.c}>
                  <span style={{ color: 'var(--mx-sand-dim)' }}><MIcon name={t.icon} size={19} /></span>
                </Ring>
                <span style={{ fontFamily: 'var(--mx-num)', fontSize: 16, fontWeight: 600, color: 'var(--mx-ink)' }}>{t.v}<span style={{ fontSize: 11, color: 'var(--mx-sand-dim)' }}>{t.u ? ' ' + t.u : ''}</span></span>
                <span style={{ fontSize: 10.5, color: 'var(--mx-sand-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--mx-sans)' }}>{t.l}</span>
              </div>
            ))}
          </div>
          {sensorRows.map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: i < sensorRows.length - 1 ? '1px solid var(--mx-rule-soft)' : 'none', fontFamily: 'var(--mx-sans)', fontSize: 13.5 }}>
              <span style={{ color: 'var(--mx-ink-dim)' }}>{k}</span>
              <span style={{ fontFamily: 'var(--mx-num)', fontWeight: 600, color: 'var(--mx-ink)' }}>{v}</span>
            </div>
          ))}
        </DP>

        {/* diagnostics + maintenance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <DP pad={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 46, height: 46, borderRadius: 999, display: 'grid', placeItems: 'center',
                background: 'color-mix(in oklab, var(--mx-pos) 14%, transparent)', color: 'var(--mx-pos)' }}><MIcon name="shield" size={24} /></span>
              <div>
                <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 16, fontWeight: 600, color: 'var(--mx-ink)' }}>Nenhum código de falha (DTC)</div>
                <div style={{ fontSize: 13, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>Diagnóstico em dia · leitura completa há 2 min</div>
              </div>
            </div>
          </DP>
          <DP title="Manutenção prevista">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {maint.map(m => (
                <div key={m.t}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: 'var(--mx-sans)', fontSize: 13.5 }}>
                    <span style={{ color: 'var(--mx-ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {m.t}{m.soon && <span style={{ fontSize: 10, color: 'var(--mx-sand)', border: '1px solid var(--mx-rule)', borderRadius: 4, padding: '1px 6px', letterSpacing: '0.06em' }}>EM BREVE</span>}
                    </span>
                    <span style={{ fontFamily: 'var(--mx-num)', color: 'var(--mx-ink-dim)' }}>{m.km}</span>
                  </div>
                  <ProgressBar value={m.pct} height={6} color={m.soon ? 'var(--mx-sand)' : 'color-mix(in oklab, var(--mx-sand) 45%, transparent)'} />
                </div>
              ))}
            </div>
          </DP>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CONFIGURAÇÕES
// ============================================================
function SettingsScreen() {
  const { DRIVER, VEHICLE } = MOTRIX_DATA;
  const DP = window.DPanel, DL = window.DLabel;
  const [notif, setNotif] = deUseState({ corrida: true, custo: true, mei: true, manut: false });
  const Field = ({ label, value, suffix }) => (
    <div>
      <DL>{label}</DL>
      <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--mx-surface-2)',
        border: '1px solid var(--mx-rule)', borderRadius: 8, padding: '10px 12px' }}>
        <span style={{ flex: 1, fontFamily: 'var(--mx-num)', fontSize: 14.5, color: 'var(--mx-ink)' }}>{value}</span>
        {suffix && <span style={{ fontSize: 12.5, color: 'var(--mx-sand-dim)', fontFamily: 'var(--mx-sans)' }}>{suffix}</span>}
      </div>
    </div>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
      {/* left column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <DP title="Conta">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
            <span style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--mx-sand)', color: 'var(--mx-bg)',
              display: 'grid', placeItems: 'center', fontFamily: 'var(--mx-num)', fontSize: 20, fontWeight: 700 }}>{DRIVER.initials}</span>
            <div>
              <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 16, fontWeight: 600, color: 'var(--mx-ink)' }}>{DRIVER.name}</div>
              <div style={{ fontSize: 13, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>{DRIVER.email}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Telefone" value={DRIVER.phone} />
            <Field label="Cidade" value="Belo Horizonte · MG" />
          </div>
        </DP>

        <DP title="Veículo e custos">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Preço do combustível" value="R$ 6,09" suffix="/litro" />
            <Field label="Consumo médio" value={VEHICLE.kmL} suffix="km/l" />
            <Field label="Manutenção" value="R$ 0,38" suffix="/km" />
            <Field label="Depreciação" value="R$ 0,52" suffix="/km" />
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', marginTop: 14, marginBottom: 0, lineHeight: 1.5 }}>
            Esses parâmetros alimentam o cálculo de lucro por corrida. O sensor ajusta o consumo automaticamente a cada viagem.
          </p>
        </DP>
      </div>

      {/* right column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* subscription */}
        <DP pad={0}>
          <div style={{ padding: 22, background: 'linear-gradient(135deg, var(--mx-surface-2), var(--mx-surface))', borderRadius: 'var(--mx-r) var(--mx-r) 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mark size={22} />
                  <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.24em', color: 'var(--mx-sand)' }}>MOTRIX PRO</span>
                </div>
                <div style={{ fontFamily: 'var(--mx-serif)', fontStyle: 'italic', fontSize: 19, color: 'var(--mx-ink)', marginTop: 10 }}>Lucro ao vivo, ativo</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--mx-num)', fontSize: 24, fontWeight: 700, color: 'var(--mx-ink)' }}>R$ 19,90</div>
                <div style={{ fontSize: 12, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>/mês</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '16px 22px' }}>
            {[['Plano', 'Pro · mensal'], ['Próxima cobrança', '12 jun 2026'], ['Forma de pagamento', 'Mastercard ·· 4821']].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                borderBottom: i < 2 ? '1px solid var(--mx-rule-soft)' : 'none', fontFamily: 'var(--mx-sans)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--mx-ink-dim)' }}>{k}</span>
                <span style={{ color: 'var(--mx-ink)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid var(--mx-rule)', background: 'transparent',
                color: 'var(--mx-sand)', fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Trocar plano</button>
              <button style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid var(--mx-rule)', background: 'transparent',
                color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </DP>

        {/* platforms */}
        <DP title="Plataformas conectadas">
          {[['Uber', true], ['99', true], ['inDrive', false]].map(([p, on], i) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0',
              borderBottom: i < 2 ? '1px solid var(--mx-rule-soft)' : 'none' }}>
              <DPlatBadge plat={p} />
              <span style={{ flex: 1, fontFamily: 'var(--mx-sans)', fontSize: 14, color: 'var(--mx-ink)' }}>{p}</span>
              <span style={{ fontSize: 12.5, color: on ? 'var(--mx-pos)' : 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)' }}>{on ? 'Conectado' : 'Conectar'}</span>
            </div>
          ))}
        </DP>

        {/* notifications */}
        <DP title="Notificações">
          {[
            ['corrida', 'Veredicto de corrida ao vivo'],
            ['custo', 'Alertas de custo e consumo'],
            ['mei', 'Lembrete de DAS-MEI'],
            ['manut', 'Manutenção prevista'],
          ].map(([k, l], i) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', padding: '11px 0',
              borderBottom: i < 3 ? '1px solid var(--mx-rule-soft)' : 'none' }}>
              <span style={{ flex: 1, fontFamily: 'var(--mx-sans)', fontSize: 14, color: 'var(--mx-ink)' }}>{l}</span>
              <Toggle on={notif[k]} onChange={(v) => setNotif({ ...notif, [k]: v })} />
            </div>
          ))}
        </DP>
      </div>
    </div>
  );
}
function DPlatBadge({ plat }) {
  const is99 = plat === '99';
  return <span style={{ width: 34, height: 34, borderRadius: 8, display: 'grid', placeItems: 'center',
    fontFamily: 'var(--mx-num)', fontSize: 12, fontWeight: 700,
    background: is99 ? 'rgba(255,210,40,0.14)' : 'var(--mx-surface-2)',
    color: is99 ? '#e8c24a' : 'var(--mx-ink)', border: '1px solid var(--mx-rule)' }}>{plat === 'inDrive' ? 'iD' : plat === 'Uber' ? 'Ub' : plat}</span>;
}

// ============================================================
// SHELL — sidebar + topbar
// ============================================================
function Sidebar({ page, onNav }) {
  const { DRIVER } = MOTRIX_DATA;
  const nav = [
    { id: 'overview', icon: 'overview', l: 'Visão geral' },
    { id: 'rides', icon: 'rides', l: 'Corridas' },
    { id: 'reports', icon: 'report', l: 'Relatórios' },
    { id: 'vehicle', icon: 'sensor', l: 'Veículo' },
    { id: 'settings', icon: 'settings', l: 'Configurações' },
  ];
  return (
    <div style={{ width: 232, flexShrink: 0, background: 'var(--mx-bg)', borderRight: '1px solid var(--mx-rule)',
      display: 'flex', flexDirection: 'column', padding: '22px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 22px' }}>
        <Mark size={30} />
        <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 17, fontWeight: 700, letterSpacing: '0.28em', color: 'var(--mx-sand)' }}>MOTRIX</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {nav.map(n => {
          const on = page === n.id;
          return (
            <button key={n.id} onClick={() => onNav(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 9,
              border: 'none', cursor: 'pointer', textAlign: 'left',
              background: on ? 'var(--mx-surface)' : 'transparent',
              color: on ? 'var(--mx-sand)' : 'var(--mx-ink-dim)',
              fontFamily: 'var(--mx-sans)', fontSize: 14.5, fontWeight: on ? 600 : 500,
              borderLeft: on ? '2px solid var(--mx-sand)' : '2px solid transparent',
            }}>
              <MIcon name={n.icon} size={20} stroke={on ? 1.9 : 1.6} />{n.l}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 11, padding: '12px 8px',
        borderTop: '1px solid var(--mx-rule)' }}>
        <span style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--mx-sand)', color: 'var(--mx-bg)',
          display: 'grid', placeItems: 'center', fontFamily: 'var(--mx-num)', fontSize: 14, fontWeight: 700 }}>{DRIVER.initials}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 600, color: 'var(--mx-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{DRIVER.name}</div>
          <div style={{ fontSize: 11, color: 'var(--mx-sand)', fontFamily: 'var(--mx-sans)', letterSpacing: '0.1em' }}>PRO</div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ page }) {
  const titles = {
    overview: ['Visão geral', 'Quinta, 28 de maio de 2026'],
    rides: ['Corridas', '312 corridas neste mês'],
    reports: ['Relatórios', 'Fiscal, MEI e exportações'],
    vehicle: ['Veículo', 'Telemetria e saúde do sensor'],
    settings: ['Configurações', 'Conta, assinatura e preferências'],
  };
  const [t, sub] = titles[page];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px', borderBottom: '1px solid var(--mx-rule)', flexShrink: 0 }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: 'var(--mx-serif)', fontSize: 27, fontWeight: 500, color: 'var(--mx-ink)' }}>{t}</h1>
        <div style={{ fontSize: 13, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 999,
          border: '1px solid var(--mx-rule)', color: 'var(--mx-pos)', fontFamily: 'var(--mx-sans)', fontSize: 13, fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mx-pos)' }} />Online
        </span>
        <button style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--mx-rule)', background: 'var(--mx-surface)',
          color: 'var(--mx-sand-dim)', display: 'grid', placeItems: 'center', cursor: 'pointer', position: 'relative' }}>
          <MIcon name="bell" size={19} />
          <span style={{ position: 'absolute', top: 10, right: 11, width: 7, height: 7, borderRadius: 999, background: 'var(--mx-pos)' }} />
        </button>
      </div>
    </div>
  );
}

function DesktopApp({ initialPage = 'overview' } = {}) {
  const [page, setPage] = deUseState(initialPage);
  const D = window.MOTRIX_DESKTOP_SCREENS;
  const body = {
    overview: <D.OverviewScreen />,
    rides: <D.RidesTableScreen />,
    reports: <D.ReportsScreen />,
    vehicle: <VehicleDesktopScreen />,
    settings: <SettingsScreen />,
  }[page];
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--mx-bg)', fontFamily: 'var(--mx-sans)' }}>
      <Sidebar page={page} onNav={setPage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar page={page} />
        <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px 40px' }}>
          {body}
        </div>
      </div>
    </div>
  );
}

window.DesktopApp = DesktopApp;

/* ============================================================
   MOTRIX — Mobile app shell + Live overlay
   Exports to window: MobileApp
   ============================================================ */
const { useState: shUseState } = React;

// ---- stylized map background (placeholder) --------------------------------
function MapBg() {
  return (
    <svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <rect width="400" height="800" fill="#11201a" />
      <g stroke="#1c3128" strokeWidth="22" fill="none" strokeLinecap="round">
        <path d="M-20 180 L160 240 L260 200 L460 280" />
        <path d="M-20 520 L120 470 L300 560 L460 500" />
        <path d="M80 -20 L120 220 L90 470 L150 820" />
        <path d="M300 -20 L260 200 L320 560 L290 820" />
      </g>
      <g stroke="#172a22" strokeWidth="9" fill="none" strokeLinecap="round">
        <path d="M-20 340 L200 380 L460 350" />
        <path d="M-20 660 L240 690 L460 650" />
        <path d="M200 -20 L180 380 L220 820" />
      </g>
      {/* route highlight */}
      <path d="M120 600 L180 380 L260 200" stroke="var(--mx-sand)" strokeWidth="6" fill="none"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <circle cx="120" cy="600" r="9" fill="var(--mx-sand)" />
      <circle cx="260" cy="200" r="7" fill="none" stroke="var(--mx-sand)" strokeWidth="4" />
      <rect width="400" height="800" fill="#0d1814" opacity="0.34" />
    </svg>
  );
}

// ---- live verdict card (top) ----------------------------------------------
function VerdictCard() {
  const { TODAY } = MOTRIX_DATA;
  const m = [
    { k: 'R$/Km', v: MX.num(TODAY.rPerKm) },
    { k: 'R$/Hora', v: MX.num(TODAY.rPerHora) },
    { k: 'Nota', v: MX.num(TODAY.nota) },
  ];
  return (
    <div style={{
      background: 'rgba(8,14,11,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      border: '2px solid var(--mx-pos)', borderRadius: 18, padding: '14px 16px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {m.map(x => (
          <div key={x.k} style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, color: 'var(--mx-ink-dim)', fontFamily: 'var(--mx-sans)', marginBottom: 4 }}>{x.k}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 5, height: 26, borderRadius: 3, background: 'var(--mx-pos)' }} />
              <span style={{ fontFamily: 'var(--mx-num)', fontSize: 27, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{x.v}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, paddingTop: 11,
        borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <PlatTag plat="Uber" />
        <span style={{ fontFamily: 'var(--mx-num)', fontSize: 15, color: '#fff', fontWeight: 600 }}>0h 38m · 38,4 km</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
          color: 'var(--mx-pos)', fontSize: 12.5, fontWeight: 700, fontFamily: 'var(--mx-sans)' }}>
          <MIcon name="check" size={15} /> Ótima corrida
        </span>
      </div>
    </div>
  );
}

// ---- incoming offer (bottom sheet, mimics Uber) ---------------------------
function OfferSheet() {
  return (
    <div style={{ background: '#16161a', borderRadius: '22px 22px 0 0', padding: '18px 18px 26px',
      boxShadow: '0 -10px 40px rgba(0,0,0,0.4)' }}>
      <div style={{ width: 40, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.2)', margin: '0 auto 14px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.12)', padding: '3px 9px', borderRadius: 6, fontFamily: 'var(--mx-sans)' }}>UberX</span>
        <span style={{ fontSize: 12.5, color: '#7da6ff', fontFamily: 'var(--mx-sans)' }}>Aeroporto</span>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--mx-num)' }}>★ 4,89</span>
      </div>
      <div style={{ fontFamily: 'var(--mx-num)', fontSize: 38, fontWeight: 700, color: '#fff', marginBottom: 12 }}>R$ 96,30</div>
      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--mx-sans)', lineHeight: 1.5, marginBottom: 16 }}>
        7 min (3,1 km) de distância · embarque em Savassi<br />Viagem de 42 min (38,4 km) · Aeroporto de Confins
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{ flex: 1, padding: '14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)',
          background: 'transparent', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'var(--mx-sans)', cursor: 'pointer' }}>Recusar</button>
        <button style={{ flex: 2, padding: '14px', borderRadius: 999, border: 'none',
          background: 'var(--mx-pos)', color: '#06140d', fontSize: 15, fontWeight: 700, fontFamily: 'var(--mx-sans)', cursor: 'pointer' }}>Aceitar</button>
      </div>
    </div>
  );
}

// ---- full live overlay -----------------------------------------------------
function LiveOverlay({ onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, overflow: 'hidden', background: '#0d1814' }}>
      <MapBg />
      {/* top verdict + close */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '54px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <button onClick={onClose} style={{ width: 38, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'rgba(8,14,11,0.8)', color: '#fff', display: 'grid', placeItems: 'center' }}>
            <MIcon name="x" size={18} />
          </button>
        </div>
        <VerdictCard />
      </div>
      {/* motrix orb */}
      <div style={{ position: 'absolute', right: 16, top: 250, width: 50, height: 50, borderRadius: 999,
        background: 'rgba(13,24,20,0.9)', border: '1px solid var(--mx-rule)', display: 'grid', placeItems: 'center' }}>
        <Mark size={26} />
      </div>
      {/* bottom offer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <OfferSheet />
      </div>
    </div>
  );
}

// ---- tab bar ---------------------------------------------------------------
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', icon: 'today', l: 'Hoje' },
    { id: 'rides', icon: 'rides', l: 'Corridas' },
    { id: 'finance', icon: 'finance', l: 'Financeiro' },
    { id: 'vehicle', icon: 'sensor', l: 'Veículo' },
    { id: 'profile', icon: 'profile', l: 'Perfil' },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: '1px solid var(--mx-rule)', background: 'var(--mx-surface)',
      padding: '8px 6px 30px', flexShrink: 0,
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? 'var(--mx-sand)' : 'var(--mx-sand-dim)', padding: '4px 0',
          }}>
            <MIcon name={t.icon} size={22} stroke={on ? 1.9 : 1.5} />
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, fontFamily: 'var(--mx-sans)', letterSpacing: '0.01em' }}>{t.l}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---- app bar ---------------------------------------------------------------
function AppBar({ tab }) {
  const titles = { home: '', rides: 'Histórico', finance: 'Financeiro', vehicle: 'Veículo', profile: 'Perfil' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '52px 18px 10px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <Mark size={26} />
        <span style={{ fontFamily: 'var(--mx-sans)', fontSize: 15, fontWeight: 700, letterSpacing: '0.3em', color: 'var(--mx-sand)' }}>MOTRIX</span>
      </div>
      <button style={{ width: 38, height: 38, borderRadius: 999, border: '1px solid var(--mx-rule)', background: 'var(--mx-surface)',
        color: 'var(--mx-sand-dim)', display: 'grid', placeItems: 'center', cursor: 'pointer', position: 'relative' }}>
        <MIcon name="bell" size={19} />
        <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: 999, background: 'var(--mx-pos)' }} />
      </button>
    </div>
  );
}

// ---- mobile app ------------------------------------------------------------
function MobileApp() {
  const [tab, setTab] = shUseState('home');
  const [live, setLive] = shUseState(false);
  const S = window.MOTRIX_MOBILE_SCREENS;
  const screen = {
    home: <S.HomeScreen onOpenLive={() => setLive(true)} go={setTab} />,
    rides: <S.RidesScreen />,
    finance: <S.FinanceScreen />,
    vehicle: <S.VehicleScreen />,
    profile: <S.ProfileScreen />,
  }[tab];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--mx-bg)',
      position: 'relative', overflow: 'hidden' }}>
      <AppBar tab={tab} />
      <div style={{ flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {screen}
      </div>
      <TabBar active={tab} onChange={setTab} />
      {live && <LiveOverlay onClose={() => setLive(false)} />}
    </div>
  );
}

window.MobileApp = MobileApp;

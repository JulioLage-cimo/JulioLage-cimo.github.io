/* ============================================================
   MOTRIX — shared UI primitives
   Exports to window: MIcon, Mark, Badge, StatTile, SparkBars,
     AreaChart, BarChart, Donut, Ring, ProgressBar, Toggle, Seg, Pill
   ============================================================ */

// ---- icon set (geometric, Motrix vocabulary) -------------------------------
function MIcon({ name, size = 20, stroke = 1.6, color = 'currentColor' }) {
  const p = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    today: <g {...p}><path d="M3 17h18" /><path d="M6 17a6 6 0 0 1 12 0" /><path d="M12 3v3M4 7l2 2M20 7l-2 2" /></g>,
    rides: <g {...p}><circle cx="7" cy="6" r="2.2" /><circle cx="17" cy="18" r="2.2" /><path d="M7 8.2v4.3a3.5 3.5 0 0 0 3.5 3.5H14" /></g>,
    finance: <g {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
    vehicle: <g {...p}><path d="M3 13l1.8-5.2A2 2 0 0 1 6.7 6.4h10.6a2 2 0 0 1 1.9 1.4L21 13v5h-3v-2H6v2H3z" /><circle cx="7" cy="16" r="1" /><circle cx="17" cy="16" r="1" /></g>,
    sensor: <g {...p}><rect x="6" y="8" width="12" height="9" rx="2" /><path d="M9 8V5M15 8V5M9 17v2M15 17v2M6 11H3M6 14H3M21 11h-3M21 14h-3" /></g>,
    profile: <g {...p}><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></g>,
    overview: <g {...p}><rect x="3" y="3" width="7" height="7" rx="1.2" /><rect x="14" y="3" width="7" height="7" rx="1.2" /><rect x="3" y="14" width="7" height="7" rx="1.2" /><rect x="14" y="14" width="7" height="7" rx="1.2" /></g>,
    report: <g {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6M9 8h2" /></g>,
    settings: <g {...p}><path d="M3 7h12M3 12h8M3 17h14" /><circle cx="18" cy="7" r="2" /><circle cx="14" cy="12" r="2" /><circle cx="20" cy="17" r="2" /></g>,
    export: <g {...p}><path d="M12 3v11M8 10l4 4 4-4M5 19h14" /></g>,
    check: <g {...p}><path d="M5 12l4 4 10-11" /></g>,
    x: <g {...p}><path d="M6 6l12 12M18 6L6 18" /></g>,
    fuel: <g {...p}><path d="M5 21V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16M4 21h11" /><path d="M13 9h3a2 2 0 0 1 2 2v6a1.6 1.6 0 0 0 3 0V8l-3-3" /></g>,
    temp: <g {...p}><path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z" /></g>,
    battery: <g {...p}><rect x="3" y="8" width="16" height="9" rx="2" /><path d="M21 11v3" /><path d="M6 11v3M9 11v3M12 11v3" /></g>,
    bolt: <g {...p}><path d="M13 3L5 13h6l-1 8 8-10h-6z" /></g>,
    bell: <g {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 0 0 4 0" /></g>,
    search: <g {...p}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4-4" /></g>,
    chevron: <g {...p}><path d="M9 6l6 6-6 6" /></g>,
    chevdown: <g {...p}><path d="M6 9l6 6 6-6" /></g>,
    plus: <g {...p}><path d="M12 5v14M5 12h14" /></g>,
    arrow: <g {...p}><path d="M5 12h13M13 6l6 6-6 6" /></g>,
    calendar: <g {...p}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></g>,
    pin: <g {...p}><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></g>,
    clock: <g {...p}><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></g>,
    shield: <g {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></g>,
    wallet: <g {...p}><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18M16 14h2" /></g>,
    spark: <g {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /></g>,
    house: <g {...p}><path d="M4 11l8-7 8 7M6 10v9h12v-9" /></g>,
    logout: <g {...p}><path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8M10 12h10M16 8l4 4-4 4" /></g>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

// ---- brand mark ------------------------------------------------------------
function Mark({ size = 26, opacity = 1 }) {
  return (
    <img src={(window.__resources && window.__resources.motrixMark) || "app-assets/motrix-mark.png"} alt="Motrix"
      style={{ width: size, height: size * 0.545, objectFit: 'contain', opacity, display: 'block' }} />
  );
}

// ---- classification badge --------------------------------------------------
function Badge({ cls, size = 'md' }) {
  const c = MX.CLASS[cls];
  const pad = size === 'sm' ? '3px 8px' : '4px 11px';
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: pad,
      borderRadius: 999, border: `1px solid color-mix(in oklab, ${c.color} 40%, transparent)`,
      background: `color-mix(in oklab, ${c.color} 12%, transparent)`,
      color: c.color, fontSize: fs, fontWeight: 600, letterSpacing: '0.04em',
      fontFamily: 'var(--mx-sans)', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.dot }} />
      {c.label}
    </span>
  );
}

// ---- generic pill / tag ----------------------------------------------------
function Pill({ children, tone = 'sand', style = {} }) {
  const tones = {
    sand: { c: 'var(--mx-sand)', b: 'var(--mx-rule)' },
    pos: { c: 'var(--mx-pos)', b: 'color-mix(in oklab, var(--mx-pos) 40%, transparent)' },
    dim: { c: 'var(--mx-ink-dim)', b: 'var(--mx-rule)' },
  };
  const t = tones[tone] || tones.sand;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
      borderRadius: 999, border: `1px solid ${t.b}`, color: t.c,
      fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
      fontFamily: 'var(--mx-sans)', ...style,
    }}>{children}</span>
  );
}

// ---- sparkbars (lucro por hora) --------------------------------------------
function SparkBars({ data, color = 'var(--mx-sand)', height = 40, gap = 3 }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap, height }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${Math.max(8, (v / max) * 100)}%`,
          background: color, opacity: 0.35 + 0.65 * (v / max), borderRadius: 2,
        }} />
      ))}
    </div>
  );
}

// ---- stat tile -------------------------------------------------------------
function StatTile({ label, value, sub, accent, delta, icon }) {
  return (
    <div style={{
      padding: '16px 18px', border: '1px solid var(--mx-rule)', borderRadius: 'var(--mx-r)',
      background: 'var(--mx-surface)', display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--mx-ink-dim)' }}>
        <span style={{ fontSize: 12.5, letterSpacing: '0.04em', fontFamily: 'var(--mx-sans)' }}>{label}</span>
        {icon && <span style={{ color: 'var(--mx-sand-dim)' }}><MIcon name={icon} size={16} /></span>}
      </div>
      <div style={{
        fontFamily: 'var(--mx-num)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em',
        color: accent || 'var(--mx-ink)', fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>
      {(sub || delta != null) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'var(--mx-sans)' }}>
          {delta != null && (
            <span style={{ color: delta >= 0 ? 'var(--mx-pos)' : 'var(--mx-neg)', fontWeight: 600, fontFamily: 'var(--mx-num)' }}>
              {MX.pct(delta)}
            </span>
          )}
          {sub && <span style={{ color: 'var(--mx-ink-dim)' }}>{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ---- area + line chart (SVG) ----------------------------------------------
function AreaChart({ data, w = 640, h = 200, color = 'var(--mx-sand)', fill = true, pad = 6 }) {
  const max = Math.max(...data, 1);
  const n = data.length;
  const X = (i) => pad + (i / (n - 1)) * (w - pad * 2);
  const Y = (v) => h - pad - (v / max) * (h - pad * 2);
  const pts = data.map((v, i) => `${X(i)},${Y(v)}`);
  const line = 'M' + pts.join(' L');
  const area = `${line} L${X(n - 1)},${h - pad} L${X(0)},${h - pad} Z`;
  const gid = 'g' + Math.random().toString(36).slice(2, 8);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1={pad} x2={w - pad} y1={h * f} y2={h * f} stroke="var(--mx-rule-soft)" strokeWidth="1" />
      ))}
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// ---- bar chart (SVG, monthly) ---------------------------------------------
function BarChart({ data, labels, w = 640, h = 200, color = 'var(--mx-sand)', highlight }) {
  const max = Math.max(...data, 1);
  const n = data.length;
  const slot = w / n;
  const bw = slot * 0.5;
  return (
    <svg viewBox={`0 0 ${w} ${h + 22}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {data.map((v, i) => {
        const bh = (v / max) * (h - 10);
        const x = i * slot + (slot - bw) / 2;
        const hot = highlight === i;
        return (
          <g key={i}>
            <rect x={x} y={h - bh} width={bw} height={bh} rx="2"
              fill={hot ? color : `color-mix(in oklab, ${color} 38%, transparent)`} />
            {labels && <text x={x + bw / 2} y={h + 16} textAnchor="middle"
              fontSize="11" fontFamily="var(--mx-sans)"
              fill={hot ? 'var(--mx-sand)' : 'var(--mx-ink-dim)'}>{labels[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// ---- donut (classification split) -----------------------------------------
function Donut({ segments, size = 132, thickness = 16, children }) {
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.v, 0) || 1;
  let off = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--mx-rule-soft)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.v / total) * C;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={s.color} strokeWidth={thickness} strokeLinecap="butt"
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} />
          );
          off += len;
          return el;
        })}
      </svg>
      {children && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{children}</div>
      )}
    </div>
  );
}

// ---- radial ring gauge -----------------------------------------------------
function Ring({ value, max = 100, size = 64, thickness = 6, color = 'var(--mx-sand)', children }) {
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const len = Math.min(1, value / max) * C;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--mx-rule)" strokeWidth={thickness} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness}
          strokeLinecap="round" strokeDasharray={`${len} ${C - len}`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}

// ---- progress bar ----------------------------------------------------------
function ProgressBar({ value, max = 100, color = 'var(--mx-sand)', height = 8 }) {
  return (
    <div style={{ height, borderRadius: 999, background: 'var(--mx-rule-soft)', overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  );
}

// ---- toggle ----------------------------------------------------------------
function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: 46, height: 27, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: on ? 'var(--mx-pos)' : 'var(--mx-rule)', position: 'relative',
      transition: 'background .2s', padding: 0,
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 22 : 3, width: 21, height: 21, borderRadius: 999,
        background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)',
      }} />
    </button>
  );
}

// ---- segmented control -----------------------------------------------------
function Seg({ options, value, onChange, size = 'md' }) {
  const pad = size === 'sm' ? '6px 12px' : '8px 16px';
  const fs = size === 'sm' ? 12.5 : 13.5;
  return (
    <div style={{ display: 'inline-flex', padding: 3, gap: 2, background: 'var(--mx-surface-2)',
      borderRadius: 999, border: '1px solid var(--mx-rule)' }}>
      {options.map(o => {
        const v = typeof o === 'string' ? o : o.v;
        const l = typeof o === 'string' ? o : o.l;
        const active = v === value;
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            padding: pad, borderRadius: 999, border: 'none', cursor: 'pointer',
            fontSize: fs, fontWeight: 600, fontFamily: 'var(--mx-sans)', letterSpacing: '0.01em',
            background: active ? 'var(--mx-sand)' : 'transparent',
            color: active ? 'var(--mx-bg)' : 'var(--mx-ink-dim)', transition: 'all .16s', whiteSpace: 'nowrap',
          }}>{l}</button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  MIcon, Mark, Badge, Pill, SparkBars, StatTile, AreaChart, BarChart, Donut, Ring, ProgressBar, Toggle, Seg,
});

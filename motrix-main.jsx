/* ============================================================
   MOTRIX — main: canvas + tweaks
   ============================================================ */
const { useEffect: aUseEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "corLucro": "#6fcf97",
  "acento": "#ccbfa7",
  "raio": 16
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  aUseEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--mx-pos', t.corLucro);
    root.style.setProperty('--mx-sand', t.acento);
    root.style.setProperty('--mx-sand-dim', `color-mix(in oklab, ${t.acento} 60%, transparent)`);
    root.style.setProperty('--mx-rule', `color-mix(in oklab, ${t.acento} 18%, transparent)`);
    root.style.setProperty('--mx-rule-soft', `color-mix(in oklab, ${t.acento} 9%, transparent)`);
    root.style.setProperty('--mx-r', t.raio + 'px');
    root.style.setProperty('--mx-r-sm', Math.max(6, t.raio - 5) + 'px');
  }, [t.corLucro, t.acento, t.raio]);

  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="mobile" title="App do motorista · Mobile"
          subtitle="iOS · navegação por abas · toque em “Lucro ao vivo” para ver o overlay">
          <DCArtboard id="m-app" label="Motrix · iOS" width={393} height={852}>
            <IOSDevice dark width={393} height={852}>
              <MobileApp />
            </IOSDevice>
          </DCArtboard>
        </DCSection>

        <DCSection id="desktop" title="Área logada · Desktop"
          subtitle="app.motrix.com.br · navegue pela barra lateral">
          <DCArtboard id="d-app" label="Motrix · Web" width={1280} height={812}>
            <ChromeWindow width={1280} height={812} url="app.motrix.com.br"
              tabs={[{ title: 'Motrix · Painel' }]}>
              <DesktopApp />
            </ChromeWindow>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel>
        <TweakSection label="Cores" />
        <TweakColor label="Cor do lucro" value={t.corLucro}
          options={['#6fcf97', '#9fd9b1', '#7fd6c4', '#c9b27a']}
          onChange={(v) => setTweak('corLucro', v)} />
        <TweakColor label="Acento da marca" value={t.acento}
          options={['#ccbfa7', '#d9cba8', '#c2a87e', '#bfc4b4']}
          onChange={(v) => setTweak('acento', v)} />
        <TweakSection label="Forma" />
        <TweakSlider label="Raio dos cartões" value={t.raio} min={4} max={22} unit="px"
          onChange={(v) => setTweak('raio', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

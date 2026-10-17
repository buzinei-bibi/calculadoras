import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CALCULADORAS } from "../../data/calculadoras";
import "./HeroCalculadoras.css";

// tempo de cada slide: troca logo depois do "resultado" da cena
const DURACAO_MS = 4600;

// ---------- cenas animadas (SVG) ----------
// cada cena mostra a conta acontecendo e termina no resultado, quando o banner troca

// tinta: o rolo pinta a parede e a lata mostra quantos litros
function CenaTinta() {
  return (
    <svg viewBox="0 0 400 400" className="hc-cena">
      {/* medidas da parede */}
      <g className="hc-medida">
        <path d="M70 318 H330 M70 312 V324 M330 312 V324" />
        <text x="200" y="344" textAnchor="middle">4 m</text>
        <path d="M44 90 V290 M38 90 H50 M38 290 H50" />
        <text x="30" y="194" textAnchor="middle" transform="rotate(-90 30 194)">2,8 m</text>
      </g>

      {/* parede + tinta */}
      <rect x="70" y="90" width="260" height="200" rx="8" className="hc-parede" />
      <rect x="70" y="90" width="260" height="200" rx="8" className="tn-tinta" />

      {/* rolo de pintura (cilindro + cabo) */}
      <g className="tn-rolo">
        <rect x="-13" y="80" width="26" height="220" rx="13" className="tn-cilindro" />
        <path d="M13 190 H34 V330 L28 360" className="tn-cabo" />
        <rect x="18" y="352" width="18" height="34" rx="6" transform="rotate(12 27 369)" className="tn-pega" />
      </g>

      {/* lata com o resultado */}
      <g className="tn-lata">
        <path d="M296 42 Q 326 14 356 42" className="tn-alca" />
        <rect x="286" y="40" width="80" height="78" rx="10" className="tn-lata-corpo" />
        <text x="326" y="88" textAnchor="middle" className="hc-num">5,6 L</text>
      </g>
    </svg>
  );
}

// metros: a trena abre e os valores aparecem
function CenaMetros() {
  return (
    <svg viewBox="0 0 400 400" className="hc-cena">
      <defs>
        <pattern id="hc-marcas" width="12.5" height="30" patternUnits="userSpaceOnUse" x="110">
          <path d="M0 0 V9" stroke="#140f02" strokeWidth="1.6" />
        </pattern>
      </defs>

      {/* resultado */}
      <g className="mt-linha mt-l1">
        <text x="200" y="98" textAnchor="middle" className="hc-num hc-num-xl">1 m</text>
      </g>
      <g className="mt-linha mt-l2">
        <text x="200" y="140" textAnchor="middle" className="hc-sub">= 100 cm</text>
      </g>
      <g className="mt-linha mt-l3">
        <text x="200" y="172" textAnchor="middle" className="hc-sub">= 1000 mm</text>
      </g>

      {/* fita (abre da esquerda para a direita) */}
      <g className="mt-fita">
        <rect x="110" y="232" width="252" height="30" className="mt-fita-fundo" />
        <rect x="110" y="232" width="252" height="30" fill="url(#hc-marcas)" />
        <path d="M110 232 V250 M235 232 V250 M360 232 V250" stroke="#140f02" strokeWidth="2.4" />
        <text x="116" y="258" className="mt-fita-txt">0</text>
        <text x="241" y="258" className="mt-fita-txt">50</text>
        <text x="330" y="258" className="mt-fita-txt" textAnchor="end">100</text>
      </g>
      {/* ponteira da fita */}
      <g className="mt-ponta">
        <rect x="0" y="226" width="7" height="42" rx="2" className="mt-ponta-ret" />
      </g>

      {/* caixa da trena */}
      <rect x="28" y="196" width="104" height="104" rx="22" className="mt-caixa" />
      <circle cx="80" cy="248" r="26" className="mt-miolo" />
      <circle cx="80" cy="248" r="8" className="mt-centro" />
      <rect x="44" y="296" width="72" height="12" rx="6" className="mt-trava" />
    </svg>
  );
}

// matemática: o número entra e saem dobro, triplo e raiz
function CenaMatematica() {
  const linhas = [
    { op: "×2", res: "18", y: 168 },
    { op: "×3", res: "27", y: 238 },
    { op: "√", res: "3", y: 308 },
  ];
  return (
    <svg viewBox="0 0 400 400" className="hc-cena">
      {/* visor com o número */}
      <g className="mm-visor">
        <rect x="140" y="40" width="120" height="76" rx="16" className="mm-visor-ret" />
        <text x="200" y="96" textAnchor="middle" className="hc-num hc-num-xl">9</text>
      </g>
      {/* ligações */}
      <path d="M200 116 V134 H86 V318 M86 168 H104 M86 238 H104 M86 308 H104" className="mm-ramo" />

      {linhas.map((l, i) => (
        <g key={l.op} className={`mm-linha mm-l${i + 1}`}>
          <rect x="104" y={l.y - 30} width="236" height="60" rx="14" className="mm-linha-ret" />
          <rect x="112" y={l.y - 22} width="64" height="44" rx="10" className="mm-op-ret" />
          <text x="144" y={l.y + 9} textAnchor="middle" className="mm-op">{l.op}</text>
          <text x="318" y={l.y + 12} textAnchor="end" className="hc-num">{l.res}</text>
        </g>
      ))}
    </svg>
  );
}

// sequência: os números sobem uma escada, um de cada vez
function CenaSequencia() {
  const passos = Array.from({ length: 8 }, (_, i) => ({ n: i, x: 52 + i * 42, y: 318 - i * 32 }));
  return (
    <svg viewBox="0 0 400 400" className="hc-cena">
      <polyline points={passos.map((p) => `${p.x},${p.y}`).join(" ")} className="sq-trilha" pathLength="1" />
      {passos.map((p) => (
        <g key={p.n} className="sq-passo" style={{ "--i": p.n }}>
          <g transform={`translate(${p.x} ${p.y})`}>
            <g className="sq-pula">
              <circle r="19" className={p.n === 7 ? "sq-bola sq-bola-fim" : "sq-bola"} />
              <text y="7" textAnchor="middle" className="sq-txt">{p.n}</text>
            </g>
          </g>
        </g>
      ))}
      <text x="364" y="58" className="sq-reticencias">…</text>
    </svg>
  );
}

// celsius: o termômetro sobe e a leitura vira de °C para °F
function CenaCelsius() {
  return (
    <svg viewBox="0 0 400 400" className="hc-cena">
      {/* escala °C (esquerda) e °F (direita) */}
      <g className="cs-escala">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <path key={i} d={`M${i % 5 === 0 ? 150 : 158} ${272 - i * 19} H170 M230 ${272 - i * 19} H${i % 5 === 0 ? 250 : 242}`} />
        ))}
      </g>
      <g className="cs-rotulos">
        <text x="142" y="278" textAnchor="end">0°</text>
        <text x="142" y="183" textAnchor="end">25°</text>
        <text x="142" y="88" textAnchor="end">50°</text>
      </g>
      <g className="cs-rotulos cs-rotulos-f">
        <text x="258" y="278">32°</text>
        <text x="258" y="183">77°</text>
        <text x="258" y="88">122°</text>
      </g>

      {/* tubo + bulbo */}
      <rect x="176" y="50" width="48" height="262" rx="24" className="cs-tubo" />
      <circle cx="200" cy="322" r="40" className="cs-tubo" />
      <rect x="188" y="82" width="24" height="230" rx="12" className="cs-mercurio" />
      <circle cx="200" cy="322" r="30" className="cs-bulbo" />

      {/* leitura que vira */}
      <g className="cs-leitura">
        <g className="cs-c">
          <text x="338" y="248" textAnchor="middle" className="hc-num">25 °C</text>
        </g>
        <g className="cs-f">
          <text x="338" y="248" textAnchor="middle" className="hc-num">77 °F</text>
        </g>
      </g>
      <g className="cs-k">
        <rect x="294" y="270" width="88" height="40" rx="20" className="cs-k-ret" />
        <text x="338" y="297" textAnchor="middle" className="cs-k-txt">298 K</text>
      </g>
    </svg>
  );
}

// escolar: a conta aparece no quadro e a média é circulada
function CenaEscolar() {
  return (
    <svg viewBox="0 0 400 400" className="hc-cena">
      {/* quadro-negro */}
      <rect x="34" y="62" width="332" height="236" rx="12" className="es-moldura" />
      <rect x="46" y="74" width="308" height="212" rx="6" className="es-quadro" />
      <rect x="120" y="298" width="160" height="10" rx="4" className="es-moldura" />
      <rect x="218" y="292" width="34" height="8" rx="3" className="es-giz" />

      <g className="es-linha es-l1">
        <text x="200" y="132" textAnchor="middle" className="es-giz-txt">7,5 + 8,5</text>
      </g>
      <g className="es-linha es-l2">
        <text x="200" y="182" textAnchor="middle" className="es-giz-txt">÷ 2</text>
      </g>
      <g className="es-linha es-l3">
        <text x="200" y="256" textAnchor="middle" className="hc-num hc-num-xl">8,0</text>
      </g>
      <ellipse cx="200" cy="240" rx="72" ry="36" className="es-circulo" pathLength="1" />
    </svg>
  );
}

const CENAS = {
  tinta: CenaTinta,
  meters: CenaMetros,
  matematica: CenaMatematica,
  sequencia: CenaSequencia,
  celsius: CenaCelsius,
  escolar: CenaEscolar,
};

function Cena({ id }) {
  const Componente = CENAS[id];
  return <Componente />;
}

function PausaIcone({ pausado }) {
  return pausado ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="5" height="16" rx="1.5" />
      <rect x="14" y="4" width="5" height="16" rx="1.5" />
    </svg>
  );
}

// banner principal: troca de calculadora sozinho depois de cada conta (pausa no mouse/teclado)
function HeroCalculadoras() {
  const [atual, setAtual] = useState(0);
  const [trocas, setTrocas] = useState(0);
  const [pausado, setPausado] = useState(false);
  // começa "apagado" e liga no primeiro quadro: a pessoa vê a animação de entrada inteira
  const [entrou, setEntrou] = useState(false);
  const abasRef = useRef([]);
  const calc = CALCULADORAS[atual];
  const total = CALCULADORAS.length;

  useEffect(() => {
    const id = setTimeout(() => setEntrou(true), 80);
    return () => clearTimeout(id);
  }, []);

  function ir(i, focar = false) {
    const destino = (i + total) % total;
    if (focar) abasRef.current[destino]?.focus();
    if (destino === atual) return;
    setAtual(destino);
    setTrocas((t) => t + 1);
  }

  function aoTeclar(e) {
    const mapa = { ArrowRight: atual + 1, ArrowLeft: atual - 1, Home: 0, End: total - 1 };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    ir(mapa[e.key], true);
  }

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Calculadoras"
      style={{ "--hc-autoplay": `${DURACAO_MS}ms`, "--c": calc.cor, "--c-ink": calc.tinta }}
      className={`hc ${pausado ? "is-paused" : ""}`}
    >
      {/* faixa que varre a tela a cada troca (remonta para reiniciar) */}
      {entrou && <div key={trocas} className="hc-sweep" aria-hidden="true" />}

      <div className="hc-stage">
        {/* textos */}
        <div id="hc-painel" role="tabpanel" aria-labelledby={`hc-aba-${calc.id}`} className="hc-copy">
          {CALCULADORAS.map((c, i) => {
            const ativo = i === atual;
            return (
              <article key={c.id} className={`hc-slide ${entrou && ativo ? "is-active" : ""}`} aria-hidden={!ativo} inert={!ativo}>
                <p className="hc-eyebrow hc-anim">
                  CALCULADORA {String(i + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")}</span>
                </p>
                {/* só o slide ativo é o título da página */}
                {ativo ? <h1 className="hc-title hc-anim">{c.nome}</h1> : <p className="hc-title hc-anim">{c.nome}</p>}
                <p className="hc-text hc-anim">{c.frase}</p>
                <Link to={c.rota} className="hc-cta hc-anim">
                  <span>CALCULAR AGORA</span>
                  <span className="hc-arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </div>

        {/* visual: a conta acontecendo */}
        <div className="hc-visual" aria-hidden="true">
          {CALCULADORAS.map((c, i) => (
            <div key={c.id} className={`hc-visual-slide ${entrou && i === atual ? "is-active" : ""}`}>
              <Cena id={c.id} />
            </div>
          ))}
        </div>
      </div>

      {/* abas */}
      <div className="hc-cards">
        <div role="tablist" aria-label="Escolha a calculadora" onKeyDown={aoTeclar} className="hc-tablist">
          {CALCULADORAS.map((c, i) => {
            const ativo = i === atual;
            return (
              <button
                key={c.id}
                ref={(el) => (abasRef.current[i] = el)}
                id={`hc-aba-${c.id}`}
                role="tab"
                aria-selected={ativo}
                aria-controls="hc-painel"
                tabIndex={ativo ? 0 : -1}
                style={{ "--c": c.cor, "--c-ink": c.tinta }}
                onClick={() => ir(i)}
                className={`hc-card ${ativo ? "is-active" : ""}`}
              >
                <span className="hc-card-inner">
                  <span className="hc-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hc-name">{c.nome}</span>
                </span>
                {entrou && ativo && <span key={trocas} className="hc-progress" onAnimationEnd={() => ir(atual + 1)} />}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-label={pausado ? "Continuar troca automática" : "Pausar troca automática"}
          className="hc-pause"
        >
          <PausaIcone pausado={pausado} />
        </button>
      </div>
    </section>
  );
}

export default HeroCalculadoras;

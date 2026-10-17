import { Link } from "react-router-dom";
import { CALCULADORAS } from "../../data/calculadoras";
import "./Calc.css";

// página padrão de calculadora: apresentação à esquerda, painel com campos e resultados à direita
export default function CalcLayout({ id, children, resultados, podeLimpar, onLimpar }) {
  const indice = CALCULADORAS.findIndex((c) => c.id === id);
  const calc = CALCULADORAS[indice];
  const total = CALCULADORAS.length;
  const anterior = CALCULADORAS[(indice - 1 + total) % total];
  const proxima = CALCULADORAS[(indice + 1) % total];

  return (
    <section className="calc" style={{ "--c": calc.cor, "--c-ink": calc.tinta }}>
      <div className="calc-wrap">
        <div className="calc-intro">
          <Link to="/" className="calc-voltar">
            <span aria-hidden="true">←</span> TODAS AS CALCULADORAS
          </Link>
          <p className="calc-eyebrow">
            CALCULADORA {String(indice + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")}</span>
          </p>
          <h1 className="calc-title">{calc.nome}</h1>
          <p className="calc-desc">{calc.descricao}</p>
          <p className="calc-formula">
            <span>FÓRMULA</span>
            {calc.formula}
          </p>
        </div>

        <div className="calc-painel">
          <form className="calc-form" onSubmit={(e) => e.preventDefault()} noValidate>
            {children}
          </form>

          <div className="calc-resultados" aria-live="polite">
            <div className="calc-res-topo">
              <p className="calc-res-titulo">RESULTADO</p>
              <button type="button" className="calc-limpar" onClick={onLimpar} disabled={!podeLimpar}>
                LIMPAR
              </button>
            </div>
            {resultados}
          </div>
        </div>
      </div>

      <nav className="calc-nav" aria-label="Outras calculadoras">
        <Link to={anterior.rota} className="calc-nav-link" style={{ "--c": anterior.cor }}>
          <span className="calc-nav-dica">← ANTERIOR</span>
          <span className="calc-nav-nome">{anterior.nome}</span>
        </Link>
        <Link to={proxima.rota} className="calc-nav-link calc-nav-prox" style={{ "--c": proxima.cor }}>
          <span className="calc-nav-dica">PRÓXIMA →</span>
          <span className="calc-nav-nome">{proxima.nome}</span>
        </Link>
      </nav>
    </section>
  );
}

// campo numérico grande com a unidade dentro
export function Campo({ id, label, unidade, erro, autoFocus, ...props }) {
  return (
    <div className="calc-campo">
      <label htmlFor={id}>{label}</label>
      <div className={`calc-input ${erro ? "tem-erro" : ""}`}>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          autoFocus={autoFocus}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
          {...props}
        />
        {unidade && <span className="calc-unidade">{unidade}</span>}
      </div>
      {erro && (
        <p id={`${id}-erro`} className="calc-erro">
          {erro}
        </p>
      )}
    </div>
  );
}

// número de resultado; destaque = o principal da conta (maior e na cor da calculadora)
export function Resultado({ label, valor, unidade, destaque = false }) {
  const vazio = valor === null || valor === undefined;
  return (
    <div className={`calc-res ${destaque ? "is-destaque" : ""} ${vazio ? "is-vazio" : ""}`}>
      <p className="calc-res-label">{label}</p>
      <p className="calc-res-valor">
        {/* key: o número "pisca" ao mudar */}
        <span key={vazio ? "vazio" : valor}>{vazio ? "—" : valor}</span>
        {!vazio && unidade && <small>{unidade}</small>}
      </p>
    </div>
  );
}

import { useState } from "react";
import CalcLayout, { Campo, Resultado } from "../../components/Calc/Calc";
import { formatar, lerNumero } from "../../data/calculadoras";

// acima disso a lista vira uma parede de números; mostramos só a contagem e a soma
const LIMITE_LISTA = 500;

export default function Sequencia() {
  const [numero, setNumero] = useState("");

  const n = lerNumero(numero);
  const ok = Number.isInteger(n) && n >= 0;
  const erro = numero && !ok ? "informe um número inteiro, de 0 para cima" : null;
  const sequencia = ok && n <= LIMITE_LISTA ? Array.from({ length: n + 1 }, (_, i) => i) : [];

  return (
    <CalcLayout
      id="sequencia"
      podeLimpar={numero !== ""}
      onLimpar={() => setNumero("")}
      resultados={
        <>
          <div className="calc-grade">
            <Resultado destaque label="números na sequência" valor={ok ? formatar(n + 1) : null} />
            <Resultado label="último" valor={ok ? formatar(n) : null} />
            <Resultado label="soma de todos" valor={ok ? formatar((n * (n + 1)) / 2) : null} />
          </div>
          {sequencia.length > 0 && (
            // key: a lista anima de novo a cada número novo
            <div key={n} className="calc-chips" aria-label={`números de 0 até ${n}`}>
              {sequencia.map((i) => (
                <span key={i} className="calc-chip" style={{ "--i": i }}>
                  {i}
                </span>
              ))}
            </div>
          )}
          {ok && n > LIMITE_LISTA && <p className="calc-aviso">a lista aparece para números até {LIMITE_LISTA}.</p>}
        </>
      }
    >
      <Campo id="numero-limite" label="até qual número?" inputMode="numeric" placeholder="7" value={numero} onChange={(e) => setNumero(e.target.value)} erro={erro} autoFocus />
    </CalcLayout>
  );
}

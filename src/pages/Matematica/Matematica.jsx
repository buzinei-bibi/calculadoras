import { useState } from "react";
import CalcLayout, { Campo, Resultado } from "../../components/Calc/Calc";
import { formatar, lerNumero } from "../../data/calculadoras";

export default function Operacoes() {
  const [numero, setNumero] = useState("");

  const n = lerNumero(numero);
  const ok = Number.isFinite(n);
  const erro = numero && !ok ? "use só números, ex: 9 ou 2,5" : null;

  return (
    <CalcLayout
      id="matematica"
      podeLimpar={numero !== ""}
      onLimpar={() => setNumero("")}
      resultados={
        <>
          <div className="calc-grade">
            <Resultado destaque label="raiz quadrada" valor={ok && n >= 0 ? formatar(Math.sqrt(n), 4) : null} />
            <Resultado label="dobro" valor={ok ? formatar(n * 2) : null} />
            <Resultado label="triplo" valor={ok ? formatar(n * 3) : null} />
          </div>
          {ok && n < 0 && <p className="calc-aviso">número negativo não tem raiz quadrada real.</p>}
        </>
      }
    >
      <Campo id="numero" label="número inteiro ou real" placeholder="9" value={numero} onChange={(e) => setNumero(e.target.value)} erro={erro} autoFocus />
    </CalcLayout>
  );
}

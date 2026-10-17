import { useState } from "react";
import CalcLayout, { Campo, Resultado } from "../../components/Calc/Calc";
import { formatar, lerNumero } from "../../data/calculadoras";

export default function Meters() {
  const [metros, setMetros] = useState("");

  const m = lerNumero(metros);
  const ok = Number.isFinite(m);
  const erro = metros && !ok ? "use só números, ex: 1,5" : null;

  return (
    <CalcLayout
      id="meters"
      podeLimpar={metros !== ""}
      onLimpar={() => setMetros("")}
      resultados={
        <div className="calc-grade">
          <Resultado destaque label="centímetros" valor={ok ? formatar(m * 100) : null} unidade="cm" />
          <Resultado label="milímetros" valor={ok ? formatar(m * 1000) : null} unidade="mm" />
          <Resultado label="quilômetros" valor={ok ? formatar(m / 1000, 5) : null} unidade="km" />
        </div>
      }
    >
      <Campo id="metros" label="valor em metros" unidade="m" placeholder="1,5" value={metros} onChange={(e) => setMetros(e.target.value)} erro={erro} autoFocus />
    </CalcLayout>
  );
}

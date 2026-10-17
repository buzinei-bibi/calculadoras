import { useState } from "react";
import CalcLayout, { Campo, Resultado } from "../../components/Calc/Calc";
import { formatar, lerNumero } from "../../data/calculadoras";

export default function Celsius() {
  const [celsius, setCelsius] = useState("");

  const c = lerNumero(celsius);
  const ok = Number.isFinite(c);
  const erro = celsius && !ok ? "use só números, ex: 25 ou -3,5" : null;

  return (
    <CalcLayout
      id="celsius"
      podeLimpar={celsius !== ""}
      onLimpar={() => setCelsius("")}
      resultados={
        <>
          <div className="calc-grade">
            <Resultado destaque label="fahrenheit" valor={ok ? formatar((c * 9) / 5 + 32) : null} unidade="°F" />
            <Resultado label="kelvin" valor={ok ? formatar(c + 273.15) : null} unidade="K" />
            <Resultado label="celsius" valor={ok ? formatar(c) : null} unidade="°C" />
          </div>
          {ok && c < -273.15 && <p className="calc-aviso">abaixo do zero absoluto (-273,15 °C) não existe temperatura.</p>}
        </>
      }
    >
      <Campo id="celsius" label="temperatura em celsius" unidade="°C" placeholder="25" value={celsius} onChange={(e) => setCelsius(e.target.value)} erro={erro} autoFocus />
    </CalcLayout>
  );
}

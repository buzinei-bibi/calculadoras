import { useState } from "react";
import CalcLayout, { Campo, Resultado } from "../../components/Calc/Calc";
import { formatar, lerNumero } from "../../data/calculadoras";

// 1 litro de tinta pinta 2 m² · lata padrão de 3,6 L
const M2_POR_LITRO = 2;
const LATA_L = 3.6;

export default function Tinta() {
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");

  const l = lerNumero(largura);
  const a = lerNumero(altura);
  const erroL = largura && !(l > 0) ? "informe uma medida maior que zero" : null;
  const erroA = altura && !(a > 0) ? "informe uma medida maior que zero" : null;
  const ok = l > 0 && a > 0;

  const area = ok ? l * a : null;
  const litros = ok ? area / M2_POR_LITRO : null;
  const latas = ok ? Math.ceil(litros / LATA_L) : null;

  return (
    <CalcLayout
      id="tinta"
      podeLimpar={largura !== "" || altura !== ""}
      onLimpar={() => {
        setLargura("");
        setAltura("");
      }}
      resultados={
        <div className="calc-grade">
          <Resultado destaque label="tinta necessária" valor={ok ? formatar(litros) : null} unidade="litros" />
          <Resultado label="área da parede" valor={ok ? formatar(area) : null} unidade="m²" />
          <Resultado label="latas de 3,6 L" valor={ok ? String(latas) : null} unidade={latas === 1 ? "lata" : "latas"} />
        </div>
      }
    >
      <div className="calc-form-linha">
        <Campo id="largura" label="largura" unidade="m" placeholder="4,0" value={largura} onChange={(e) => setLargura(e.target.value)} erro={erroL} autoFocus />
        <Campo id="altura" label="altura" unidade="m" placeholder="2,8" value={altura} onChange={(e) => setAltura(e.target.value)} erro={erroA} />
      </div>
    </CalcLayout>
  );
}

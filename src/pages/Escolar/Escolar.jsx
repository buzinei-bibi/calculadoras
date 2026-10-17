import { useState } from "react";
import CalcLayout, { Campo, Resultado } from "../../components/Calc/Calc";
import { formatar, lerNumero } from "../../data/calculadoras";

// médias de referência
const MEDIA_APROVACAO = 7;
const MEDIA_RECUPERACAO = 5;

function validar(texto, valor) {
  if (!texto) return null;
  return valor >= 0 && valor <= 10 ? null : "a nota vai de 0 a 10";
}

export default function Escolar() {
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");

  const n1 = lerNumero(nota1);
  const n2 = lerNumero(nota2);
  const erro1 = validar(nota1, n1);
  const erro2 = validar(nota2, n2);
  const ok = nota1 !== "" && nota2 !== "" && !erro1 && !erro2;
  const media = ok ? (n1 + n2) / 2 : null;

  let status = null;
  if (ok) {
    if (media >= MEDIA_APROVACAO) status = ["ok", "APROVADO"];
    else if (media >= MEDIA_RECUPERACAO) status = ["rec", "RECUPERAÇÃO"];
    else status = ["ruim", "REPROVADO"];
  }

  return (
    <CalcLayout
      id="escolar"
      podeLimpar={nota1 !== "" || nota2 !== ""}
      onLimpar={() => {
        setNota1("");
        setNota2("");
      }}
      resultados={
        <>
          <div className="calc-grade">
            <Resultado destaque label="média final" valor={ok ? formatar(media) : null} />
          </div>
          <div className="calc-barra" aria-hidden="true">
            <div className="calc-barra-fill" style={{ width: `${(media ?? 0) * 10}%` }} />
            <div className="calc-barra-marca" style={{ left: `${MEDIA_APROVACAO * 10}%` }}>
              <span>MÉDIA {MEDIA_APROVACAO}</span>
            </div>
          </div>
          <div className="calc-escala" aria-hidden="true">
            <span>0</span>
            <span>10</span>
          </div>
          {status && <p className={`calc-status ${status[0]}`}>{status[1]}</p>}
        </>
      }
    >
      <div className="calc-form-linha">
        <Campo id="nota1" label="primeira nota" placeholder="7,5" value={nota1} onChange={(e) => setNota1(e.target.value)} erro={erro1} autoFocus />
        <Campo id="nota2" label="segunda nota" placeholder="8,5" value={nota2} onChange={(e) => setNota2(e.target.value)} erro={erro2} />
      </div>
    </CalcLayout>
  );
}

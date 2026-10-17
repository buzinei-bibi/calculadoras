// lista única das calculadoras: usada no header, no banner da home e nas páginas
// cor → tom da calculadora (família quente do site) · tinta → cor do texto sobre ela
export const CALCULADORAS = [
  {
    id: "tinta",
    nome: "TINTA",
    rota: "/tinta",
    cor: "#ff6b2c",
    tinta: "#140a05",
    frase: "MEÇA A PAREDE. SAIBA QUANTOS LITROS COMPRAR.",
    descricao: "informe a largura e a altura da parede e descubra a área e quanta tinta você vai precisar.",
    formula: "1 litro pinta 2 m²",
  },
  {
    id: "meters",
    nome: "METROS",
    rota: "/meters",
    cor: "#fbbf24",
    tinta: "#140f02",
    frase: "DE METROS PARA CENTÍMETROS E MILÍMETROS NUM PISCAR.",
    descricao: "digite um valor em metros e veja na hora quanto dá em centímetros e milímetros.",
    formula: "1 m = 100 cm = 1000 mm",
  },
  {
    id: "matematica",
    nome: "MATEMÁTICA",
    rota: "/matematica",
    cor: "#fb7185",
    tinta: "#16050a",
    frase: "DOBRO, TRIPLO E RAIZ QUADRADA DE UMA VEZ SÓ.",
    descricao: "informe um número inteiro ou real e descubra o dobro, o triplo e a raiz quadrada.",
    formula: "n × 2 · n × 3 · √n",
  },
  {
    id: "sequencia",
    nome: "SEQUÊNCIA",
    rota: "/sequencia",
    cor: "#fdba74",
    tinta: "#150c03",
    frase: "DO ZERO ATÉ O SEU NÚMERO, PASSO A PASSO.",
    descricao: "veja todos os números de zero até o número que você informar.",
    formula: "0, 1, 2, … n",
  },
  {
    id: "celsius",
    nome: "CELSIUS",
    rota: "/celsius",
    cor: "#f87171",
    tinta: "#170606",
    frase: "°C PARA °F E KELVIN SEM DECORAR FÓRMULA.",
    descricao: "converta graus celsius para fahrenheit e kelvin de forma rápida e simples.",
    formula: "°F = °C × 9/5 + 32",
  },
  {
    id: "escolar",
    nome: "ESCOLAR",
    rota: "/escolar",
    cor: "#e7e5e4",
    tinta: "#0c0a09",
    frase: "DUAS NOTAS, UMA MÉDIA. SEM CONTA DE CABEÇA.",
    descricao: "calcule a média final de duas notas de 0 a 10 de forma rápida e simples.",
    formula: "(nota 1 + nota 2) ÷ 2",
  },
];

// número com vírgula, no máximo 2 casas (1.5 → "1,5")
export function formatar(valor, casas = 2) {
  return valor.toLocaleString("pt-BR", { maximumFractionDigits: casas });
}

// lê o que a pessoa digitou aceitando vírgula ("2,5" → 2.5); vazio → NaN
export function lerNumero(texto) {
  if (texto.trim() === "") return NaN;
  return Number(texto.replace(",", "."));
}

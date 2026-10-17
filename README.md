# calculadoras

projeto feito em sala de aula que reúne seis calculadoras do dia a dia em um só lugar: tinta, metros, matemática, sequência, celsius e escolar. é só escolher a calculadora, digitar os valores e o resultado aparece na hora, sem enrolação e sem precisar decorar fórmula.

## link do projeto

https://calculadora-js-edn1.onrender.com

## ferramentas

<a href="https://skillicons.dev">
<img src="https://skillicons.dev/icons?i=react,js,tailwind,vite,git,github,vscode" alt="react, javascript, tailwind css, vite, git, github, vscode" />
</a>

## :sparkles: funcionalidades

### home
- banner em tela cheia com uma animação para cada calculadora, que troca sozinha logo depois de mostrar o resultado:
  - **tinta**: o rolo pinta a parede e a lata mostra quantos litros
  - **metros**: a trena abre e aparecem os centímetros e milímetros
  - **matemática**: o número vira dobro, triplo e raiz quadrada
  - **sequência**: os números sobem uma escada, do 0 ao 7
  - **celsius**: o termômetro sobe e a leitura vira de °C para °F
  - **escolar**: a conta aparece no quadro-negro e a média é circulada
- abas para escolher a calculadora, botão de pausar e navegação pelas setas do teclado
- a troca automática pausa com o mouse em cima ou com o foco do teclado

### calculadoras

| calculadora | o que faz |
| --- | --- |
| **tinta** | largura × altura da parede → área, litros de tinta (1 L pinta 2 m²) e latas de 3,6 L |
| **metros** | metros → centímetros, milímetros e quilômetros |
| **matemática** | um número → dobro, triplo e raiz quadrada |
| **sequência** | um número → todos os números de 0 até ele, quantos são e a soma |
| **celsius** | °C → °F e kelvin |
| **escolar** | duas notas → média final, barra de 0 a 10 e situação (aprovado, recuperação ou reprovado) |

- o resultado aparece enquanto você digita, sem precisar de botão
- aceita vírgula ou ponto (`2,5` ou `2.5`)
- avisa quando o valor não serve (nota fora de 0 a 10, medida zerada, número negativo na raiz...)
- botão **limpar** e links para a calculadora anterior e a próxima

### visual
- tema escuro em grafite quente com laranja, combinando com o logotipo
- cada calculadora tem uma cor própria, usada no banner, nas abas e na página dela
- responsivo: no celular o menu vira um botão e as abas ficam em duas linhas
- respeita a opção do sistema de reduzir animações

## :file_folder: estrutura

```
src/
├── data/calculadoras.js       lista das calculadoras (nome, rota, cor, textos) e funções de número
├── components/
│   ├── Header/                cabeçalho com a navegação
│   ├── Home/                  banner animado da home (HeroCalculadoras)
│   └── Calc/                  layout padrão das calculadoras: campo, resultado e navegação
└── pages/                     uma página para cada calculadora + home
```

para criar uma calculadora nova, basta adicionar ela em `src/data/calculadoras.js` (aparece no menu e na navegação) e criar a página usando o `CalcLayout`.

## :computer: como rodar

```bash
npm install
npm run dev
```

## :brain: o que aprendi
- como criar e reutilizar componentes em react
- como escrever a lógica dos cálculos em javascript e validar o que a pessoa digita
- como organizar várias calculadoras em páginas diferentes a partir de uma lista de dados
- como fazer animações em svg e css, e um carrossel acessível pelo teclado
- como deixar o projeto responsivo e colocar ele online

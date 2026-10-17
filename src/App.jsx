import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Tinta from "./pages/Tinta/Tinta";
import Matematica from "./pages/Matematica/Matematica";
import Sequencia from "./pages/Sequencia/Sequencia";
import Celsius from "./pages/Celsius/Celsius";
import Escolar from "./pages/Escolar/Escolar";
import Meters from "./pages/Meters/Meters";
import { CALCULADORAS } from "./data/calculadoras";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col overflow-hidden bg-linear-to-br from-[#0c0a09] via-[#1a120d] to-[#100e0d]">
        <Header
          navigationLinks={[
            { name: "HOME", link: "/" },
            ...CALCULADORAS.map((c) => ({ name: c.nome, link: c.rota })),
          ]}
        />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tinta" element={<Tinta />} />
            <Route path="/matematica" element={<Matematica />} />
            <Route path="/sequencia" element={<Sequencia />} />
            <Route path="/celsius" element={<Celsius />} />
            <Route path="/escolar" element={<Escolar />} />
            <Route path="/meters" element={<Meters />} />

            <Route
              path="*"
              element={
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <h1 className="font-[family-name:var(--fonte-display)] text-6xl font-extrabold text-white">404</h1>
                  <p className="text-stone-400">página não encontrada</p>
                  <Link to="/" className="font-[family-name:var(--fonte-display)] font-bold tracking-widest text-[#ff6b2c]">
                    ← VOLTAR PARA A HOME
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

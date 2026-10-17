import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import logotipo from "../../assets/logotipo.png"

export default function Header({
  navigationLinks = [{ name: "HOME", link: "/" }],
}) {
  const [aberto, setAberto] = useState(false)

  // link ativo ganha a cor da marca e um traço embaixo; hover só clareia (sem roxo)
  const classeLink = ({ isActive }) =>
    `relative block py-1 font-[family-name:var(--fonte-display)] text-[0.95rem] font-bold tracking-[0.12em] transition-colors
     after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-[#ff6b2c] after:transition-transform after:duration-300
     ${isActive ? "text-white after:scale-x-100" : "text-stone-400 hover:text-white after:scale-x-0 hover:after:scale-x-100"}`

  return (
    <header className="relative z-20 h-16 shrink-0 border-b border-white/[0.07] bg-[#0c0a09]/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-5 sm:px-[clamp(20px,4.5vw,56px)]">
        <Link to="/" className="flex items-center gap-3" onClick={() => setAberto(false)}>
          <img src={logotipo} alt="" className="h-10 w-auto rounded-md" />
          <span className="font-[family-name:var(--fonte-display)] text-xl font-extrabold tracking-[0.08em] text-white">
            CALCULADORAS<span className="text-[#ff6b2c]">.</span>
          </span>
        </Link>

        <nav aria-label="Calculadoras" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigationLinks.map((link) => (
              <li key={link.link}>
                <NavLink to={link.link} end className={classeLink}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* menu do celular */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-celular"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((a) => !a)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {aberto && (
        <nav id="menu-celular" aria-label="Calculadoras" className="absolute inset-x-0 top-16 border-b border-white/[0.07] bg-[#0c0a09] lg:hidden">
          <ul className="mx-auto grid max-w-[1320px] gap-1 px-5 py-4">
            {navigationLinks.map((link) => (
              <li key={link.link}>
                <NavLink
                  to={link.link}
                  end
                  onClick={() => setAberto(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 font-[family-name:var(--fonte-display)] text-lg font-bold tracking-[0.1em] ${
                      isActive ? "bg-white/[0.06] text-[#ff6b2c]" : "text-stone-300 hover:bg-white/[0.04] hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

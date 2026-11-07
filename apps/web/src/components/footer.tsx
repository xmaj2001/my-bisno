import { SIGNUP_URL } from "./landing/constants";
import { Logo } from "./Logo";
import { Parallax } from "./Parallax";

export function Footer() {
  return (
    <footer className="theme-gold relative overflow-hidden pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 sm:flex-row sm:items-center">
          <Logo className="[&_svg]:fill-foreground" />
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            <a href="#como-funciona" className="hover:underline">
              Como funciona
            </a>
            <a href="#comissoes" className="hover:underline">
              Comissões
            </a>
            <a href="#perguntas" className="hover:underline">
              Perguntas
            </a>
            <a href={SIGNUP_URL} className="hover:underline">
              Quero ser afiliado
            </a>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 py-6 text-xs sm:flex-row">
          <p className="eyebrow text-[0.58rem]">
            Plataforma angolana de afiliados
          </p>
          <p>© {new Date().getFullYear()} Bisno</p>
        </div>
      </div>
      <Parallax
        speed={0.12}
        axis="x"
        className="pointer-events-none select-none"
        aria-hidden
      >
        <p className="font-wide whitespace-nowrap text-center text-[24vw] font-extrabold uppercase leading-[0.8] text-foreground/15">
          Bisno
        </p>
      </Parallax>
    </footer>
  );
}

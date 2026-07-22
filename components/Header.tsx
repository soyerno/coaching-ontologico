"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "Programa", href: "/" },
  { label: "Glosario", href: "/glosario" },
  { label: "Mi cuaderno", href: "/notas" },
];

/**
 * El link activo se marca con fondo — responde de un vistazo a "¿dónde
 * estoy?" sin que haga falta leer el breadcrumb de la página (orientación
 * espacial = menos carga cognitiva al navegar).
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-ink">
          <span aria-hidden className="text-xl">
            🧭
          </span>
          Coaching Ontológico
        </Link>
        <nav className="ml-auto flex items-center gap-1" aria-label="Navegación principal">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                  active
                    ? "bg-brand-light text-brand-ink"
                    : "text-ink-soft hover:bg-brand-light hover:text-brand-ink"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

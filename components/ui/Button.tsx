"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 font-display font-bold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 disabled:opacity-40";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:opacity-90",
  secondary: "border border-border bg-surface text-ink hover:border-brand",
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  /** Ancho completo en mobile, ajustado al contenido desde `sm:` — el patrón estándar de los CTAs de ejercicio. */
  responsive?: boolean;
  /** Si se pasa, renderiza un `next/link` en vez de un `<button>`. */
  href?: string;
  className?: string;
  children: ReactNode;
}

/**
 * El único botón del sistema. `primary` es SIEMPRE la acción destacada de la
 * pantalla — nunca dos `primary` a la vez — para que "qué tocar acá" nunca
 * sea una decisión (principios de Von Restorff + ley de Hick: un solo foco
 * visual dominante reduce el esfuerzo de elegir). `secondary` es la
 * alternativa de menor jerarquía (volver, repasar).
 *
 * El `active:scale-[0.98]` da feedback táctil inmediato al tocar: la
 * interfaz "responde" antes de que termine de procesar, lo que se percibe
 * como más rápida y construye confianza en cada tap.
 */
export default function Button({
  variant = "primary",
  responsive = false,
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [BASE, VARIANTS[variant], responsive ? "w-full sm:w-auto sm:px-8" : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

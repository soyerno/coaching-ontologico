import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Link de navegación de bajo compromiso: "volver", "repasar", "ir al
 * capítulo". Nunca es la acción principal de la pantalla, por eso no
 * compite visualmente con Button — mismo texto y color de marca, sin caja
 * ni sombra, para que el usuario lo lea como "salida", no como "CTA".
 */
export default function TextLink({
  href,
  size = "sm",
  className = "",
  children,
}: {
  href: string;
  size?: "xs" | "sm";
  className?: string;
  children: ReactNode;
}) {
  const sizeClass = size === "xs" ? "text-xs" : "text-sm";
  return (
    <Link href={href} className={`font-medium text-brand hover:underline ${sizeClass} ${className}`}>
      {children}
    </Link>
  );
}

const HEIGHTS = { sm: "h-1.5", md: "h-2.5", lg: "h-3" } as const;

/**
 * Barra de progreso única del sistema — mismo lenguaje visual en el mapa del
 * programa, el camino de un capítulo y el player de una lección. La
 * consistencia entre pantallas es en sí misma una reducción de carga
 * cognitiva: el usuario aprende a leerla una vez y la reconoce siempre.
 *
 * `duration-500` (más lento que las transiciones de hover/click) para que el
 * llenado se sienta "ganado" en vez de instantáneo — el efecto de meta
 * cercana (goal-gradient) funciona mejor cuando el avance es perceptible.
 */
export default function ProgressBar({
  pct,
  size = "md",
  label,
  className = "",
}: {
  pct: number;
  size?: keyof typeof HEIGHTS;
  /** Si se pasa, la barra es accesible (`role="progressbar"`); si no, decorativa. */
  label?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <span
      role={label ? "progressbar" : undefined}
      aria-valuenow={label ? Math.round(clamped) : undefined}
      aria-valuemin={label ? 0 : undefined}
      aria-valuemax={label ? 100 : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`block ${HEIGHTS[size]} overflow-hidden rounded-full bg-border ${className}`}
    >
      <span
        className="block h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </span>
  );
}

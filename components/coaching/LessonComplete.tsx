"use client";

import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import LessonNote from "./LessonNote";

/**
 * Pantalla final de lección: el momento que más se recuerda de toda la
 * experiencia (regla pico-final / peak-end rule) — por eso concentra acá el
 * único elemento con color y animación de recompensa: el XP. Los aciertos
 * quedan como dato secundario en texto plano, no como otra tarjeta compitiendo
 * por atención — lo que se premia es haber practicado, no solo acertar.
 */
export default function LessonComplete({
  xpEarned,
  correctCount,
  total,
  noteKey,
  chapterHref,
  nextHref,
}: {
  xpEarned: number;
  correctCount: number;
  total: number;
  /** Clave `capitulo/leccion` para la nota personal. */
  noteKey: string;
  chapterHref: string;
  nextHref: string | null;
}) {
  return (
    <div className="mx-auto max-w-md py-10 text-center">
      <div className="animate-celebrate text-6xl" aria-hidden>
        🎉
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold text-ink">¡Lección completada!</h2>
      <p className="mt-1 text-sm text-muted">
        {total > 0 && correctCount === total
          ? "Todo bien pensado, de punta a punta."
          : `${correctCount}/${total} en el primer intento — lo que cuenta es haber parado a pensar cada una.`}
      </p>

      <div className="animate-fade-slide-up mt-6 rounded-2xl border border-reward/30 bg-reward-light p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-reward">
          Experiencia ganada
        </p>
        <p className="mt-1 font-display text-3xl font-bold tabular-nums text-reward">
          {xpEarned > 0 ? `+${xpEarned} XP` : "Repaso"}
        </p>
      </div>

      <LessonNote noteKey={noteKey} />

      <div className="mt-6 grid gap-2">
        {nextHref && (
          <Button href={nextHref} className="w-full">
            Siguiente lección →
          </Button>
        )}
        <Button href={chapterHref} variant="secondary" className="w-full">
          Volver al capítulo
        </Button>
        <TextLink href="/notas" className="mx-auto mt-1">
          Ver mi cuaderno 📓
        </TextLink>
      </div>
    </div>
  );
}

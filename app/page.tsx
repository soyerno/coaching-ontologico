import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CoachingStats from "@/components/coaching/CoachingStats";
import ProgramMap, { type MapChapter } from "@/components/coaching/ProgramMap";
import {
  PROGRAMA,
  PROGRAMA_TAGLINE,
  PROGRAMA_TITLE,
  totalExercises,
  totalLessons,
} from "@/lib/coaching/programa";

export const metadata: Metadata = {
  title: "Programa interactivo",
  description:
    "Programa interactivo estilo Duolingo para aprender coaching ontológico: el observador, actos lingüísticos, juicios, promesas, emociones, escucha y quiebres — con ejercicios y reflexiones.",
};

export default function CoachingPage() {
  const chapters: MapChapter[] = PROGRAMA.map((c) => ({
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    icon: c.icon,
    lessons: c.lessons.map((l) => ({ id: l.id, title: l.title })),
  }));

  return (
    <PageShell
      title={PROGRAMA_TITLE}
      intro={PROGRAMA_TAGLINE}
      meta={`${PROGRAMA.length} capítulos · ${totalLessons()} lecciones · ${totalExercises()} ejercicios · progreso, XP y racha se guardan en tu navegador`}
      maxWidth="max-w-3xl"
    >
      <div className="mb-8">
        <CoachingStats totalLessons={totalLessons()} />
      </div>

      <ProgramMap chapters={chapters} />

      {/* Contexto de una sola vez, sin caja ni sombra: no compite con la
          tarjeta "seguí acá" de arriba, pero queda a mano para quien recién
          llega y todavía no sabe cómo se juega. */}
      <p className="mt-10 text-center text-xs text-muted">
        Las lecciones se desbloquean en orden. Cada una mezcla opción
        múltiple, verdadero/falso, clasificar, unir pares y reflexiones
        escritas — el coaching ontológico no se memoriza, se piensa.
      </p>
    </PageShell>
  );
}

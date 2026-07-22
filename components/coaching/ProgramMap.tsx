"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { useCoachingProgress } from "@/lib/coaching/progress";

export interface MapChapterLesson {
  id: string;
  title: string;
}

export interface MapChapter {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  lessons: MapChapterLesson[];
}

/**
 * Mapa del programa. Arriba, UNA sola tarjeta destacada con la próxima
 * lección: en vez de que 8 capítulos compitan por atención con igual peso
 * visual (mucha carga cognitiva para decidir "por dónde sigo"), hay un
 * único "seguí acá" obvio — principio de Von Restorff (la única tarjeta con
 * sombra y color) combinado con ley de Hick (una sola decisión, no ocho).
 *
 * Abajo, el resto de los capítulos queda como mapa de referencia: útil para
 * ubicarse o repasar, pero visualmente más discreto (solo borde, sin
 * sombra) para no competir con la acción principal.
 */
export default function ProgramMap({ chapters }: { chapters: MapChapter[] }) {
  const { progress, ready } = useCoachingProgress();
  const allKeys = chapters.flatMap((c) => c.lessons.map((l) => `${c.slug}/${l.id}`));
  const nextKey = allKeys.find((k) => !progress.done.includes(k));
  const started = ready && progress.done.length > 0;

  const nextChapter = nextKey ? chapters.find((c) => c.slug === nextKey.split("/")[0]) : undefined;
  const nextLesson = nextChapter?.lessons.find((l) => `${nextChapter.slug}/${l.id}` === nextKey);

  return (
    <div className="grid gap-8">
      {ready && nextChapter && nextLesson && (
        <div className="rounded-2xl border border-brand bg-brand-light p-5 shadow-[var(--shadow-raised)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-ink">
            {started ? "Seguí donde dejaste" : "Empezá acá"}
          </p>
          <p className="mt-1.5 flex items-center gap-2 font-display text-xl font-bold text-ink">
            <span aria-hidden>{nextChapter.icon}</span> {nextLesson.title}
          </p>
          <p className="mt-0.5 text-sm text-muted">{nextChapter.title}</p>
          <Button href={`/${nextKey}`} responsive className="mt-4">
            {started ? "Continuar →" : "Empezar →"}
          </Button>
        </div>
      )}

      <ol className="grid gap-3">
        {chapters.map((chapter, i) => {
          const lessonKeys = chapter.lessons.map((l) => `${chapter.slug}/${l.id}`);
          const doneCount = lessonKeys.filter((k) => progress.done.includes(k)).length;
          const total = lessonKeys.length;
          const complete = doneCount === total;
          const isCurrent = ready && nextKey !== undefined && lessonKeys.includes(nextKey);
          const pct = total === 0 ? 0 : (doneCount / total) * 100;

          return (
            <li key={chapter.slug}>
              <Link
                href={`/${chapter.slug}`}
                className={`flex items-center gap-4 rounded-xl border bg-surface p-4 transition-colors ${
                  isCurrent ? "border-brand" : "border-border hover:border-brand/60"
                }`}
              >
                <span
                  aria-hidden
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl ${
                    complete ? "bg-accent-light" : "bg-bg"
                  }`}
                >
                  {chapter.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    Capítulo {i + 1}
                    {complete && " · completo ✓"}
                  </span>
                  <span className="block truncate font-display text-base font-bold text-ink">
                    {chapter.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <ProgressBar pct={ready ? pct : 0} size="sm" className="flex-1" />
                    <span className="text-xs tabular-nums text-muted">
                      {ready ? doneCount : 0}/{total}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

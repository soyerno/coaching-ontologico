"use client";

import { isStreakAtRisk, useCoachingProgress } from "@/lib/coaching/progress";
import ProgressBar from "@/components/ui/ProgressBar";

/**
 * Marcador del programa. Jerarquía deliberada, no tres cajas de igual peso:
 * la racha es el número protagonista (es el que más predice si alguien
 * vuelve mañana — principio de goal-gradient/hábito), XP y lecciones quedan
 * como fila secundaria más chica. Un solo foco por pantalla evita que el
 * ojo tenga que repartirse entre estímulos de igual jerarquía.
 *
 * El tono es siempre calmo: sin cuentas regresivas ni alarmas — el mensaje
 * de "racha en riesgo" solo aparece cuando es real (se completó ayer, no
 * hoy) y se muestra en texto neutro, nunca en rojo.
 */
export default function CoachingStats({ totalLessons }: { totalLessons: number }) {
  const { progress, ready } = useCoachingProgress();
  const atRisk = ready && isStreakAtRisk(progress.streak);
  const streakActive = ready && progress.streak.count > 0;
  const pct = totalLessons === 0 ? 0 : (progress.done.length / totalLessons) * 100;

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4">
        <span
          aria-hidden
          className={`text-3xl transition-opacity ${streakActive ? "" : "opacity-30 grayscale"}`}
        >
          🔥
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl font-bold tabular-nums text-ink">
            {ready ? progress.streak.count : "—"}{" "}
            <span className="text-sm font-semibold text-muted">
              {progress.streak.count === 1 ? "día seguido" : "días seguidos"}
            </span>
          </p>
          <p className="text-xs text-muted">
            {atRisk
              ? "Hacé una lección hoy para mantenerla."
              : streakActive
                ? "Volvé mañana para seguir sumando."
                : "Empezá hoy tu primera racha."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">XP</p>
          <p className="mt-0.5 font-display text-lg font-bold tabular-nums text-reward">
            {ready ? progress.xp : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Lecciones
          </p>
          <p className="mt-0.5 font-display text-lg font-bold tabular-nums text-ink">
            {ready ? progress.done.length : 0}/{totalLessons}
          </p>
          <ProgressBar pct={ready ? pct : 0} size="sm" className="mt-1.5" />
        </div>
      </div>
    </div>
  );
}

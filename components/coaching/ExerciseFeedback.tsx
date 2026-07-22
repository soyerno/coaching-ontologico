"use client";

import Button from "@/components/ui/Button";

type Variant = "correct" | "incorrect" | "insight";

/**
 * Cada variante tiene SU color exclusivo (verde/rojo/dorado) y un ícono
 * redundante al color — así el estado se lee de un vistazo y no depende
 * solo del color (accesible para daltonismo, más rápido para todos).
 * "insight" es el registro propio de las reflexiones: no hay "correcto"
 * posible en una pregunta abierta, así que se celebra distinto — como
 * hallazgo, no como acierto.
 */
const STYLES: Record<
  Variant,
  { border: string; bg: string; text: string; icon: string; title: string }
> = {
  correct: {
    border: "border-accent",
    bg: "bg-accent-light",
    text: "text-accent",
    icon: "✓",
    title: "¡Correcto!",
  },
  incorrect: {
    border: "border-error",
    bg: "bg-error-light",
    text: "text-error",
    icon: "✗",
    title: "No exactamente…",
  },
  insight: {
    border: "border-reward",
    bg: "bg-reward-light",
    text: "text-reward",
    icon: "💡",
    title: "Tu reflexión",
  },
};

/**
 * Banner de resultado al pie del ejercicio (estilo Duolingo). La explicación
 * es el corazón: acá se aprende, incluso (sobre todo) cuando te equivocás.
 * Entra con `animate-pop-in`: el único momento de motion dentro de una
 * lección — justo cuando hay algo nuevo que vale la pena notar.
 */
export default function ExerciseFeedback({
  variant,
  explain,
  isLast,
  onContinue,
}: {
  variant: Variant;
  explain: string;
  isLast: boolean;
  onContinue: () => void;
}) {
  const s = STYLES[variant];
  return (
    <div role="status" className={`animate-pop-in mt-6 rounded-xl border p-4 ${s.border} ${s.bg}`}>
      <p className={`flex items-center gap-2 font-display font-bold ${s.text}`}>
        <span aria-hidden>{s.icon}</span> {s.title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink">{explain}</p>
      <Button onClick={onContinue} autoFocus responsive className="mt-4">
        {isLast ? "Terminar lección" : "Continuar"}
      </Button>
    </div>
  );
}

# Sistema de diseño — Coaching Ontológico

Este documento describe el sistema visual e interactivo de la app y, sobre
todo, *por qué* está armado así. No es un catálogo de componentes: es el
razonamiento detrás de cada decisión, para que la próxima persona que toque
el código sepa qué se puede cambiar libremente y qué rompe algo más grande.

## Filosofía en una frase

**Un solo foco por pantalla, un color por significado, movimiento solo en
los momentos que importan.** Todo lo demás del sistema se deriva de estas
tres reglas.

---

## 1. Por qué esta paleta

| Token | Uso | Por qué |
|---|---|---|
| `--accent` (verde) | Correcto, progreso, acción principal | Verde = crecimiento y confianza. Es el color de "seguir adelante", coherente con un programa de desarrollo personal. Se evitó a propósito el rojo/naranja de urgencia típico del e-commerce o de las apps de hábitos agresivas — no encaja con un tono reflexivo. |
| `--reward` (dorado) | XP, insights de reflexión | **Exclusivo** — nunca se usa para "correcto". La separación es deliberada: si XP fuera verde también, el cerebro fusionaría "acertaste" con "ganaste algo", y en un programa donde los ejercicios de reflexión no tienen respuesta correcta, eso sería directamente falso. El dorado dice "esto vale, more allá de si acertaste". |
| `--error` (rojo) | Respuesta incorrecta | Se usa solo ahí, nunca para advertencias generales — para que cuando aparece, el usuario sepa exactamente qué significa sin tener que leer el texto. |
| `--ink` / `--muted` / `--border` | Jerarquía tipográfica y de contornos | Escala de grises deliberadamente corta (3 niveles de texto, no 6) — menos decisiones de "qué tan importante es esto" para quien escribe contenido nuevo. |

Cada color tiene **una sola** utilidad Tailwind detrás (`bg-*`, `text-*`,
`border-*` se generan del mismo token) — no hay "verde de botón" distinto
del "verde de acierto". Si cambia `--accent`, cambia en todos lados a la
vez, y no puede desincronizarse.

### Modo oscuro

No es una paleta distinta inventada a mano: son los mismos roles
(`--accent`, `--reward`, `--error`...) resueltos con otros valores,
detectados automáticamente por `prefers-color-scheme` y con override manual
vía `data-theme` (ver `ThemeToggle`). Ningún componente debería necesitar
lógica condicional de tema — si lo necesita, es señal de que falta un token.

---

## 2. Jerarquía: un solo foco por pantalla

Es el principio más repetido del sistema, aplicado en cada pantalla:

- **Mapa del programa** (`ProgramMap`): en vez de que 8 capítulos compitan
  por atención con el mismo peso visual, hay **una sola tarjeta** con
  sombra y borde de color ("Seguí donde dejaste" / "Empezá acá"). El resto
  de los capítulos es una lista de referencia, con borde plano y sin
  sombra — visible, pero no gritando.
- **Marcador de progreso** (`CoachingStats`): la racha es el número
  protagonista (tarjeta propia, ícono grande); XP y lecciones son una fila
  secundaria más chica. No son tres cajas iguales compitiendo.
- **Cierre de lección** (`LessonComplete`): el XP ganado tiene su propia
  tarjeta dorada — es la ÚNICA superficie con color en toda la pantalla.
  Los aciertos son una oración en texto plano, no otra tarjeta.
- **Botones**: `Button` con `variant="primary"` es siempre la única acción
  destacada de una pantalla. Nunca hay dos `primary` a la vez — la
  alternativa de menor jerarquía usa `variant="secondary"`, y la
  navegación de salida ("volver", "repasar") usa `TextLink`, que ni
  siquiera tiene forma de botón.

Esto combina dos ideas de la literatura de UX/comportamiento:

- **Efecto Von Restorff** (aislamiento): un elemento que se ve distinto se
  recuerda y se elige más rápido que uno más entre iguales.
- **Ley de Hick**: el tiempo de decisión crece con el número de opciones
  presentadas con igual peso. Menos cosas "gritando" a la vez = menos
  fricción para decidir qué tocar.

---

## 3. Reducción de carga cognitiva, en concreto

- **Progresiva, no simultánea**: la nota "cómo funciona" del programa dejó
  de ser una caja con borde que aparece siempre — ahora es una oración
  chica al pie, visible para quien la busca, invisible para quien ya sabe
  cómo se juega (no vuelve a explicar lo mismo en cada visita).
- **Sin links duplicados**: "Glosario" y "Mi cuaderno" viven en el header;
  se sacaron de la portada del programa, donde antes se repetían. Un mismo
  destino, un solo lugar para llegar ahí — la navegación se aprende una
  vez.
- **Estado activo en el header**: el link de la sección actual se marca
  con fondo de color, así "¿dónde estoy?" se responde de un vistazo sin
  tener que leer el breadcrumb de la página.
- **Ícono + color, nunca solo color**: `ExerciseFeedback` muestra ✓ / ✗ / 💡
  junto con el color — accesible para daltonismo y más rápido de leer para
  todos (codificación redundante).
- **Foco de teclado único**: un solo `:focus-visible` global en vez de que
  cada componente decida el suyo — predecible para navegación por teclado
  o lector de pantalla.

---

## 4. Neuromarketing aplicado — y sus límites éticos

Se usaron patrones de motivación conductual conocidos, todos con una regla
no negociable: **nunca mentir sobre el estado real**. Nada de contadores
falsos, urgencia inventada, ni cifras de "otros usuarios" (esta app no
tiene backend — sería directamente imposible mostrar eso de forma
honesta, y no se simuló).

| Patrón | Dónde | Cómo se aplicó (honestamente) |
|---|---|---|
| **Aversión a la pérdida** | Racha en `CoachingStats` | `isStreakAtRisk()` es una función pura que solo devuelve `true` cuando la racha se completó ayer y no hoy — un hecho real, no una cuenta regresiva inventada. El mensaje ("Hacé una lección hoy para mantenerla") es informativo, en texto neutro — nunca rojo ni con signos de exclamación. |
| **Regla pico-final (peak-end rule)** | `LessonComplete` | Es la pantalla que más se recuerda de toda la experiencia. Concentra ahí el único momento de animación de celebración (`animate-celebrate`) y el único bloque con color de recompensa (XP dorado). |
| **Recompensa inmediata** | `ExerciseFeedback` | Entra con `animate-pop-in` apenas se resuelve el ejercicio — el refuerzo llega en el mismo instante de la acción, no después. |
| **Feedback táctil** | Todos los botones y opciones | `active:scale-[0.98]` en cada superficie tocable: la interfaz "responde" antes de terminar de procesar, lo que se percibe como más rápida. |
| **Efecto meta-cercana (goal-gradient)** | `ProgressBar` | Transición de `500ms` (más lenta que un hover) para que el llenado se sienta ganado, no instantáneo. |
| **Encuadre (framing)** | Copy de aciertos en `LessonComplete` | "Lo que cuenta es haber pensado cada una" en vez de exponer el número de errores como fracaso — coincide con que las reflexiones no tienen "correcto" posible. |
| **Recompensa distinta del acierto** | `ExerciseFeedback` variant `"insight"` | Las reflexiones muestran un banner dorado ("Tu reflexión 💡"), no un "¡Correcto!" verde — sería deshonesto marcar como acierto algo que no tiene respuesta correcta. |

### Lo que se descartó a propósito

- **Prueba social falsa** ("+10.000 personas ya empezaron"): sin backend
  no hay forma de que sea verdad, así que no se simuló.
- **Urgencia/escasez** (countdowns, "solo por hoy"): no aplica a un
  programa de auto-desarrollo sin fecha límite real — habría sido puro
  teatro.
- **Interrupciones/notificaciones push agresivas**: la app no tiene forma
  de enviarlas (ni se buscó agregarla) — el compromiso se sostiene con el
  contenido y la racha, no con presión externa.

La regla de fondo: todo patrón persuasivo usado acá tiene que sobrevivir a
la pregunta *"¿esto seguiría pareciéndome bien si el usuario supiera
exactamente cómo funciona por dentro?"*. Todo lo de esta tabla, sí.

---

## 5. Motion: solo en momentos de recompensa o transición

Tres animaciones, todas en `globals.css`, todas respetando
`prefers-reduced-motion`:

- `animate-pop-in` — feedback de ejercicio (algo nuevo que vale la pena
  notar).
- `animate-fade-slide-up` — la tarjeta de XP en el cierre de lección.
- `animate-celebrate` — el emoji de celebración en el cierre de lección.

**Deliberadamente no hay** animación de entrada en las tarjetas de teoría
(`ConceptSlide`) ni en las preguntas de ejercicio: esas pantallas piden
lectura atenta, y el movimiento ahí compite con la concentración en vez de
ayudarla. El motion se reserva para "pasó algo" (recompensa, cierre,
transición), nunca para "hay algo que leer".

---

## 6. Componentes base (`components/ui/`)

- **`Button`** — el único botón del sistema. `primary` / `secondary`,
  prop `responsive` para el patrón "ancho completo en mobile, ajustado en
  desktop" usado en todos los CTAs de ejercicio. Puede renderizar un
  `<button>` o un `next/link` según reciba `href`.
- **`TextLink`** — navegación de bajo compromiso ("volver", "repasar",
  "ir al capítulo"). Nunca compite visualmente con `Button`: mismo color
  de marca, sin caja ni sombra.
- **`ProgressBar`** — una sola barra de progreso reutilizada en el mapa
  del programa, el camino de un capítulo y el player de lección. La
  consistencia entre pantallas es en sí misma una reducción de carga
  cognitiva: se aprende a leer una vez y se reconoce siempre.

Regla para agregar componentes nuevos: si una pantalla nueva necesita un
botón, una barra de progreso o un link de navegación, se reusa lo que hay
acá — no se inventa una variante nueva "para este caso". Si el caso nuevo
de verdad no entra, es señal de que el primitivo necesita un prop nuevo,
no un componente paralelo.

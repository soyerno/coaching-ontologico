# Coaching Ontológico 🧭

Programa interactivo estilo Duolingo para aprender coaching ontológico
(tradición Echeverría / Flores / Maturana): 8 capítulos, 26 lecciones,
148 ejercicios, 27 tarjetas de teoría con 9 diagramas, glosario de 39
distinciones y bibliografía por capítulo.

App Next.js 16 independiente, con su propio sistema de diseño (ver
[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)). Sin backend: progreso, XP,
racha, reflexiones y notas viven en `localStorage` del navegador.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # integridad del contenido (vitest)
pnpm typecheck
pnpm build
```

## Deploy en Vercel

Este repo tiene la app en su raíz — no requiere configurar Root Directory.

1. En [vercel.com/new](https://vercel.com/new), importar `soyerno/coaching-ontologico`.
2. Framework preset: **Next.js** (autodetectado). Sin variables de entorno requeridas.
3. Deploy.

O por CLI, desde este directorio:

```bash
npx vercel --prod
```

## Estructura

- `lib/coaching/` — todo el contenido del programa (capítulos, glosario, tipos) y el store de progreso.
- `components/coaching/` — player de lecciones, ejercicios, diagramas SVG, cuaderno.
- `app/` — rutas: `/` (mapa del programa), `/[capitulo]`, `/[capitulo]/[leccion]`, `/glosario`, `/notas`.

# STATE.md — PULSO Athletic Club (demo)

## 2026-10-17 — Tour en video, zoom del mapa, sede en Monterrey

### Completado
- Sede cambiada a Monterrey, Nuevo León (ES/EN, descripción del sitio, `site.city`); teléfono de muestra a `+52 81 0000 0000`. Calle y colonia siguen siendo ficticias. `CLIENT.md` no se editó (sigue diciendo Guadalajara).
- Mapa de Ubicaciones: el mundo SVG se amplió más allá del encuadre (cuadrícula, avenidas y manzanas extra) para una vista de ciudad. Al quedar ≥ 55 % visible por primera vez: zoom `scale(0.34 → 1)` centrado en el pin (1.8 s), el rótulo MONTERREY se desvanece, aparece la etiqueta PULSO CENTRAL y el anillo late dos veces. Estado final sin JS y con movimiento reducido; el diálogo no hace zoom.
- Video de portada nuevo: tour sin personas, estilo video inmobiliario. Un primer intento (plano único con gente entrenando, 16.75 créditos) se descartó: personas deformes y ejercicios incorrectos. Versión final, 28.25 créditos: 2 ediciones `gpt_image_2_5` en calidad media (piso principal sin personas; recepción con montañas en vez de rascacielos) y 5 tomas Kling 3.0 pro de 3 s con un movimiento distinto cada una. Montaje en `scripts/build-hero-tour.sh`: fundidos de 0.5 s y fundido final hacia la primera toma, así el bucle no tiene corte. 12.7 s, MP4 1.8 MB / WebM 1.7 MB, `poster.jpg` del primer fotograma.
- El video pasó de `grade-warm` a `grade-photo`. El video anterior quedó en `.gen/old-hero/`; tomas y fotogramas fuente en `.gen/tour/`.

### Verificado
- `pnpm typecheck`, `pnpm test` (10) y `pnpm build` correctos.
- Navegador: el video se reproduce y vuelve a empezar (12.17 s → 0.45 s); hero legible a 1024 px y 390 px. El último y el primer fotograma del bucle son consecutivos en la toma fuente. Zoom del mapa: inicia en vista de ciudad y llega al pin; observador dispara una sola vez.
- Un intento anterior mostró el video congelado al final en la pestaña del navegador integrado; con una carga limpia el bucle funciona. No se reprodujo de nuevo.

### Pendiente
- Fotos `fuerza`, `cardio`, `eq-cardio`, `recepcion` (página) siguen con horizonte de rascacielos: regenerar con montañas si se quiere coherencia total con Monterrey.
- Mapa: no probado con lector de pantalla tras el cambio (el SVG conserva `role="img"`, título y descripción).

## 2026-10-17 — Ronda de ajustes: video de fondo, Equipo, paleta luxury

### Completado
- Portada: el video es fondo permanente en bucle; eslogan y CTA entran 1 s después de que arranca. Se quitaron «Omitir intro» y la clave `sessionStorage` `pulso-intro-seen` (también de Privacidad). Se mantiene «Pausar/Reproducir video» (contenido en movimiento > 5 s).
- Fallo de Equipo corregido. Causa: `RevealObserver` añadía la clase `is-in` fuera de React; al re-renderizar una tarjeta con `className` dinámico, React la borraba y la tarjeta volvía a `opacity: 0`. Ahora marca `data-revealed` (atributo que React no gestiona). Afectaba también a Paquetes al elegir plan.
- Paleta «noche cálida y champán» (ver `PROJECT.md §3`), CTA principales en champán, mapa y selección de clases recoloreados, etalonaje cálido `grade-warm` en video y fotos.

### Verificado
- `pnpm typecheck` y `pnpm build` sin errores.
- Navegador a 998 px y 390 px: video en bucle (`loop`, sigue reproduciéndose), contenido visible tras 1 s, pausa/reanudar, sin overflow; hover en las cuatro tarjetas de Equipo sin desaparecer; seleccionar plan mantiene las tarjetas visibles; movimiento reducido: sin autoplay, contenido inmediato, botón «Reproducir video».

### Completado (misma sesión) — fotos «club privado»
- 15 imágenes con Higgsfield `gpt_image_2_5`, calidad alta 2k (aprobado ~41 créditos): 11 de ambiente/equipamiento/nosotros y 4 retratos con fondo y luz nuevos. Renata fue bloqueada una vez por el filtro de contenido (falso positivo) y pasó al reintentar con un prompt más neutro. Tres fotos fallaron por límite de velocidad y se reenviaron.
- Instaladas en `public/media/photos|team` como JPG (2000 px / 1360 px), WebP regenerados con `pnpm images`. Originales anteriores y PNG generados en `.gen/` (fuera de `public`).
- Fotos pasan de `grade-warm` a `grade-photo` (ajuste mínimo); `grade-warm` queda solo en el video. Retratos inactivos de Equipo: `saturate(0.55) brightness(0.62)`.
- Alturas en `site.ts` ajustadas (1493 / 1131) y textos alternativos de recepción y portada-foto actualizados en ES/EN.

### Verificado
- `pnpm typecheck`, `pnpm test` (10) y `pnpm build` correctos.
- Navegador (998 px, export estático): Nosotros, Instalaciones y Equipo cargan las fotos nuevas sin imágenes rotas; cambiar de entrenador mantiene las tarjetas visibles.

### Pendiente
- Horizonte de rascacielos tipo Nueva York en `fuerza`, `cardio`, `eq-cardio`: ver la sección más reciente (sede ahora en Monterrey).
- No se revisaron de nuevo en móvil las fotos nuevas (layout sin cambios).
- Derechos de uso de las imágenes generadas, a cargo del usuario.

## 2026-10-17 — Primera entrega completa (revisión local)

### Completado
- Sitio completo según `CLIENT.md` y la matriz de `PROJECT.md §4`: portada (video una vez o foto), Nosotros, Equipamiento, Instalaciones, Equipo, Clases, Paquetes + comparación, Ubicaciones con mapa ilustrativo, FAQ, Contacto demo, Privacidad y 404. ES-MX / EN.
- Next.js 16 con exportación estática (`out/`), Tailwind 4, Motion; fuentes autoalojadas; 47 imágenes WebP optimizadas desde las fotos suministradas (no se generaron recursos nuevos).
- Formulario demo: validación, resumen editable y estado «preparada, nada enviado»; solo en memoria.
- `noindex` + `robots.txt` con `Disallow: /`.

### Verificado (navegador, servidor estático y dev)
- `pnpm typecheck`, `pnpm test` (10 pruebas: validación del formulario y paridad de traducciones) y `pnpm build` sin errores.
- 1440, 1024, 768 y 390 px: sin overflow horizontal (medido en cada ancho); navegación superior, menú «Más», menú móvil (foco atrapado, Esc, bloqueo de scroll, anclas con compensación del encabezado fijo).
- Pestañas de Equipamiento con flechas, índice fijo de Instalaciones, paneles de Equipo, resaltado de clases, «Me interesa este plan» → formulario con plan preseleccionado, diálogo del mapa con retorno de foco, FAQ, flujo completo del formulario (errores con resumen enfocado, revisión, edición, reinicio).
- Cambio de idioma sin perder sección, plan ni formulario; título de pestaña localizado en inicio, privacidad y 404 (incluido EN guardado al cargar).
- Movimiento reducido: video sin reproducción automática (fotograma estático), apariciones visibles, manifiesto completo, scroll instantáneo.
- Sin peticiones externas ni recursos fallidos en la exportación; el formulario no hace peticiones de red ni escribe en almacenamiento.

### Decisiones de esta sesión
- 404 dividida en `not-found.tsx` (servidor, metadatos) + `NotFoundContent` (cliente), igual que Privacidad.
- `DocumentTitle` reaplica el título localizado si Next.js lo reescribe tras la hidratación.
- `useActiveSection` acepta `rootMargin`; Instalaciones usa una franja más amplia para no dejar huecos sin activo.
- Encabezado a 1024 px: descriptor y CTA sin salto de línea; separaciones reducidas entre 1024 y 1279 px.
- Paquetes: tres columnas desde 1024 px (antes 768, demasiado estrecho); etiqueta en fila reservada para alinear nombres y precios.
- Índice de Instalaciones compacto en pantallas de poca altura (≤ 860 px) para que los seis espacios quepan.
- Titular de portada con espacios entre líneas para lectores de pantalla.

### Pendiente / no verificado
- Paleta final, logo y variante definitiva de portada (decisiones del usuario; paleta en variables CSS de `globals.css`).
- Derechos de uso de fotos y video.
- Auditoría de accesibilidad con lector de pantalla real y medición Lighthouse/Core Web Vitals: no ejecutadas.
- Navegadores distintos de Chromium y dispositivos físicos: no probados.
- Publicación, dominio y hosting: fuera de alcance.

### Cómo revisar
- Desarrollo: `pnpm dev` → http://localhost:3000
- Exportación estática: `pnpm build && pnpm start` → http://localhost:4173 (si el puerto está ocupado, `serve` indica otro).
- Portada forzada: `?portada=foto` o `?portada=video` (el video se reproduce en bucle como fondo).

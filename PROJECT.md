# PROJECT.md — PULSO Athletic Club (demo)

Especificación de trabajo derivada de `CLIENT.md`. Los hechos del negocio viven en el brief; aquí se registran perfil, dirección, arquitectura y decisiones. Todo lo marcado **Propuesto** está pendiente de validación del usuario.

## 1. Perfil y modo

- **Perfil:** `integraciones` en modo **demo** + capacidad `idiomas` (ES-MX / EN).
- **Sin conexiones operativas:** el formulario valida y resume localmente; no envía ni persiste. Correo, teléfono y WhatsApp de muestra muestran una explicación local y no abren canales.
- **Excluido:** reservas, pagos, cuentas, comercio, CRM, analítica, asistente IA, recomendaciones de salud.
- **No indexable:** `noindex` en metadatos y `robots.txt` con `Disallow: /`.

## 2. Hechos confirmados (resumen; fuente: CLIENT.md)

Concepto ficticio en Monterrey, Nuevo León (PULSO Central, calle y colonia ficticias). La sede pasó de Guadalajara a Monterrey por petición del usuario (2026-10-17); `CLIENT.md` aún dice Guadalajara. Planes Esencial $699 / Activo $999 / Integral $1,799 MXN al mes, con inclusiones y límites del brief. Cuatro clases con horario ilustrativo. Cuatro entrenadores ficticios. Seis espacios. Horario del gimnasio y de recepción del brief. Canales `hola@pulso.example` y `+52 81 0000 0000` (lada de Monterrey) no operativos.

## 3. Dirección visual — Propuesto

**Idea:** *Ritmo visible.* PULSO se presenta como un club que entrena con claridad; el pulso es el hilo conductor. Una línea fina con un único latido recorre la página: aparece en los encabezados de sección (se dibuja al entrar) y en un riel de progreso lateral en escritorio. Las fotografías (concreto, luz LED fría) aportan la atmósfera; la interfaz es sobria y editorial.

Principios tomados de las referencias (sin copiar identidad):

| Referencia | Observado | Adaptación |
| --- | --- | --- |
| notoriousink.se | Base oscura con resplandores azules en bordes; líneas finas que cruzan secciones; frase central que se "rellena" con el scroll; marco desplazado tras fotos | Fondo grafito con halos fríos sutiles; línea de pulso como continuidad; manifiesto de Nosotros con relleno por palabra; marco desplazado en la foto de Nosotros |
| ai-robots (mdxpreview) | Navegación en píldora compacta; eyebrows entre líneas finas; índice fijo con activo + columna de medios que entra con desenfoque; selector de categorías con imagen central | Navegación superior compacta con superficie al hacer scroll; índice fijo de Instalaciones; selector de Equipamiento con imagen que cambia; apariciones con desenfoque breve |

**Recursos distintivos:** (1) línea de pulso; (2) tipografía Archivo en dos anchos — condensada y pesada para titulares, expandida en mayúsculas pequeñas para rótulos.

**Ritmo de fondos:** grafito → grafito → sección clara "hueso" para Paquetes (comparar con lectura cómoda) → grafito. Evita bloques indistinguibles.

### Tipografía — Propuesto
- Titulares: **Archivo Variable** (wdth 68–75, wght 750–850), mayúsculas selectivas.
- Rótulos/eyebrows: Archivo expandida (wdth 118–125), 11–12 px, tracking amplio.
- Texto: **Manrope Variable** 16–18 px.
- Fuentes autoalojadas (@fontsource, OFL), sin peticiones externas.

### Paleta — «Noche cálida y champán» (elegida por el agente a petición del usuario, 2026-10-17)
El usuario pidió una paleta a elección del agente para que el club se sienta «luxury». Sustituye a la provisional grafito/azul. Definida en variables CSS en `src/app/globals.css` (`--color-*`) para cambiarla sin tocar componentes. Todas las combinaciones de texto cumplen AA (mínimo 4.88:1).

| Uso | Valor |
| --- | --- |
| Fondo | `#0E0C0A` (negro espresso) / `#16130F` (superficie) |
| Texto principal | `#F2ECE2` (marfil) |
| Texto secundario | `#A89E90` (topo) |
| Acento | `#C9A66B` (champán); hover `#DCBF88`. CTA principales en champán con texto oscuro |
| Sección clara | `#EFE8DC` (travertino) con texto `#0E0C0A`; acento oscuro `#7A5518` (bronce) |

**Etalonaje:** video de portada y fotos usan `grade-photo` (ajuste mínimo), porque el material generado ya viene con luz cálida. `grade-warm` (cálido, baja saturación) queda definido pero sin uso.

### Movimiento
Motion (`motion/react`) para apariciones, riel de progreso y relleno del manifiesto; CSS para hover/focus. Duraciones 150–200 ms (respuesta), 250–500 ms (editorial). `prefers-reduced-motion`: sin relleno animado (texto completo), sin parallax, sin video automático (portada estática), scroll de anclas instantáneo.

## 4. Estructura y matriz de alcance

| # | Sección / flujo | Pregunta que responde | Contenido | Interacción | Comprobación |
| --- | --- | --- | --- | --- | --- |
| — | Navegación | ¿Dónde está cada cosa? | Marca, Nosotros, Instalaciones, Equipo (≥1280 px), Paquetes, Ubicaciones, menú «Más», ES/EN, CTA | Superficie al hacer scroll; menú móvil con foco atrapado y Esc | Anclas con compensación, teclado, móvil |
| 1 | Portada | ¿Qué es PULSO? | Tour de instalaciones sin personas (12.7 s en bucle: recepción → piso principal → peso libre → funcional → vestidores, fundidos de 0.5 s) o foto; eslogan + CTA aparecen 1 s después de iniciar el video | Pausar/reproducir; con movimiento reducido, autoplay bloqueado o fallo: fotograma fijo y mensaje inmediato | Variante `?portada=foto|video`, no se reinicia con idioma |
| 2 | Nosotros | ¿Cómo entrena PULSO? | Manifiesto, 3 principios, orientación inicial | Relleno por palabra | Legible con movimiento reducido |
| 3 | Equipamiento | ¿Qué equipo hay? | 4 categorías con equipos | Pestañas accesibles (flechas) e imagen | Teclado, móvil |
| 4 | Instalaciones | ¿Cómo son los espacios? | 6 espacios con foto y texto | Índice fijo con activo (escritorio) | Clic en índice lleva al espacio |
| 5 | Equipo | ¿Quién me orienta? | 4 perfiles ficticios | Paneles expansibles (hover/foco/clic); texto bajo la foto | Sin texto sobre cuerpos |
| 6 | Clases | ¿Qué clases hay y cuándo? | 4 clases + semana ilustrativa | Resaltar clase en la semana | Sin reservas |
| 7 | Paquetes | ¿Qué plan me conviene? | 3 planes + comparación | «Me interesa este plan» → formulario | Plan conservado al cambiar idioma |
| 8 | Ubicaciones | ¿Dónde y a qué hora? | Mapa ilustrativo, dirección ficticia, horarios, canales de muestra | La primera vez que el mapa está ≥ 55 % visible, zoom de vista de ciudad (rótulo MONTERREY) al pin en 1.8 s; luego aparece la etiqueta y el anillo late. Sin JS o con movimiento reducido: estado final. Ampliar mapa (diálogo, sin zoom); canales explican demo | Sin pin real ni enlaces externos |
| 9 | FAQ | Dudas frecuentes | 6 respuestas del brief + aclaración «¿Es real?» | `<details>` | Teclado |
| 10 | Contacto demo | Preparar visita | Formulario demo | Validar → resumen editable → «preparada, nada enviado» | Sin red, sin almacenamiento |
| — | Privacidad | ¿Qué pasa con mis datos? | Funcionamiento real de la demo | — | Bilingüe |
| — | 404 | — | Retorno al inicio | — | Bilingüe |

## 5. Arquitectura

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, `output: 'export'` → sitio estático en `out/`. Sin backend.
- **Contenido centralizado:** `src/content/site.ts` (datos compartidos: precios, horarios, rutas de medios) y `src/content/i18n.ts` (textos ES/EN). Sustituir fotos, textos, planes, personal o contacto sin tocar componentes.
- **Idioma:** contexto cliente (`LanguageProvider`), preferencia en `localStorage` (`pulso-lang`); cambia sin navegar, por lo que se conservan sección, plan y estado del formulario y el video no se reinicia.
- **Estado de solicitud:** contexto compartido entre Paquetes y Contacto; solo en memoria.
- **Portada configurable:** `site.hero.variant` (`'video' | 'photo'`), sobreescribible con `?portada=foto` / `?portada=video` para revisión.
- **Imágenes:** `scripts/optimize-images.mjs` (sharp) genera WebP en 640/1080/1600 px en `public/media/opt/`; `<img srcset>` con dimensiones reservadas y `loading="lazy"` fuera de la portada.

## 6. Recursos

Disponibles en `public/media` (generados por el usuario, derechos pendientes de acreditación): video de portada (`loop-720` 12.7 s, sin audio, en bucle como fondo por petición del usuario —sustituye la regla del brief de reproducirlo una sola vez—; `poster.jpg`). Es un tour generado con Kling 3.0 pro (5 tomas de 3 s) a partir de fotos del club; se reconstruye con `scripts/build-hero-tour.sh` y las tomas fuente están en `.gen/tour/`, 6 espacios, 4 equipamientos, `coaching.jpg`, 4 retratos.

**Serie fotográfica «club privado» (2026-10-17):** por petición expresa del usuario —que sustituye la restricción del brief de no generar recursos— y con su aprobación de costo, las 11 fotos de espacios/equipamiento/nosotros se regeneraron con Higgsfield `gpt_image_2_5` (calidad alta, 2k) y a los 4 retratos se les cambió fondo y luz conservando persona, ropa y pose. Dirección común: travertino, nogal, latón/bronce, iluminación lineal 2700K y ventanales al atardecer. Originales anteriores respaldados en `.gen/previous/`. Proporciones: `fuerza`, `estudio`, `coaching` 16:9 (2000×1131); resto 4:3 (2000×1493); retratos 2:3 (1360×2048).

Observaciones: el horizonte de `fuerza`, `cardio` y `eq-cardio` es una ciudad genérica con rascacielos que recuerda a Nueva York, no a Monterrey (el tour y el panorámico ya muestran montañas); aceptable en la demo, pero conviene regenerarlo si se busca coherencia con la sede. No hay foto específica de Movilidad ni Cycling (se usan `estudio.jpg` y `eq-cardio.jpg`); El video anterior (`intro-*`, `poster-end`) se movió a `.gen/old-hero/`. Logo definitivo: pendiente (se usa wordmark tipográfico).

## 7. Supuestos

- La variante de portada por defecto es **video**; la decisión final es del usuario.
- Tipografía es propuesta provisional. La paleta champán la eligió el agente por delegación expresa del usuario; sigue siendo sustituible.
- Copys redactados a partir de los hechos del brief; sin testimonios, cifras ni credenciales.

## 8. Preguntas abiertas (no bloquean la demo)

- Logo y variante definitiva de portada.
- Derechos de uso de las imágenes y video.
- Dominio, hosting, publicación.

## 9. Criterios de aceptación

Los de `CLIENT.md §12`, más: build estático sin errores, tipos limpios, pruebas de validación y paridad de traducciones, revisión en navegador a 1440, 1024, 768 y 390 px, teclado, movimiento reducido.

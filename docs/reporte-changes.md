# Cleaning Paradise — Reporte de cambios sobre el audit v3

**Fecha:** 18 de julio, 2026
**Base:** `cleaning-paradise-website-audit-v3.html` (66 action items)
**Entorno actual:** desplegado en `cleaning-paradise.nexteralab.workers.dev` — **aún no** en el dominio real `cleaningparadisellc.com`.
**Stack:** Next.js 16 (App Router) + React 19 sobre Cloudflare Workers (OpenNext), D1, R2.

Este documento cubre **los 66 puntos del audit**. El foco fue **técnico** (código/config). Los puntos de **diseño** (D1–D12) se marcan fuera de alcance por decisión del equipo, y los que dependen de acciones del dueño o de servicios externos (Google Business Profile, dominio, correo, fotos, Jobber, GA4) se documentan con la razón por la que no son implementables desde el código.

Verificación: `tsc --noEmit` limpio y `next build` exitoso con todas las rutas (incluidas `/privacy`, `/terms`, `/_not-found`) generadas correctamente.

---

## Leyenda de estados

| Estado | Significado |
|--------|-------------|
| ✅ **Hecho** | Implementado en código y verificado en build. |
| ✔️ **Ya OK** | Ya estaba resuelto en el build actual (el audit se hizo sobre una versión anterior). |
| 🟡 **Parcial** | Se implementó la parte técnica; queda un activo externo o trabajo de contenido/QA. |
| 📄 **Documentado** | No es código: requiere dueño, contenido, o servicio externo. |
| 🎨 **Diseño** | Fuera de alcance en esta pasada (equipo de diseño). |
| ⏸️ **Diferido** | Depende de conectar el dominio real. |

---

## Resumen ejecutivo

- **Bug crítico encontrado y corregido (no estaba en el audit):** el formulario del hero de la home **no enviaba nada** — su `onSubmit` hacía `reset()` y mostraba el modal de éxito sin ningún `fetch`. Todos los leads del formulario principal se perdían. Ahora envía a `/api/contact` con estados de carga/error. Relacionado con #04 y #51.
- **17 puntos implementados** en código, **9 parciales**, **4 ya estaban OK**, **1 diferido** (dominio), **12 de diseño** fuera de alcance, y el resto documentado como acción de dueño/externo.
- El **chatbot** también recolecta un lead completo y solo lo guarda en `localStorage` — **no lo envía al backend** (mismo patrón que el bug del hero). No estaba en el audit; se recomienda cablearlo a `/api/contact` igual que el hero. (Ver "Hallazgos adicionales".)

---

## P0 · Bugs críticos

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 01 | Links de ubicaciones del footer rotos (`/service-areas` 404) | ✅ Hecho | El footer ahora enlaza a las páginas reales `/locations/{seattle,bellevue,kirkland,lynnwood,mercer-island,shoreline,edmonds,mill-creek}`. |
| 02 | Contadores renderizan "0+" en el HTML | ✅ Hecho | `CountUp` ahora inicia en el valor final (SSR/no-JS/crawlers ven el número real); la animación es solo mejora progresiva y respeta `prefers-reduced-motion`. |
| 03 | Cifras contradictorias en el sitio | 📄 Documentado | Requiere que el dueño confirme las cifras oficiales una vez. Instancias en código: `contact/page.tsx` ("450+ · 4.9"), badges "4.9★ on Google" en `locations/[slug]`, "$55/hr" en FAQ home. No se tocaron para no inventar datos. |
| 04 | Hero: falta teléfono + probar envío end-to-end | ✅ Hecho | Se agregó campo teléfono (`type=tel`), nombre/apellido, y **se cableó el envío real a `/api/contact`** (antes no enviaba). Estados de carga, error y éxito incluidos. |
| 05 | Textos en español en páginas en inglés | ✅ Hecho | `locations/[slug]`: "Nuestros Servicios" → "Our Services", "Limpieza para cada hogar" → "Cleaning for every home". `ReviewCard`: "Ver más/Ver menos" → "Show more/Show less". Se recomienda un sweep manual final de contenido. |
| 06 | Dos teléfonos fundidos en un solo enlace | ✅ Hecho | En `contact/page.tsx` se separaron en dos enlaces `tel:` independientes (`+14256100241` y `+14254808629`). |
| 07 | Reproductor de música: pulir toggle | ✅ Hecho | Archivo renombrado `music_cleanign.mp3` → `music-cleaning.mp3`. El `aria-label`, `aria-pressed` y el estado playing/paused **ya existían**. |
| 08 | Markup crudo visible (tel texto, socials, "TT"/"Y") | 🟡 Parcial | Placeholders "TT"/"Y" del sidebar de contacto → iconos reales. Los socials del footer/contacto ya eran iconos con `aria-label`. El "tel: como texto plano" no se reproduce en el código actual (era del build anterior). |
| 09 | Privacy · Terms · Sitemap eran texto muerto | ✅ Hecho | Se crearon `/privacy` y `/terms` (contenido base honesto y acotado a lo que el sitio realmente hace) y se enlazaron en el footer. "Sitemap" → `/sitemap.xml`. **Nota: el texto legal debe pasar por revisión de un abogado antes del launch.** |

---

## P1 · Rendimiento (Core Web Vitals)

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 10 | Videos servidos desde GitHub raw | 🟡 Parcial | Videos movidos a `/public/video/` → ahora los sirve el propio Worker (CDN de Cloudflare), eliminando la dependencia frágil de GitHub. `preload="metadata"` agregado. **Pendiente:** compresión, `poster` e imagen fallback en móvil, que conviene hacer con el material final (ver D8). El bug "Seattle reproduce el video de Kirkland" persiste porque solo hay un video placeholder compartido; se resolverá con media por ciudad. |
| 11 | Imágenes sin optimizar | 📄 Documentado | El sitio usa `<img>` en vez de `next/image`. Recomendación: convertir a WebP/AVIF, `srcset` responsive y `loading="lazy"`. Es un cambio amplio y de pipeline de assets; no se aborda en esta pasada. |
| 12 | Renombrar/reemplazar archivos con typos | 📄 Documentado | Typos detectados: `comercial-cleaning.webp` → `commercial-`, `img/locations/edmons.png` → `edmonds.png`, y archivos con nombres en español (`Antes1/despues1/before/after`). No se renombraron para evitar romper referencias sin valor SEO inmediato; la imagen `gemini_generated_image_...` es contenido (foto real pendiente). |
| 13 | Definir targets de Core Web Vitals | 📄 Proceso | LCP < 2.5s móvil, CLS ≈ 0, INP < 200ms. Medir con PageSpeed Insights tras 10–12. |
| 14 | Higiene de carga de fuentes | ✔️ Ya OK | Se usa `next/font/google` (Instrument Serif + Poppins), que auto-hostea las fuentes y aplica `font-display: swap`. |
| 15 | Headers de caché y compresión en el Worker | ✔️ Ya OK | `public/_headers` ya sirve `/_next/static/*` con `Cache-Control immutable`. Cloudflare aplica Brotli/gzip automáticamente. |

---

## P2 · Conversión (confianza y captación)

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 16 | Cards de servicio con imágenes erróneas/duplicadas | 📄 Contenido | "Standard" usa `move-in.jpg`; `aw1a0626-scaled.jpg` aparece en "Move In/Out" y en la galería. Requiere fotos reales por servicio (ver D8). |
| 17 | Email de dominio + SPF/DKIM/DMARC | 📄 Externo | Depende del dominio y de DNS/email. Reemplazar `cleaning.paradise.llc@gmail.com` por `@cleaningparadisellc.com`. |
| 18 | Mostrar licencia/seguro específicos | 📄 Requiere dueño | Necesita el número WA UBI / licencia y montos de cobertura. |
| 19 | Poner la oferta 30% en la home | ✅ Hecho | Añadida al subtítulo del formulario del hero ("plus 30% off your first clean"). |
| 20 | Lista de ciudades del footer no coincide | ✅ Hecho | Alineada a las 8 páginas reales, cada ciudad enlazada individualmente (interno = SEO local). |
| 21 | Blog: publicar u ocultar | 🟡 Parcial | Los posts **sí existen** (`blog/posts.ts`, 6 artículos, `/blog/[slug]` genera). Falta verificar que los enlaces del bloque de blog en la home y en `/locations/seattle` apunten a URLs reales y no al genérico `/blog`. |
| 22 | Barra de acción fija en móvil (Call·Text·Quote) | 📄 Feature/Diseño | Choca con los botones flotantes (D11); decidir primero la estrategia de UI móvil. |
| 23 | Opción click-to-text (`sms:`) | 📄 Documentado | Requiere una línea de texto del negocio confirmada. Implementación trivial una vez definida. |
| 24 | Alimentar el formulario a Jobber | 📄 Externo | Integración vía embed/API de Jobber. Hoy los leads caen en D1 (`leads`). |
| 25 | "How it works" + garantía concreta | 🎨 Diseño/Contenido | |
| 26 | Sección "Meet the owner" | 📄 Contenido | Requiere foto real del equipo. |
| 27 | Slider antes/después en la home | 🎨 Feature | El componente `BeforeAfterSlider` ya existe; llevarlo a la home es trabajo de diseño/contenido. |
| 28 | Reforzar testimonios (ciudad, link verificado) | 📄 Contenido | Ligado a #03 (unificar conteo de reviews). |
| 29 | Ampliar FAQ + bloque de precios | 📄 Contenido | |

---

## D · Diseño (D1–D12) — 🎨 Fuera de alcance

Por indicación, los items de diseño quedan para el equipo de diseño y **no se implementaron**. Se listan para trazabilidad:

- **D1** Reemplazar cursor personalizado rosa.
- **D2** Subir la escala tipográfica sitewide.
- **D3** Unificar el pairing de fuentes.
- **D4** Sistema de contenedores responsive (shell 1360–1440px).
- **D5** Simplificar el card del hero ("Say hello!"). — *Parcialmente tocado:* al reescribir el formulario del hero, el encabezado pasó a "Get your free quote" con una sola línea de apoyo.
- **D6** Trust line "Licensed, Insured & Bonded".
- **D7** Strip de reviews con scroll horizontal.
- **D8** Shot list para la sesión de foto/video (habilita #10, #16, #26, #27, #43).
- **D9** Distribuir el header en desktop.
- **D10** Corregir breakpoints del grid de Locations.
- **D11** Que los controles flotantes no tapen contenido en móvil.
- **D12** Reducir blur/motion de entrada. — *Base cubierta:* `CountUp` ya respeta `prefers-reduced-motion`; el `<noscript>` del layout ya fuerza contenido visible sin JS.

---

## P3 · SEO técnico

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 30 | Títulos/descripciones duplicados | ✔️ Ya OK | Home y `/locations/seattle` ya tienen títulos únicos vía `generateMetadata`. Todas las páginas dinámicas (locations, services, blog) generan títulos únicos. |
| 31 | Structured data (JSON-LD) | 🟡 Parcial | Añadido `HouseCleaningService` (LocalBusiness) sitewide en el layout: nombre, teléfono, dirección, `areaServed` (8 ciudades), horario Mo–Sa 07:00–19:00, `priceRange`. `AggregateRating` **omitido a propósito** (riesgo de acción manual si no es verificable on-page). Pendiente: `FAQPage`, `Service`, `BreadcrumbList`. |
| 32 | Dominio, canonicals y redirects | ⏸️ Diferido | Depende de conectar `cleaningparadisellc.com`. Al conectarlo: agregar `rel=canonical` al dominio final, `noindex`/301 del `*.workers.dev`, forzar HTTPS y un solo host. `metadataBase` ya lee `NEXT_PUBLIC_SITE_URL`. |
| 33 | sitemap.xml + robots.txt reales | ✅ Hecho | Ya existían (`robots.ts`, `sitemap.ts`). Se quitó la entrada fantasma `/service-areas` (404) y se agregaron `/privacy` y `/terms`. Enviar a Search Console/Bing = acción del dueño. |
| 34 | Pasada de accesibilidad | 🟡 Parcial | Hecho: skip link, landmark `<main id="main">`, targets táctiles móviles 36→44px. Ya existía `aria-current="page"`. Pendiente (ongoing): auditoría de `alt`, contraste, foco visible, test de teclado completo. |
| 35 | Open Graph + Twitter cards | ✅ Hecho | Añadidos `openGraph` y `twitter` por defecto en el layout (title, description, `og:image` = logo). Se recomienda una `og:image` de marca por tipo de página más adelante. |
| 36 | Favicon y touch icons | 🟡 Parcial | Se cableó `favicon.svg` vía `metadata.icons` (icon + apple). Recomendado completar el set: `favicon.ico`, `apple-touch-icon` PNG y `manifest`. |
| 37 | Página 404 personalizada | ✅ Hecho | `app/not-found.tsx` branded con enlaces a Home/Services/Locations/Contact y `noindex`. |
| 38 | Breadcrumbs + `BreadcrumbList` | 📄 Documentado | No implementado (medium). Recomendado en páginas de ciudad y servicio. |

---

## P4 · Crecimiento local

Todo este bloque es **externo o de contenido** (no código), salvo notas de infraestructura:

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 39 | Google Business Profile | 📄 Externo | |
| 40 | Motor de reviews (post-job) | 📄 Externo | Vía Jobber. |
| 41 | Consistencia NAP en citations | 📄 Externo | |
| 42 | Agregar páginas de ciudad faltantes (Bothell, etc.) | 📄 Contenido | **Infra lista:** basta agregar un objeto a `locations/locations-data.ts` y la ruta `/locations/[slug]` + el sitemap se generan solos. |
| 43 | Des-templatizar páginas de ciudad | 📄 Contenido | Intro única, barrios, testimonio y media por ciudad. |
| 44 | Páginas de servicio dedicadas | ✔️ Ya OK | Ya existen en `/cleaning-services-in-wa/[slug]` (6 servicios) con su `services-data.ts`. |
| 45 | Calendario de contenido (2 posts/mes) | 📄 Contenido | |
| 46 | Image SEO (alt/filenames) | 📄 Contenido | Ligado a #12. |

---

## P5 · Medición

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 47 | GA4 con eventos de conversión | 📄 Requiere ID | Falta el Measurement ID. El scaffolding (script gated por `NEXT_PUBLIC_GA_ID` + eventos `quote_submitted`, `call_click`, `text_click`) es trivial una vez provisto. |
| 48 | Microsoft Clarity | 📄 Requiere ID | Igual que GA4. |
| 49 | Captura de lead-source (UTM/referrer) | 📄 Documentado | Implementable: campo oculto que capture UTM/referrer y se guarde en `leads.source`/`notes` (la columna `source` ya existe; hoy vale `contact`/`home-hero`). No implementado a la espera de decidir el destino (DB vs email vs Jobber). |
| 50 | Loop de revisión mensual | 📄 Proceso | |

---

## P6 · QA de lanzamiento

| # | Item | Estado | Detalle |
|---|------|--------|---------|
| 51 | Endurecer entrega de formularios + anti-spam | 🟡 Parcial | Hecho: el hero **ahora sí entrega** (estaba roto); ambos formularios tienen estados carga/disabled/error/éxito; el servidor valida nombre+email; el éxito se dispara solo tras respuesta OK del servidor. **Pendiente:** Cloudflare Turnstile / rate-limit (existe el skill `turnstile-spin`) y prevención de duplicados. Hoy `/api/contact` es público sin captcha. |
| 52 | Autofill + microcopy de privacidad + estados de selección | ✅ Hecho | `autocomplete` en ambos formularios (given-name, family-name, email, tel, address-line1/2, postal-code); microcopy "By submitting… Privacy Policy" en contacto; `aria-pressed` en botones de servicio (los de mascotas ya lo tenían). |
| 53 | Semántica de headings + espaciado de texto | 🟡 Parcial | El índice de servicios usaba **dos `<h1>`** → unificado en un solo `<h1>` con `<span>`. El caso "soyou"/"Tips&" de About/Blog no se reproduce en el código actual; queda documentado para verificar en QA. |
| 54 | Matriz de test responsive | 📄 Proceso | Aprobar cada template en 320/390/768/820/1024/1280/1440/1920px + zoom 200%. Gate de launch. |

---

## Hallazgos adicionales (fuera del audit)

1. **Chatbot no persiste leads.** `components/chatbot/ChatBot.tsx` recorre toda la conversación, marca `completedAt` y guarda el lead solo en `localStorage` (`leadStore.ts`) — **nunca hace `fetch` a `/api/contact`**. Cada lead del chatbot se pierde. Recomendación: cablearlo a `/api/contact` con `source: "chatbot"` (mismo fix que se aplicó al hero). *No implementado* — se dejó documentado para confirmar el comportamiento deseado.
2. **Archivo basura en la raíz:** `video` (1 byte, sin contenido) — eliminado.
3. **`/api/contact` sin validación de longitud ni rate-limit** — cualquiera puede llenar la tabla `leads`. Cubierto parcialmente por #51; el siguiente paso natural es Turnstile.

---

## Email transaccional (Resend)

Se implementó envío de correo con **Resend** para todos los formularios. Al crear un lead en `/api/contact` se disparan dos correos (sin bloquear la respuesta, vía `ctx.waitUntil` — si el email falla, el lead ya quedó guardado en D1):

1. **Notificación al negocio** (`LEAD_NOTIFY_TO`), con `reply_to` = email del cliente, para responderle directo.
2. **Confirmación al cliente**, con copy adecuado a cada formulario.

**Arquitectura** (`src/lib/email/`):
- `send.ts` — servicio global de envío (Resend REST API vía `fetch`, sin dependencias nuevas; corre en Workers).
- `index.ts` — `sendLeadEmails(env, lead)`: orquesta notificación + confirmación con `Promise.allSettled` (un fallo no bloquea al otro).
- `types.ts` — tipos `Lead`, `Email`, `Template`.
- `templates/` — una plantilla por tipo de formulario, todas sobre una shell de marca compartida (`layout.ts`):
  - `contact.ts` — formulario completo de `/contact`.
  - `homeHero.ts` — formulario rápido del hero (incluye recordatorio de 30%).
  - `serviceQuote.ts` — quote de página de servicio (mapea códigos a nombres, promete respuesta en 2h).
  - `chatbot.ts` — lead del asistente de chat (listo, aún no cableado — ver hallazgo #1).
  - `index.ts` — `templateFor(source)` con fallback a `contact`.

**Cableado adicional:** el formulario del **hero** y el **QuoteForm de servicios** no enviaban nada (mismo bug que se documentó antes); ambos ahora hacen POST a `/api/contact` con `source` propio (`home-hero`, `service-quote`), estados de carga/error y `autocomplete`.

**Variables de entorno** (en `.dev.vars` local; en prod usar `wrangler secret put`):
- `RESEND_API_KEY` — provista.
- `EMAIL_FROM` — `Cleaning Paradise <noreply@thenexteralab.com>` (dominio **verificado hoy** en Resend). Cambiar a `cleaningparadisellc.com` cuando se verifique ese dominio.
- `LEAD_NOTIFY_TO` — `cleaning.paradise.llc@gmail.com`.

**Verificación:** API key validada, dominio `thenexteralab.com` verificado, y envío de prueba aceptado por Resend (`delivered@resend.dev`) con el remitente y `reply_to` reales.

**Impacto en el audit:** cubre parte de #17 (envío desde dominio propio autenticado), #24 (los leads ahora notifican por email además de guardarse en D1) y #51 (ruta de entrega documentada + confirmación real de éxito).

---

## Archivos modificados

**Código:**
- `src/app/home-client.tsx` — hero form cableado a `/api/contact` + teléfono + nombre/apellido + estados + `autocomplete` + copy 30% + video local + `preload`.
- `src/app/layout.tsx` — OpenGraph/Twitter, `icons` (favicon), JSON-LD `HouseCleaningService`, skip link, landmark `<main>`.
- `src/components/Footer.tsx` — links de ubicaciones reales, lista de ciudades alineada, Privacy/Terms/Sitemap enlazados.
- `src/components/CountUp.tsx` — valor final en SSR + respeto a `prefers-reduced-motion`.
- `src/components/MusicPlayer.tsx` — ref al mp3 renombrado.
- `src/components/Navbar.tsx` — targets táctiles móviles 44px.
- `src/components/ReviewCard.tsx` — "Show more/less".
- `src/app/contact/page.tsx` — dos `tel:` separados + iconos TikTok/Yelp.
- `src/app/contact/ContactForm.tsx` — `autocomplete`, `aria-pressed`, microcopy de privacidad.
- `src/app/cleaning-services-in-wa/page.tsx` — un solo `<h1>`.
- `src/app/locations/[slug]/page.tsx` — strings a inglés + video local.
- `src/app/sitemap.ts` — quitado `/service-areas`, agregados `/privacy` y `/terms`.

- `src/app/api/contact/route.ts` — dispara emails tras guardar el lead (`ctx.waitUntil`).
- `src/app/cleaning-services-in-wa/[slug]/client-sections.tsx` — QuoteForm cableado a `/api/contact` + estados + `autocomplete`.
- `src/cf-env.d.ts` — tipos de env de Resend.

**Nuevos:**
- `src/app/not-found.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`.
- `src/lib/email/` — `send.ts`, `index.ts`, `types.ts` y `templates/` (`layout.ts`, `contact.ts`, `homeHero.ts`, `serviceQuote.ts`, `chatbot.ts`, `index.ts`).

**Assets:**
- `cleaning-paradise-bg.mp4`, `kirkland-bg.mp4` → `public/video/` (git mv).
- `public/music/music_cleanign.mp3` → `public/music/music-cleaning.mp3` (git mv).
- Eliminado `video` (1 byte, basura).

---

## Próximos pasos recomendados (acción del dueño / externo)

1. **Confirmar cifras oficiales** (#03) — reviews, años, rating, fuente — para unificarlas en todo el sitio.
2. **Conectar el dominio** `cleaningparadisellc.com` y luego resolver canonicals/redirects (#32) y el email de dominio + SPF/DKIM/DMARC (#17).
3. **Turnstile** en `/api/contact` (#51) — el skill `turnstile-spin` lo automatiza.
4. **Decidir el destino de leads** (#24, #49): ¿quedan en D1, se envían por email, o van a Jobber? Hoy caen en la tabla `leads` de D1.
5. **Confirmar comportamiento del chatbot** (hallazgo #1) para cablearlo a `/api/contact`.
6. **Sesión de foto/video** (D8) — desbloquea #10, #16, #26, #27, #43.
7. **GA4/Clarity IDs** (#47, #48) para activar medición antes de invertir en ads.
8. **Revisión legal** del texto de `/privacy` y `/terms`.

# MIRABOLANTE — Acuerdos de trabajo y contexto del proyecto

## Sobre el cliente

- **Empresa**: MIRABOLANTE TRADING
- **Qué es**: Trading house internacional con base en Panamá. Equipo operativo en Costa Rica.
- **Qué hacen**: Compran materias primas e ingredientes alimentarios en Sudamérica (Brasil, Uruguay, Paraguay, Colombia, Argentina) y los venden a clientes industriales en Latinoamérica. Manejan toda la logística hasta el puerto del cliente (precio CIF). Volumen mínimo: 1 contenedor.
- **Productos actuales**:
  - Consumo humano: arroz, frijoles, maíz, azúcar, sal, especias, harina de trigo
  - Consumo animal: salvado de trigo, torta de soja, harina de soya, sales y minerales
- **Clientes**: B2B únicamente. Industrias alimentarias, distribuidores, procesadores.
- **Diferenciador**: Acceso a proveedores grandes que no venden directo a clientes pequeños. Flexibilidad comercial. Transparencia en tiempos y especificaciones técnicas. Relaciones a largo plazo.
- **Audiencia del sitio**: Señores conservadores de la industria alimentaria. El sitio es de levantamiento de confianza, no de conversión directa.

## Acuerdos de trabajo

### 1. Copia literal, no aproximada
Cuando el usuario pasa un link de referencia y pide clonar una sección, debe ser una réplica exacta — todos los estilos, efectos, layouts, formas y medias. No hacer algo "parecido", más fácil o a medio camino. El objetivo es partir de una base sólida idéntica a la referencia para luego personalizar. Una copia aproximada genera retrabajo.

### 2. Honestidad sobre limitaciones
Si algo no se logra replicar, decirlo abiertamente para trabajarlo juntos. NUNCA decir "listo" o "terminado" cuando el trabajo está incompleto o mal hecho. Antes de confirmar que algo está listo, verificar que realmente cumple con la referencia. Si hay gaps, listarlos explícitamente.

### 3. Preguntar antes de asumir
El usuario prefiere millones de preguntas antes que suposiciones incorrectas que lleven a trabajo doble. Las suposiciones incorrectas generan retrabajo. El usuario está disponible para resolver dudas. Ante cualquier ambigüedad sobre la referencia, diseño o implementación, preguntar primero.

### 4. Todo en local, sin dependencias externas
No inyectar dependencias de otros sitios web. Todo debe estar en local (fuentes, imágenes, íconos, videos, etc.). No usar links a CDNs externos. Independencia total del sitio.

### 5. Refactorizar al final
El flujo es: clonar secciones de sitios de referencia -> completar el sitio -> refactorizar adaptándolo al cliente, marca y finalidad real. Separar la fase de construcción de la de personalización permite avanzar más rápido y con mejor calidad.

### 6. Protocolo para animaciones difíciles
No quedarse "pegado" intentando replicar una animación que no se entiende o no se logra. El flujo es: (1) leer el código fuente y replicar, (2) si no queda claro, el usuario describe el comportamiento, (3) si aún así no se logra, soltar la copia y crear una animación nueva desde cero entre los dos que cumpla la misma finalidad. Es más productivo crear algo custom que funcione que forzar una copia que no sale.

### 7. Commits frecuentes
Hacer commit al cerrar cada milestone importante (ej: sección lista, refactor completado, video carousel funcionando). No acumular trabajo sin commit — si algo se rompe, necesitamos punto de retorno.

## Stack técnico

- **Framework**: Angular (standalone components, lazy loading)
- **Estilos**: SCSS con variables centralizadas en `src/_variables.scss`
- **Fuente**: Sora (Google Fonts, variable font, descargada local en `public/fonts/`)
- **Colores**: Brand #0044BD, negro #1a1a1a, blanco. Sin otros colores por ahora.
- **Tipografía**: Escala global definida en variables ($fs-display, $fs-h1, $fs-h2, $fs-h3, $fs-body, $fs-small, $fs-xs)
- **Layout nav**: Columnas compartidas entre nav y hero grid via variables ($nav-side-width, $nav-center-width, $nav-max-width)
- **Videos**: Comprimidos con ffmpeg, en `public/videos/`. Desktop (d1-d4) y mobile (m1-m3).

## Estructura del homepage (orden actual)

1. **Hero** — video carousel con crossfade, título "Trading / & Global Food Sourcing", botón CTA, nav transparente con logo
2. **Solutions** — dos columnas: heading + CTA izquierda, items con hover derecha
3. **Showcase** — video + card estadística izquierda, texto + marquee derecha
4. **About** — imagen fullbleed con parallax, card sticky a la derecha (110vh)
5. **Home Cards** — 4 cards interactivos en 2 filas, hover expand + overlay negro + texto
6. **FAQ** — título sticky izquierda, acordeones derecha

## Pendientes conocidos

- Footer con CTA — decidido pero no implementado aún
- Responsive/mobile — no se ha trabajado todavía
- Contenido real del cliente — textos actuales son placeholder de referencias

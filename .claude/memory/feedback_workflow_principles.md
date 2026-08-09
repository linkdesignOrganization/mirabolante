---
name: Principios de trabajo para clonación de sitios web
description: Acuerdos fundamentales sobre cómo trabajar con referencias web, calidad de entrega, comunicación y flujo de trabajo
type: feedback
---

## Flujo de trabajo general
El proceso es: clonar secciones de sitios de referencia → completar el sitio → refactorizar adaptándolo al cliente, marca y finalidad real.

1. **Trabajo basado en referencias**: El usuario pasa un link de sitio web e indica qué sección clonar.

2. **Copia literal, no aproximada**: Cuando se clona una sección, debe ser una réplica exacta — todos los estilos, efectos, layouts, formas y medias. No hacer algo "parecido", más fácil o a medio camino.
   **Why:** El objetivo es partir de una base sólida idéntica a la referencia para luego personalizar. Una copia aproximada genera retrabajo.
   **How to apply:** Revisar visualmente cada detalle (animaciones, hover effects, responsive, spacing, tipografía) antes de reportar como terminado.

3. **Honestidad sobre limitaciones**: Si algo no se logra replicar, decirlo abiertamente para trabajarlo juntos. NUNCA decir "listo" o "terminado" cuando el trabajo está incompleto o mal hecho.
   **Why:** Reportar trabajo incompleto como terminado genera trabajo doble y pérdida de confianza.
   **How to apply:** Antes de confirmar que algo está listo, verificar que realmente cumple con la referencia. Si hay gaps, listarlos explícitamente.

4. **Preguntar antes de asumir**: El usuario prefiere millones de preguntas antes que suposiciones incorrectas que lleven a trabajo doble.
   **Why:** Las suposiciones incorrectas generan retrabajo. El usuario está disponible para resolver dudas.
   **How to apply:** Ante cualquier ambigüedad sobre la referencia, diseño o implementación, preguntar primero.

5. **Todo en local, sin dependencias externas**: No inyectar dependencias de otros sitios web. Todo debe estar en local (fuentes, imágenes, íconos, etc.).
   **Why:** Independencia total del sitio, sin depender de CDNs o recursos externos que pueden cambiar o caer.
   **How to apply:** Descargar fuentes, íconos y cualquier recurso necesario. No usar links a CDNs externos.

6. **Refactorización al final**: Primero se completa el sitio clonando referencias, después se refactoriza para adaptarlo al cliente y marca real.
   **Why:** Separar la fase de construcción de la de personalización permite avanzar más rápido y con mejor calidad.

7. **Protocolo para animaciones difíciles**: No quedarse "pegado" intentando replicar una animación que no se entiende o no se logra. El flujo es: (1) leer el código fuente y replicar, (2) si no queda claro, el usuario describe el comportamiento, (3) si aún así no se logra, soltar la copia y crear una animación nueva desde cero entre los dos que cumpla la misma finalidad.
   **Why:** Quedarse estancado en un callejón sin salida es perder tiempo. Es más productivo crear algo custom que funcione que forzar una copia que no sale.
   **How to apply:** Si tras un intento razonable la animación no se replica bien, comunicarlo inmediatamente y proponer crear una alternativa custom juntos. No insistir en loops de prueba y error sin fin.

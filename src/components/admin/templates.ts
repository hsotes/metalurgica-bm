export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  linkedinFormat: string;
  markdown: string;
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: 'articulo',
    name: 'Articulo Estandar',
    description: 'Articulo libre con texto e imagenes. Ideal para temas tecnicos y educativos.',
    linkedinFormat: 'Post de texto largo',
    markdown: `## Introduccion

[Contexto del tema y por que es relevante para el lector]

## Desarrollo

[Contenido principal del articulo]

## Conclusion

[Resumen y llamada a la accion]

---

En **Metalurgica Boto Mariani** [CTA relevante]. [Contactanos](/contacto/) para mas informacion.
`,
  },
  {
    id: 'listicle',
    name: 'Listicle (Top N)',
    description: 'Lista numerada con imagenes. Perfecto para carrusel multi-imagen en LinkedIn.',
    linkedinFormat: 'Carrusel multi-imagen',
    markdown: `## 1. [Primer elemento]

![Descripcion de la imagen](/images/arquitectura/ejemplo.jpg)

Descripcion detallada de este elemento. Materiales, ventajas, aplicaciones.

## 2. [Segundo elemento]

![Descripcion de la imagen](/images/arquitectura/ejemplo.jpg)

Descripcion detallada...

## 3. [Tercer elemento]

![Descripcion de la imagen](/images/arquitectura/ejemplo.jpg)

Descripcion detallada...

## Como elegir el mejor para tu proyecto?

- **Criterio 1**: explicacion
- **Criterio 2**: explicacion
- **Criterio 3**: explicacion

---

En **Metalurgica Boto Mariani** fabricamos a medida. [Pedi tu presupuesto](/contacto/).
`,
  },
  {
    id: 'comparativa',
    name: 'Comparativa (A vs B)',
    description: 'Comparacion detallada con tabla. Genera mucho engagement en LinkedIn.',
    linkedinFormat: 'Post con tabla/infografia',
    markdown: `## Introduccion

Cuando se trata de [tema], la pregunta mas frecuente es: [Opcion A] o [Opcion B]?

## Opcion A: [Nombre]

**Ventajas:**
- Ventaja 1
- Ventaja 2

**Desventajas:**
- Desventaja 1

## Opcion B: [Nombre]

**Ventajas:**
- Ventaja 1
- Ventaja 2

**Desventajas:**
- Desventaja 1

## Tabla comparativa

| Caracteristica | Opcion A | Opcion B |
|---|---|---|
| Durabilidad | | |
| Costo | | |
| Mantenimiento | | |
| Estetica | | |

## Nuestra recomendacion

[Conclusion con recomendacion segun caso de uso]

---

Necesitas asesoramiento? [Contactanos](/contacto/).
`,
  },
  {
    id: 'guia',
    name: 'Guia Tecnica',
    description: 'Tutorial paso a paso. Posiciona como experto y genera confianza.',
    linkedinFormat: 'Post educativo / documento PDF',
    markdown: `## Por que es importante [tema]

[Contexto y relevancia]

## Antes de empezar

**Herramientas/materiales necesarios:**
- Item 1
- Item 2

## Paso 1: [Titulo del paso]

[Explicacion detallada]

## Paso 2: [Titulo del paso]

[Explicacion detallada]

## Paso 3: [Titulo del paso]

[Explicacion detallada]

## Errores comunes a evitar

1. **Error 1**: explicacion
2. **Error 2**: explicacion

## Conclusion

[Resumen de lo aprendido]

---

En **Metalurgica Boto Mariani** tenemos mas de 30 anos de experiencia. [Consultanos](/contacto/).
`,
  },
  {
    id: 'caso',
    name: 'Caso de Estudio',
    description: 'Proyecto realizado con fotos y detalles. Muestra tu trabajo real.',
    linkedinFormat: 'Carrusel antes/despues',
    markdown: `## El proyecto

**Cliente:** [Nombre o tipo de cliente]
**Ubicacion:** [Ciudad, Provincia]
**Plazo:** [Duracion del proyecto]

[Descripcion general del proyecto y sus objetivos]

## El desafio

[Que problemas o requerimientos especiales tenia este proyecto]

## Nuestra solucion

[Como lo resolvimos, que materiales y tecnicas usamos]

![Foto del proceso](/images/ejemplo.jpg)

## Especificaciones tecnicas

- **Material:**
- **Dimensiones:**
- **Acabado:**
- **Normativa:**

## Resultado final

![Foto del resultado](/images/ejemplo.jpg)

[Descripcion del resultado y satisfaccion del cliente]

---

Tenes un proyecto similar? [Pedi tu presupuesto sin compromiso](/contacto/).
`,
  },
];

export const categories = [
  'Estructuras',
  'Arquitectura Metalica',
  'Griglia',
  'Vivienda Modular',
  'TBex',
  'Industria',
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

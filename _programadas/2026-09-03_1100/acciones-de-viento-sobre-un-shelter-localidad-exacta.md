---
title: "Acciones de viento sobre un shelter: por qué la localidad exacta cambia el cálculo"
description: "Velocidad básica, categoría de exposición y factor de importancia: las tres entradas que convierten a un mismo shelter en dos estructuras distintas según dónde se emplace."
date: "2026-09-03"
author: "Ing. Hernán Soto Escalante"
image: "/blog/acciones-de-viento-sobre-un-shelter-localidad-exacta/portada.jpg"
category: "TBex"
tags: ["shelters", "CIRSOC 102", "acciones de viento", "cálculo estructural", "categoría de exposición", "vuelco"]
---

Un shelter es una estructura liviana con mucha superficie expuesta. Esa combinación hace que el viento sea, en la mayoría de los emplazamientos, la acción que gobierna el dimensionamiento —por encima del peso propio y por encima de las cargas de uso—. Y el viento se calcula a partir de datos que dependen enteramente de dónde va a estar parada la caja.

De ahí que "provincia de Buenos Aires" o "provincia de Mendoza" no alcancen como dato de entrada. No es una formalidad administrativa: son entradas distintas que producen estructuras distintas.

## Las tres entradas del cálculo

El **CIRSOC 102**, reglamento argentino de acción del viento sobre las construcciones, organiza el problema alrededor de tres parámetros que se determinan antes de tocar la estructura.

### Velocidad básica

La velocidad básica **V** es la de ráfaga de tres segundos, medida a 10 metros de altura sobre terreno de exposición C, con un período de recurrencia de 50 años. Se obtiene del mapa de velocidades básicas del reglamento, que zonifica el país.

Los dos detalles de esa definición importan más de lo que parece. Que sea **ráfaga de tres segundos** significa que no es comparable con velocidades medias horarias ni con lecturas de estaciones meteorológicas informadas de otra manera. Y que esté referida a **10 metros y exposición C** significa que es un valor de referencia que después hay que trasladar a la altura y al entorno reales del sitio.

### Categoría de exposición

El reglamento define cuatro categorías de exposición. Describen la rugosidad del entorno, es decir, la capacidad del terreno circundante de frenar el viento antes de que llegue a la construcción.

| Entorno | Efecto |
|---|---|
| Urbano o suburbano, con obstrucciones próximas | Mayor rugosidad, el viento llega frenado |
| Campo abierto con obstrucciones dispersas y bajas | Rugosidad intermedia, es la referencia del mapa |
| Terreno plano y sin obstrucciones, o costa expuesta | Rugosidad mínima, el viento llega limpio |

La magnitud del efecto es la que sorprende. Para una misma altura, la diferencia de presión dinámica entre una exposición suburbana y una de campo abierto supera holgadamente el 40 %. La categoría de exposición no es un ajuste fino: es un factor de primer orden.

Y acá está la trampa habitual de los shelters. Se emplazan, por definición del producto, en sitios sin edificación alrededor: banquinas de ruta, predios de parques solares, plataformas al pie de torre, campos abiertos. Es decir, casi siempre en las categorías de mayor exposición, que son las más desfavorables. Un shelter rara vez está protegido por su entorno.

### Factor de importancia

El factor de importancia **I** se determina según la categoría de la construcción. Para edificaciones normales —viviendas, oficinas— vale 1. Para construcciones cuya falla tenga consecuencias mayores, o que deban permanecer operativas después del evento, el factor sube.

Un shelter que aloja las protecciones de una interconexión eléctrica, el equipamiento de un sistema de control de tránsito aéreo o la infraestructura de comunicaciones de un corredor es, precisamente, una construcción que tiene que seguir en pie y operando cuando pasó lo peor. Encuadrarlo en la categoría que corresponde eleva el factor de importancia y con él toda la acción de diseño.

Es una decisión de proyecto con consecuencia directa en el costo, y conviene tomarla explícitamente en lugar de heredarla por omisión.

## Por qué el vuelco manda antes que la tensión

En una estructura pesada, el viento se traduce en esfuerzos que hay que verificar en las barras. En un shelter no suele ser ese el problema.

La relación entre superficie expuesta y peso propio es completamente distinta a la de una construcción convencional. Un módulo de dimensiones habituales presenta varios metros cuadrados de superficie de barlovento y pesa, con envolvente de panel, del orden de una a dos toneladas vacío. Con las presiones de diseño de un sitio de campo abierto, la resultante horizontal y la succión sobre el techo generan un momento de vuelco que compromete el anclaje mucho antes de que ninguna barra del bastidor se acerque a su capacidad.

El resultado práctico es que los perfiles del bastidor suelen quedar gobernados por otras condiciones —rigidez, deflexiones de piso bajo el equipamiento, condiciones de izaje y transporte— mientras que el viento se juega íntegramente en las placas de apoyo, los anclajes y las reacciones que se transmiten a la fundación.

Esa es la razón por la que el cálculo de viento de un shelter termina siendo, en los hechos, un cálculo de anclaje. Y por la que las reacciones de diseño son el entregable que de verdad necesita quien ejecuta la obra civil.

## La succión en el techo

Hay un aspecto de las acciones de viento que se subestima con frecuencia en construcciones bajas: el techo no trabaja hacia abajo, trabaja hacia arriba.

El flujo que se separa en el borde de barlovento genera succiones que en las zonas de esquina y de borde alcanzan valores sensiblemente mayores que en el centro del paño. Para un techo liviano de panel, esas succiones locales definen la fijación: cantidad y separación de tornillos, capacidad del sujetador y espesor de chapa en la zona de fijación.

Es una verificación que no aparece en el dimensionamiento de los perfiles principales y que, sin embargo, es la que explica la mayoría de los daños reales por viento en construcciones livianas.

## Lo que deja la experiencia

El cálculo de viento de un shelter es corto. Lo largo es conseguir las tres entradas.

La velocidad básica sale del mapa una vez que se sabe la localidad, no la provincia. La categoría de exposición sale de mirar el entorno inmediato del emplazamiento, no de una suposición general. Y el factor de importancia sale de una decisión sobre qué se espera de esa construcción después de un evento extremo.

Cuando alguna de las tres no está disponible al momento de calcular —y muchas veces no lo está, porque el sitio exacto se define después— la salida no es tomar la más benigna. Es adoptar la hipótesis desfavorable razonable, dejarla escrita en la memoria, y explicitar que un cambio de emplazamiento obliga a rever el cálculo. Un shelter dimensionado para campo abierto trabaja bien en un entorno protegido. Al revés no.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con el [análisis de las variables de diseño que definen la vida útil](/blog/vida-util-de-un-shelter-modular-analisis-de-las-variables-de-diseno/) y con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).*

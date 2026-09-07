---
title: "La unión entre el pórtico metálico y el elemento de madera"
description: "En un sistema híbrido cada material tiene su reglamento, pero la interfaz entre los dos no la gobierna ninguno. Qué decide esa unión y por qué la rigidez importa tanto como la resistencia."
date: "2026-09-07"
author: "Ing. Hernán Soto Escalante"
image: "/blog/union-portico-metalico-elemento-de-madera/portada.jpg"
category: "Estructuras"
tags: ["estructura híbrida", "madera masiva", "uniones", "CIRSOC 601", "Eurocódigo 5", "conectores de corte"]
---

En una estructura híbrida el acero hace lo que sabe hacer y la madera también. El problema no está en ninguno de los dos: está en el punto donde se tocan.

Y ese punto tiene una particularidad administrativa que termina siendo técnica. Cada material llega con su propio cuerpo reglamentario, redactado por gente distinta, con hipótesis distintas y coeficientes distintos. Ninguno de los dos fue escrito pensando en el otro.

## Dos reglamentos y una interfaz sin dueño

En Argentina, la estructura de acero se diseña con el **CIRSOC 301** y la de madera con el **CIRSOC 601**, que cubre madera aserrada, laminada encolada y productos derivados, y que dedica su capítulo 8 al diseño de uniones mecánicas. Los dos reglamentos existen, están vigentes y son buenos.

Lo que ninguno resuelve del todo es la unión entre un elemento de acero y uno de madera trabajando en conjunto. El de acero gobierna hasta la chapa de nudo; el de madera gobierna desde el pasador hacia adentro de la pieza. La transferencia entre ambos queda en una zona de frontera que hoy se resuelve por criterio del calculista más que por prescripción normativa.

En Europa el problema está algo más ordenado porque el **Eurocódigo 5** trata explícitamente las uniones acero-madera con pasadores y bulones, incluyendo su comportamiento bajo solicitación combinada en el plano de corte. Es el marco al que en la práctica se termina recurriendo cuando el proyecto necesita respaldo.

## La madera gobierna la unión, no el acero

La primera consecuencia práctica es contraintuitiva para quien viene del metal: **en una unión acero-madera el que decide casi siempre es el lado de la madera**.

El acero de un pasador tiene una resistencia holgada. Lo que limita la capacidad es el aplastamiento de la madera alrededor de ese pasador y la posibilidad de que la pieza se abra siguiendo la fibra. Por eso las reglas de separación entre elementos de fijación son tan estrictas y tan poco negociables. El Eurocódigo 5 fija, para bulones, separaciones mínimas del orden de **siete diámetros en dirección paralela a la fibra y cuatro en dirección perpendicular**.

Esos números no son una recomendación de buena práctica: son lo que evita que la unión falle por hendimiento, que es un modo de rotura frágil. Y tienen una consecuencia geométrica inmediata que sorprende al que dimensiona con criterio de acero: **una unión acero-madera ocupa mucho más lugar** que la unión equivalente entre dos perfiles metálicos. La chapa de nudo crece, la pieza de madera tiene que crecer con ella, y el detalle que en el modelo era un punto pasa a ser una zona de treinta o cuarenta centímetros.

## La rigidez importa tanto como la resistencia

Hay un segundo aspecto que en acero se puede despachar rápido y en híbrido no.

Cuando dos elementos trabajan como sección compuesta, el grado de colaboración entre ellos depende de la **rigidez del conector**, no solo de su resistencia. Un conector que resiste la carga pero desliza demasiado deja de transferir corte y la sección deja de ser compuesta: pasan a ser dos elementos apilados trabajando por separado, con una inercia mucho menor que la calculada.

La investigación sobre sistemas híbridos acero-madera contralaminada es explícita en esto. En los ensayos de conectores de alto desempeño —barras de acero embebidas en el panel con mortero epoxi— se reportan resistencias del orden de los **290 kN** y, sobre todo, rigideces elásticas del orden de **240 kN por milímetro**. El segundo número es el que define si el conjunto trabaja como una sección o como dos.

De ahí que el conector no se elija por catálogo mirando solo la capacidad. Se elige mirando la curva.

## Los tres papeles que puede cumplir un conector

No todos los conectores de una estructura híbrida hacen lo mismo, y confundirlos es una fuente habitual de problemas. La clasificación que se usa en la literatura técnica los ordena en tres funciones:

| Función | Qué hace |
|---|---|
| Crear sección compuesta | Vincula la viga metálica con el panel para que trabajen como una única sección resistente |
| Vincular sin composición | Une el panel a la estructura para colaboración fuera del plano, sin buscar sección compuesta |
| Transferir corte | Traslada esfuerzos entre elementos por acciones en el plano y fuera de él |

El error frecuente es especificar un conector pensado para la segunda función y calcular la estructura como si cumpliera la primera. El modelo da rígido, la obra sale flexible, y la diferencia aparece en las deflexiones de servicio.

## La madera se mueve y el acero no

Es el punto que más problemas genera a mediano plazo y el que menos figura en el cálculo.

La madera intercambia humedad con el ambiente y cambia de dimensión al hacerlo, sobre todo en dirección perpendicular a la fibra. El acero, a efectos prácticos, no. Una unión rígidamente empernada en varios puntos alineados perpendiculares a la fibra impide ese movimiento, y lo que no puede moverse termina fisurando.

La respuesta de proyecto es conocida: **una unión acero-madera se diseña para restringir en una dirección y liberar en la otra**. Agujeros ovalados, un único punto fijo por unión, y el resto acompañando. Es exactamente el criterio opuesto al que uno aplica de manera automática cuando une dos perfiles metálicos, donde el objetivo suele ser inmovilizar todo.

Hay además un efecto de largo plazo: la madera fluye bajo carga sostenida más que el acero. Un conjunto que arranca compartiendo carga en cierta proporción no la comparte igual diez años después.

## El fuego cambia de lado

En una estructura de acero a la vista, el fuego es el problema dominante: el acero pierde capacidad rápido y hay que protegerlo. En madera masiva, en cambio, el comportamiento es razonablemente predecible: la sección se carboniza a una velocidad conocida y la madera que queda por dentro sigue trabajando. Por eso se dimensiona con sobreespesor de sacrificio.

El resultado es que en un híbrido **la unión pasa a ser el punto débil frente al fuego**, porque es donde está el acero y donde la madera es más delgada. De ahí la preferencia por herrajes ocultos, embebidos dentro de la pieza de madera, en lugar de chapas vistas. La madera protege al acero, que es una inversión de papeles poco intuitiva.

## Lo que deja la experiencia

La estructura híbrida no se traba en el cálculo de los elementos. Cada material tiene su reglamento y los dos funcionan. Se traba en la unión, que es donde se cruzan dos culturas de diseño distintas: una que inmoviliza y otra que tiene que dejar moverse, una donde el fuego ataca el elemento principal y otra donde ataca el nudo.

Mientras no exista prescripción específica para esa interfaz, lo que sostiene el proyecto es dejar el criterio escrito: qué se supuso sobre la rigidez del conector, qué movimiento se dejó libre y en qué dirección, y qué se previó para el fuego en el nudo. No porque lo pida una norma, sino porque dentro de diez años esa memoria es lo único que va a explicar por qué la estructura se comporta como se comporta.

---

*Este apunte forma parte de la serie sobre sistemas que se apoyan en la estructura metálica principal. Se complementa con [madera masiva sobre estructura metálica](/blog/madera-masiva-sobre-estructura-metalica-el-sistema-estructural-hibrido-que-esta-apareciendo-en-edificios-de-altura-media/).*

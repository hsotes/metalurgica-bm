---
title: "Izaje de un shelter: puntos de izaje, ángulo de eslinga y la base que lo resiste"
description: "Colgado de una grúa, un shelter trabaja como nunca lo hará en servicio. El ángulo de eslinga, el centro de gravedad y la base definen si llega entero."
date: "2026-11-17"
author: "Ing. Hernán Soto Escalante"
image: "/blog/izaje-de-un-shelter-puntos-de-izaje-y-angulo-de-eslinga/portada.jpg"
category: "TBex"
tags: ["shelters", "izaje", "eslingas", "centro de gravedad", "cáncamos", "infraestructura crítica"]
---

Un shelter pasa casi toda su vida apoyado: sobre una fundación, una platea o unos dados de hormigón. Pero antes de eso cuelga de una grúa al menos dos veces, cuando se carga en planta y cuando se baja en el sitio. Son unos minutos, y en esos minutos la estructura trabaja de una forma en la que no va a volver a trabajar nunca.

Apoyado, el shelter descarga su peso de manera repartida. Colgado, todo su peso, con los equipos ya instalados, pasa por cuatro puntos. La pregunta no es solo si los cáncamos resisten, sino qué le pasa a todo lo que está entre ellos.

## El ángulo de la eslinga

La fuerza en una eslinga inclinada es mayor que la parte del peso que sostiene. El factor es la inversa del seno del ángulo que forma la eslinga con la horizontal:

| Ángulo con la horizontal | Fuerza en cada ramal, respecto de una eslinga vertical |
|---|---|
| 90° | 1,00 |
| 60° | 1,155 |
| 45° | 1,414 |
| 30° | 2,00 |

A 30°, cada ramal de un par de eslingas soporta una fuerza igual al peso completo de la carga. Por eso la práctica de izaje fija los 30° como mínimo absoluto, y la norma de DNV para contenedores offshore, la 2.7-1, es más estricta: no admite ramales a más de 45° de la vertical.

Hay un efecto que se nota menos. La componente horizontal de cada eslinga empuja los puntos de izaje hacia adentro. Por estática, a 60° esa fuerza es del orden del 58 % de la carga vertical de cada ramal; a 45°, igual a esa carga; a 30°, un 73 % mayor. En un shelter colgado de sus esquinas superiores, esa fuerza comprime el marco del techo, una estructura que se dimensionó para otra cosa.

## Cuatro ramales, dos que trabajan

Un juego de cuatro eslingas sobre una carga rígida no reparte el peso en cuatro partes iguales. Basta con que un ramal sea unos milímetros más corto, o que la carga esté apenas desnivelada, para que dos ramales opuestos tomen casi todo y los otros dos queden flojos.

La asociación británica de equipos de izaje, LEEA, lo advierte: sobre cargas rígidas, dos o tres ramales pueden tomar la mayor parte del peso. Las guías de práctica lo traducen en una regla de diseño: considerar que la carga la toman dos ramales, salvo que se demuestre que se reparte de manera pareja. La DNV 2.7-1 lo resuelve de otra forma: reparte la carga de diseño de los cáncamos entre la cantidad de cáncamos menos uno.

Para el shelter, eso significa que cada punto de izaje y la estructura que lo rodea tienen que poder tomar mucho más que un cuarto del peso.

## El balancín

La forma de sacarle al shelter la compresión del techo es poner un balancín: una viga separadora que cuelga del gancho y desde la que bajan eslingas verticales a los puntos de izaje. El balancín toma la compresión que antes tomaba el shelter, y las eslingas llegan verticales.

La norma ISO de manipulación de contenedores sigue la misma lógica: un contenedor cargado que se iza desde las esquinas superiores se iza con eslingas verticales, es decir, con un separador. Los fabricantes de equipos compactos de climatización, que también se izan con todo instalado, exigen en sus manuales un balancín o un bastidor en H.

| Elemento | Cómo trabaja | Cuándo conviene |
|---|---|---|
| Balancín o viga separadora | Compresión; las eslingas superiores toman el ángulo | Cuando hay altura libre sobre la carga |
| Viga de izaje | Flexión; cuelga del gancho por un solo punto | Cuando falta altura; es más pesada para la misma capacidad |

## El centro de gravedad no está en el centro

En un shelter vacío el centro de gravedad está cerca del centro geométrico. En un shelter equipado, casi nunca. El banco de baterías, los equipos de aire de pared y los racks están concentrados de un lado, y el centro de gravedad se corre con ellos.

La regla de izaje es simple: el gancho tiene que quedar sobre el centro de gravedad. Si no está, la carga se inclina al despegar hasta que el centro de gravedad queda bajo el gancho, y los ramales dejan de cargar parejo. La DNV 2.7-1 pide, para contenedores con equipos pesados instalados en forma permanente, que el cálculo use la distribución real de esas cargas y no una carga repartida.

En la práctica, eso obliga a dos cosas: que el centro de gravedad del shelter equipado se calcule y se marque en el exterior, y que los ramales o el balancín se ajusten a esa posición antes del izaje.

## El cáncamo y lo que hay detrás

El cáncamo es la pieza que todos miran. La norma estadounidense de dispositivos de izaje, la ASME BTH-1, pide en su categoría de diseño B, la que corresponde cuando las cargas y las condiciones de uso no se conocen con precisión, un factor de diseño de 3 frente a la fluencia. La DNV 2.7-1 diseña los cáncamos de contenedores offshore para tres veces el peso bruto, y pide además que queden alineados con la dirección de la eslinga, con un desvío máximo de 2,5°. Un cáncamo cargado de costado trabaja en una dirección para la que no fue pensado.

Pero el cáncamo rara vez es lo que falla. Lo que falla es aquello a lo que está soldado. Un cáncamo dimensionado con holgura, soldado a una chapa delgada o a un perfil que no está vinculado a la estructura principal, arranca la chapa. El camino de la carga tiene que estar completo: del cáncamo al bastidor, del bastidor a las columnas del shelter y de las columnas a la base.

## La base que lo resiste

Colgado de sus cuatro puntos, el shelter equipado se comporta como una viga cargada con su propio peso y el de todo lo que lleva adentro. La base tiene que resistir eso, pero sobre todo tiene que no deformarse demasiado.

La DNV 2.7-1 lo dice con una frase que vale para cualquier shelter: un contenedor puede ser excesivamente flexible sin tener tensiones calculadas altas. Por eso pide verificar las flechas además de las tensiones, y en el ensayo de prototipo, con 2,5 veces el peso bruto durante cinco minutos, admite una flecha máxima de 1/300 de la luz y ninguna deformación permanente. Ese factor de 2,5 incluye la dinámica de un izaje en el mar; no es un valor para trasladar sin más a un izaje en tierra, pero el criterio de flecha muestra qué se protege.

Lo que se protege es lo que no tolera deformación: la puerta, que tiene que seguir cerrando; las juntas de los paneles, que tienen que seguir estancas; el piso técnico, que tiene que seguir nivelado. Un shelter que vuelve a su forma después del izaje pero que quedó con una puerta que roza no está entero.

## Lo que deja la experiencia

El izaje es una carga de pocos minutos, y por eso se subestima. Pero es la única vez en la vida del shelter en que todo su peso, con los equipos ya instalados, pasa por cuatro puntos, y en que cualquier asimetría se convierte en una inclinación.

Los puntos de izaje, su vínculo con la estructura, la posición del centro de gravedad y la rigidez de la base se definen en el proyecto, junto con la distribución de los equipos. En el sitio, con la grúa armada, lo único que queda por decidir es el largo de las eslingas.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con [gálibo de transporte: cuándo un shelter deja de ser carga común](/blog/galibo-de-transporte-cuando-un-shelter-deja-de-ser-carga-comun/) y con [anclaje de un shelter: reacciones de diseño y frontera con la fundación](/blog/anclaje-shelter-reacciones-frontera-fundacion/).*

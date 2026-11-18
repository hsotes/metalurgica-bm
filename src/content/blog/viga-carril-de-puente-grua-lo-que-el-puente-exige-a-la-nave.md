---
title: "Viga carril de puente grúa: lo que el puente le exige a la nave"
description: "Una nave con puente grúa es otra estructura: cargas que se mueven, flechas estrictas y fatiga. La viga carril concentra casi todos los problemas."
date: "2026-11-18"
author: "Ing. Hernán Soto Escalante"
image: "/blog/viga-carril-de-puente-grua-lo-que-el-puente-exige-a-la-nave/portada.jpg"
category: "Estructuras"
tags: ["puente grúa", "viga carril", "naves industriales", "fatiga", "deformaciones", "estructura metálica"]
---

Una nave industrial sin puente grúa recibe cargas que, en su mayoría, se quedan quietas: el peso propio, la cubierta, el viento que viene y se va. Cuando se agrega un puente grúa, aparece una carga distinta. Se mueve a lo largo de la nave, frena, acelera, levanta y suelta. Y pasa por los mismos puntos miles de veces.

La pieza que recibe todo eso es la viga carril, y es la que más problemas da. James Fisher, autor de la guía de la AISC sobre edificios industriales, estima que el 90 % de los problemas de vigas carril están asociados a fisuras por fatiga.

## Tres cargas en tres direcciones

El puente le transmite a la viga carril cargas en las tres direcciones. Los criterios estadounidenses, que recoge la AISC, las resumen así:

| Dirección | Origen | Criterio habitual |
|---|---|---|
| Vertical | Peso del puente, del carro y de la carga | Incremento por impacto de 25 % para puentes con cabina o radiocontrol, y de 10 % para los comandados con botonera colgante |
| Lateral | Aceleración y frenado del carro | 20 % de la suma del peso del carro y de la carga levantada, aplicado en la cabeza del riel |
| Longitudinal | Aceleración y frenado del puente | 10 % de las reacciones máximas de las ruedas |

El Eurocódigo trata lo mismo con factores dinámicos que dependen de la clase de elevación y de la velocidad de izaje, y agrega una fuerza que suele gobernar la flecha lateral: la que aparece cuando el puente avanza ligeramente en diagonal y las ruedas empujan el riel hacia afuera.

La carga longitudinal, además, sigue el mismo camino que el viento sobre el hastial: de la viga carril al sistema de arriostramiento de pared y de ahí a las fundaciones.

## Flechas que cuida el puente, no la viga

Una viga carril podría resistir con flechas mucho mayores que las admitidas. Los límites no protegen a la viga: protegen al puente, que necesita rieles a la distancia y a la altura correctas para rodar sin trabarse.

| Criterio | Vertical | Lateral |
|---|---|---|
| CMAA 74, criterio general | L/600 | L/400 |
| Guías de la AISC, puentes de clases A a C | L/600 | L/400 |
| Guías de la AISC, clase D | L/800 | L/400 |
| Guías de la AISC, clases E y F | L/1000 | L/400 |
| EN 1993-6 | L/600 y no más de 25 mm | L/600 |

Todas estas flechas se calculan sin el incremento por impacto. La norma europea agrega otros límites que muestran qué se está cuidando: bajo las cargas del puente, la diferencia de altura entre los dos rieles no puede superar la luz del puente dividida por 600, y la distancia entre rieles no puede variar más de 10 mm. Un informe del instituto sueco de construcción en acero califica esos límites de relativamente estrictos, y señala que Alemania admite L/500.

Una observación necesaria: las normas europeas de acciones de grúas y de vigas carril tienen ediciones nuevas de 2026, y algunos valores y numeraciones pueden cambiar respecto de las de 2006 y 2007, que son las citadas acá.

## La fatiga, el problema real

Una viga carril es una estructura sometida a fatiga, y en eso se diferencia del resto de la nave. Fisher propone una referencia de ciclos para 40 años de servicio según la clase del puente:

| Clase CMAA | Ciclos en 40 años |
|---|---|
| A, mantenimiento o uso ocasional | 20.000 |
| B, servicio liviano | 50.000 |
| C, servicio moderado | 100.000 |
| D, servicio pesado | 500.000 |
| E, servicio severo | 1.500.000 |
| F, servicio continuo severo | Más de 2.000.000 |

Fisher agrega un dato que cambia la forma de inspeccionar: la iniciación de la fisura consume del orden del 80 % de la vida a fatiga. Cuando una fisura llega a ser visible, la vida de ese detalle está prácticamente agotada.

Los detalles donde aparecen las fisuras se repiten:

| Detalle | Por qué fisura |
|---|---|
| Soldadura entre ala superior y alma | Cada rueda que pasa flexiona localmente el ala; un puente de cuatro ruedas genera cuatro ciclos o más por pasada |
| Rigidizadores de apoyo | Fisuras en la soldadura de filete bajo el ala superior; se recomienda penetración completa |
| Rigidizadores intermedios | Su terminación cerca del ala traccionada es un punto de inicio de fisura |
| Fijaciones del riel | Las grapas soldadas también se verifican a fatiga |
| Ala inferior | No se suelda nada sobre el ala traccionada |

El Eurocódigo exime de la verificación a fatiga a los puentes que hacen pocos ciclos con cargas altas: hasta 10.000 ciclos por encima del 50 % de la carga útil. El Steel Construction Institute británico advierte sobre dos malas lecturas de esa exención: la carga útil es la carga máxima que efectivamente se levanta, no la capacidad nominal del puente; y sobredimensionar la viga no evita la verificación.

## Ménsula, columna escalonada o columna propia

La forma de apoyar la viga carril depende de la capacidad del puente. Una guía de diseño de edificios metálicos de McGraw-Hill da una referencia práctica: la ménsula sobre la columna del pórtico conviene hasta unas 20 toneladas. Por encima, la excentricidad vuelve antieconómica la columna y transmite vibraciones al edificio, y conviene una columna escalonada o una columna independiente para el puente. Otras guías corren ese límite a unas 25 toneladas: es un criterio de práctica, no de norma.

La misma guía recomienda vigas carril simplemente apoyadas. Las continuas son sensibles a los asentamientos diferenciales de las columnas y a los efectos térmicos.

## La unión que tiene que dejar moverse

El detalle de unión de la viga carril con la columna es un ejemplo de algo que la estructura tiene que permitir, no impedir. La viga gira en sus apoyos cada vez que pasa el puente. Fisher da un ejemplo: una viga de 12 metros con una flecha de L/600 gira unos 0,005 radianes en el apoyo, lo que desplaza el ala superior unos 5 mm en una viga de 90 cm de altura.

La vinculación lateral del ala superior a la columna tiene que ser resistente en sentido transversal y flexible para ese giro. Si se resuelve con una chapa rígida soldada al alma, flexiona el alma fuera de su plano en cada pasada. Y si la placa de apoyo se abulona entre las alas de la columna, el giro genera un par de fuerzas que, según Fisher, ha llegado a cortar bulones.

## La tolerancia del riel

Todo lo anterior se pierde si el riel no está donde tiene que estar. Las tablas de la CMAA, reproducidas por los fabricantes de puentes grúa, fijan para la luz entre rieles una tolerancia de unos ±5 mm en puentes de hasta 15 metros, ±6 mm entre 15 y 30 metros y ±10 mm por encima, con exigencias similares para la diferencia de nivel entre rieles. Son tolerancias de montaje fino sobre una estructura de varias toneladas, y por eso el riel se nivela y se alinea sobre la viga ya montada, con fijaciones regulables.

## Lo que deja la experiencia

En una nave con puente grúa, el pórtico deja de ser el protagonista. El cálculo de la viga carril, sus flechas, sus detalles de soldadura y sus uniones definen si el puente va a rodar bien durante décadas o si va a empezar a trabarse y a fisurar a los pocos años.

Por eso el dato que más importa al empezar no es la capacidad del puente, sino su clase de servicio: cuántas veces por día va a levantar cerca de su carga máxima. Un puente de 10 toneladas que trabaja todo el día en una línea de producción exige más a la estructura que uno de 20 que se usa para mantenimiento. Esa pregunta, hecha al principio, es la que ordena todo lo demás.

---

*Este apunte forma parte de la serie sobre naves y sistemas compatibles con la estructura metálica. Se complementa con [arriostramientos: el sistema que hace estable a una nave](/blog/arriostramientos-el-sistema-que-hace-estable-a-una-nave/) y con [naves industriales: anatomía de una estructura que parece simple](/blog/naves-industriales-anatomia-de-una-estructura-que-parece-simple/).*

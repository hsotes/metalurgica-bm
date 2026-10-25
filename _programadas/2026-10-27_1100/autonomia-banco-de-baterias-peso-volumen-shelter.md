---
title: "Autonomía del banco de baterías: cómo se traduce en peso, volumen y espacio interior"
description: "Cuatro horas de autonomía en un shelter son del orden de media tonelada de baterías. Cómo se pasa de horas a kilos, metros cuadrados y estructura de piso."
date: "2026-10-27"
author: "Ing. Hernán Soto Escalante"
image: "/blog/autonomia-banco-de-baterias-peso-volumen-shelter/portada.jpg"
category: "TBex"
tags: ["baterías", "autonomía", "shelters", "IEEE 485", "carga de piso", "infraestructura crítica"]
---

La autonomía es uno de los datos más cortos de una especificación de shelter: cuatro horas, ocho, veinticuatro. Se escribe en una línea y parece un requisito eléctrico.

Pero esa línea termina siendo kilos sobre el piso, metros cuadrados dentro del recinto y una consigna de temperatura para la climatización. Cada hora de autonomía que se suma cambia el shelter, y conviene ver la cadena completa para entender cuánto.

## De horas a energía, y de energía a capacidad comprada

La primera cuenta es directa: la potencia de la carga por las horas de autonomía da la energía que el banco tiene que entregar. Un equipamiento de 2 kW en 48 V durante cuatro horas pide 8 kWh.

Pero la batería que se compra no es la que entrega esos 8 kWh. La norma IEEE 485, que es la referencia para dimensionar baterías estacionarias de plomo-ácido, aplica tres correcciones:

| Corrección | Valor de referencia | Por qué |
|---|---|---|
| Envejecimiento | 1,25 | Se considera que la batería llega al fin de su vida cuando le queda el 80 % de la capacidad; se compra un 25 % de más para llegar a ese día cumpliendo |
| Margen de diseño | 1,10 a 1,15 | Para cubrir crecimiento de la carga e incertidumbres |
| Temperatura | 1,00 a 25 °C; 1,19 a 10 °C; 1,30 a 4,4 °C | El frío reduce la capacidad disponible |

Los valores de temperatura de la tabla corresponden a baterías de plomo-ácido ventiladas. Las selladas tienen una respuesta distinta, y para ellas manda la tabla del fabricante.

## La capacidad depende de la velocidad de descarga

Hay un segundo efecto, menos intuitivo: una batería entrega menos energía cuanto más rápido se la descarga. Los datos de un monobloque de 12 V y 180 Ah nominales, de uso corriente en telecomunicaciones, lo muestran con claridad:

| Tiempo de descarga | Capacidad que entrega | Respecto de la nominal a 10 horas |
|---|---|---|
| 1 hora | 119 Ah | 66 % |
| 4 horas | 160 Ah | 89 % |
| 10 horas | 180 Ah | 100 % |
| 20 horas | 190 Ah | 106 % |

Por eso una autonomía corta no se resuelve con una batería proporcionalmente chica. Para una hora de respaldo, un tercio de la capacidad nominal queda sin usar.

## El ejemplo completo

Con esas correcciones y los datos de descarga a potencia constante de ese mismo monobloque, el caso de 2 kW en 48 V resulta así. Es un cálculo propio, con un recinto a 20 °C o más:

| Autonomía | Baterías de 12 V necesarias | Peso aproximado de las baterías |
|---|---|---|
| 2 horas | 4 | Del orden de 230 kg |
| 4 horas | 8 | Del orden de 460 kg |
| 8 horas | 12 | Del orden de 700 kg |
| 20 horas | 28 | Del orden de 1.600 kg |

Para las cuatro horas, el banco instalado tiene unos 17 kWh nominales para entregar 8 kWh: más de dos kilowatts-hora comprados por cada uno que se usa. Y el peso no incluye el rack.

## El piso

Media tonelada de baterías en un rack de dos niveles, sobre una huella del orden de 0,7 por 0,6 metros, carga el piso con del orden de **11 kN/m²**, sin contar el rack. Es cuatro veces la carga con la que se calcula el piso de una oficina.

Las guías de diseño de salas técnicas ubican las salas de baterías entre 12 y 24 kN/m². En un shelter, eso tiene consecuencias estructurales concretas: el piso necesita perfiles bajo las patas del rack o placas que distribuyan la carga, y el rack tiene que anclarse a la estructura. Los fabricantes de racks sísmicos exigen anclar en todos los agujeros del bastidor, y dejan el diseño de ese anclaje a cargo de quien instala.

Y hay una decisión que conviene tomar temprano: si el shelter viaja con las baterías instaladas o sin ellas. Una tonelada más cambia el centro de gravedad, el izaje y el transporte.

## El espacio

El banco no ocupa solo su huella. Necesita un pasillo de trabajo frente al rack, que la normativa eléctrica estadounidense fija en 914 mm para tensiones de hasta 150 V. Con ese pasillo, la superficie que demanda un banco de plomo-ácido se multiplica por dos o tres respecto de lo que ocupan las baterías solas.

En un shelter de pocos metros cuadrados, esa superficie compite directamente con los racks de equipos. Y la decisión de separar las baterías en un compartimento propio, que suele tomarse por la ventilación del hidrógeno, agrega muros y puertas.

## La temperatura

Las baterías de plomo-ácido tienen su referencia en 25 °C, y los fabricantes recomiendan un ambiente de 23 a 26 °C. Por encima, la vida útil cae a la mitad aproximadamente por cada 8 °C de exceso: una batería de cuatro años a 25 °C dura del orden de dos a 33 °C. Por debajo, la vida no se acorta, pero la capacidad disponible baja, y hay que comprar más.

Por eso, como ya se vio al tratar la climatización, en muchos shelters son las baterías y no los equipos electrónicos las que fijan la consigna de temperatura del recinto.

## El litio como alternativa

Las baterías de litio-ferrofosfato, en módulos de 19 pulgadas de 48 V, cambian la cuenta de peso y volumen. Para el mismo caso de cuatro horas, tres módulos de 4,8 kWh pesan del orden de 125 a 155 kg y ocupan unos 0,07 m³, contra unos 460 kg y 0,18 m³ de las baterías de plomo. Las presentaciones técnicas del sector hablan de un 60 % menos de peso y un 70 % menos de volumen, y de varios miles de ciclos de vida.

A cambio, exigen un sistema de gestión electrónico, cuestan más al instalarse, y tienen su propia normativa de seguridad. La norma estadounidense de almacenamiento de energía fija umbrales distintos según la química: 70 kWh para plomo-ácido y 20 kWh para litio. Por encima de esos valores aparecen requisitos adicionales de instalación. El caso de cuatro horas queda por debajo; el de ocho horas en litio ya lo supera.

## Lo que deja la experiencia

La autonomía se escribe en horas y se paga en kilos, en metros cuadrados y en estructura. Por eso es un dato que conviene conocer antes de dimensionar el piso, la planta y la climatización del shelter, y no después.

Cuando la autonomía todavía no está definida al momento de cotizar, la salida razonable es la de siempre: adoptar una hipótesis explícita, declararla, y dejar establecido cuánto cambia el recinto si la autonomía final resulta distinta. Pasar de cuatro a ocho horas no es un cambio de baterías: es otro piso.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con la [ventilación del recinto de baterías](/blog/ventilacion-recinto-baterias-hidrogeno-renovaciones/) y con la [redundancia N+1 en la climatización](/blog/redundancia-n-mas-1-climatizacion-shelter/).*

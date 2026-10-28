---
title: "Correas de cubierta: el elemento que gobierna el costo del techo"
description: "En una nave, las correas parecen el elemento menor y pesan una parte importante del acero. La separación entre pórticos, la continuidad y el viento deciden."
date: "2026-10-28"
author: "Ing. Hernán Soto Escalante"
image: "/blog/correas-de-cubierta-costo-del-techo/portada.jpg"
category: "Estructuras"
tags: ["correas", "naves industriales", "galpones", "cubiertas metálicas", "perfiles conformados en frío", "estructura metálica"]
---

Cuando se mira una nave industrial en construcción, lo que llama la atención son los pórticos: las columnas y las vigas de alma llena que dibujan la silueta del galpón. Las correas, esas piezas livianas que corren de pórtico a pórtico para sostener la chapa, parecen un detalle.

No lo son. Se repiten cada metro y medio o dos metros a lo largo de todo el techo, y lo que cada una pesa de más o de menos se multiplica por toda la superficie de la cubierta. En la economía de una nave, las correas son de los elementos donde una decisión de proyecto se nota más en el peso final.

## Cuánto pesan

Las estimaciones del sector ubican a las correas y los largueros de pared, en una nave de una planta con perfiles conformados en frío, en el orden del **15 al 25 % del peso total de acero**. En naves livianas, como los galpones agrícolas, la proporción puede ser mayor, porque los pórticos son más esbeltos.

Esa cifra tiene una consecuencia directa: optimizar las correas puede mover el costo de la estructura tanto como optimizar los pórticos, que son los que se calculan con más atención.

## La geometría de partida

La guía británica de construcción en acero describe la nave típica con pórticos separados entre 6 y 8 metros, una luz eficiente de pórtico de 25 a 35 metros, y correas a no más de 1,8 metros entre ejes, más juntas cerca del alero.

La separación entre correas la fija, en buena medida, la chapa: cuanto más separadas, más tiene que resistir la chapa entre apoyos, y más gruesa y cara resulta. La separación entre pórticos, en cambio, la fija el proyecto, y es la variable que más mueve el peso de las correas.

## Más luz, más peso: la tabla

Un fabricante británico de correas conformadas en frío publica tablas de carga que permiten ver ese efecto con números. Para correas Z continuas, separadas 1,8 m y con una carga admisible de al menos 1,0 kN/m²:

| Separación entre pórticos | Correa necesaria | Peso de la correa | Peso de correas por m² de techo |
|---|---|---|---|
| 6,0 m | Z de 172 mm, 1,6 mm de espesor | 3,97 kg/m | 2,2 kg/m² |
| 7,5 m | Z de 232 mm, 1,6 mm de espesor | 4,73 kg/m | 2,6 kg/m² |
| 9,0 m | Z de 302 mm, 1,8 mm de espesor | 7,10 kg/m | 3,9 kg/m² |

La última columna es cálculo propio a partir de la tabla, sin contar los empalmes. Y muestra una curva que no es lineal: de 6 a 7,5 metros el peso de correas sube un 18 %; de 7,5 a 9 metros, un 50 %.

Ahí está el equilibrio de toda nave. Alejar los pórticos ahorra pórticos, fundaciones y montaje; acercarlos ahorra peso de correas. Un estudio brasileño sobre correas Z lo resume así: la distancia entre pórticos es una de las variables que más influye en el peso de las correas, y por encima de los 7 metros hacen falta perfiles muy grandes. Y un trabajo británico sobre optimización de naves agrega el matiz que cierra la cuenta: el pórtico más liviano no es necesariamente el edificio más económico.

## La continuidad

Una correa puede trabajar como viga simple, apoyada de pórtico a pórtico, o como viga continua, empalmada sobre los apoyos. La diferencia es grande:

| Condición | Momento máximo | Flecha |
|---|---|---|
| Tramo simple | wL²/8 | Referencia |
| Continua en varios tramos | Del orden de wL²/10 a wL²/12 | Del orden de 2,4 veces menor en dos tramos |

Para lograr esa continuidad, los perfiles Z tienen una ventaja geométrica: se pueden encastrar uno dentro del otro, solapándose sobre el apoyo. Los fabricantes indican solapes del orden del 10 al 15 % de la luz. Otra alternativa es el manguito, una pieza que une dos correas sobre el pórtico.

Hay un matiz que la investigación reciente aporta: los ensayos de correas con manguito y con solape muestran una resistencia algo menor que la de una viga verdaderamente continua, aunque en la práctica se las calcule como tales. Y en la zona del empalme gobierna casi siempre la combinación de flexión y corte, con una falla de tipo frágil. Es el punto de la correa que pide el detalle más cuidado.

## El viento que levanta el techo

Con cargas gravitatorias, la correa está en buena situación: el ala superior, comprimida, queda sostenida por la chapa atornillada encima, que le impide pandear de costado.

Con viento, la situación se invierte. La succión levanta el techo, y el ala comprimida pasa a ser la inferior, que no tiene ninguna chapa que la sostenga. La correa queda expuesta al pandeo lateral-torsional, y su capacidad depende de cuántos arriostramientos tenga.

Por eso aparecen los **tensores anti-pandeo**, barras que unen las correas entre sí a mitad de luz o en los tercios, y por eso las tablas de los fabricantes dan capacidades distintas para la misma correa según tenga cero, uno o dos tensores. En zonas de viento fuerte, la succión gobierna el diseño de la correa más que la nieve o la sobrecarga.

## Lo que pasa sobre el apoyo

Todo lo anterior describe el centro del tramo. Sobre los apoyos de una correa continua, el momento cambia de signo, y con él se invierte qué ala trabaja comprimida:

| Zona de la correa | Con cargas gravitatorias | Con succión de viento |
|---|---|---|
| Centro del tramo | Ala superior comprimida, sostenida por la chapa | Ala inferior comprimida, sin restricción |
| Sobre el apoyo, en correa continua | Ala inferior comprimida | Ala superior comprimida, sostenida por la chapa |

En el apoyo de una correa continua, además, coinciden el momento negativo máximo y el corte máximo. Por eso esa zona —la del solape o el manguito— se verifica a flexión y corte combinados, y es donde la investigación ubica la falla frágil mencionada antes.

En una correa discontinua, apoyada como tramo simple y abulonada a la porta correa, el momento máximo queda en el centro y el corte máximo en el apoyo, separados. En luces habituales suele gobernar la flexión del tramo. Pero la conexión tiene sus propias verificaciones: el corte del alma, el aplastamiento sobre la porta correa y los bulones. Con luces cortas o cargas altas, es el apoyo el que puede terminar definiendo el perfil.

Y las correas, a su vez, arriostran a los pórticos. Desde ellas salen las tornapuntas que sostienen el ala inferior de las vigas de los pórticos, que la guía británica pide dimensionar para el 2,5 % de la fuerza en el ala comprimida.

## Flechas y encharcamiento

Los límites de flecha habituales son del orden de luz sobre 180 para las correas y luz sobre 200 para la chapa de techo.

En techos de poca pendiente, la flecha tiene una consecuencia que no es de confort: el **encharcamiento**. Cuando una correa continua baja en un vano, el vecino sube, y el agua migra hacia la zona hundida, que se hunde más. La normativa estadounidense considera suficiente una pendiente de alrededor del 2 % para evitar esa inestabilidad. Los casos documentados de colapso por esta causa empiezan casi siempre igual: un desagüe tapado por hojas.

## Cuando las correas fallan

La literatura técnica registra los modos de falla con bastante precisión. En el Reino Unido, en 1986, un informe sobre el colapso de un techo industrial por acumulación de nieve encontró el mismo modo de falla en varias estructuras similares, y lo atribuyó a consecuencias no buscadas del avance en el conocimiento de las correas conformadas en frío y de sus tablas de carga. Otros casos muestran la nieve como disparador y la corrosión de correas por filtraciones de años como causa de fondo. Y en los ciclones del norte de Australia, las correas pandeadas por succión aparecen junto a la chapa arrancada, muchas veces después de que una puerta cedió y presurizó el interior.

La correa, liviana y optimizada, es el elemento con menos reserva de toda la estructura. Es justamente su eficiencia la que la vuelve sensible a lo que no se previó.

## Lo que deja la experiencia

La correa se elige en una tabla, pero su peso se decide antes: cuando se fija la separación entre pórticos, cuando se define si va continua o simple, y cuando se resuelve cuántos tensores va a llevar contra la succión.

Esas tres decisiones pertenecen al proyecto de la nave, no a la correa. Tomadas juntas, con la chapa y los pórticos en la misma cuenta, son de las que más mueven el costo de un galpón sin que nadie lo note desde afuera.

---

*Este apunte forma parte de la serie sobre naves, galpones y sistemas sobre estructura metálica. Se complementa con [naves industriales: anatomía de una estructura que parece simple](/blog/naves-industriales-anatomia-de-una-estructura-que-parece-simple/) y con [luces libres en grandes estructuras](/blog/luces-libres-por-que-el-acero-resuelve-lo-que-el-hormigon-no-puede-en-grandes-estructuras/).*

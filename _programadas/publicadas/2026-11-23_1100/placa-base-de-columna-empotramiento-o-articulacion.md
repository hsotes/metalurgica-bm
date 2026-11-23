---
title: "Placa base de columna: donde el pórtico decide si está empotrado o articulado"
description: "En el modelo es un apoyo; en la obra, una placa, unos pernos y un mortero. Lo que se supone ahí define el momento que recibe la fundación y la deriva."
date: "2026-11-23"
author: "Ing. Hernán Soto Escalante"
image: "/blog/placa-base-de-columna-empotramiento-o-articulacion/portada.jpg"
category: "Estructuras"
tags: ["placa base", "pernos de anclaje", "naves industriales", "pórticos", "fundaciones", "estructura metálica"]
---

En el modelo de cálculo de una nave, la base de cada columna es un símbolo: un triángulo si se la supone articulada, un empotramiento si se la supone fija. En la obra es una placa de acero, cuatro pernos hormigonados en la fundación y una capa de mortero entre las dos.

Lo que se decide en ese símbolo no queda en la estructura metálica. Define el momento que la fundación tiene que tomar, la deriva del pórtico ante el viento y el detalle que el montador va a encontrar cuando llegue con la columna.

## Articulada, rígida o algo intermedio

Ninguna base real es una articulación perfecta ni un empotramiento perfecto. El Eurocódigo 3, en la parte 1-8, la clasifica por su rigidez rotacional comparada con la de la columna. Para pórticos no arriostrados, una base se considera rígida cuando su rigidez inicial es al menos 30 veces EI/L de la columna. Para pórticos en los que el arriostramiento reduce el desplazamiento lateral en al menos un 80 %, el límite depende de la esbeltez de la columna, y la nota técnica SN045a del programa europeo de acero lo resume con una cota conservadora: 48 EI/L.

Una placa con cuatro pernos rara vez llega a eso. Por eso la práctica británica, recogida en esa misma nota y en las publicaciones del Steel Construction Institute, admite valores intermedios para las bases que se diseñan como articuladas:

| Tipo de base | Rigidez que se puede suponer | Condición |
|---|---|---|
| Nominalmente articulada | 10 % de la rigidez de la columna, para estabilidad y longitudes de pandeo | La fundación se diseña para momento nulo |
| Nominalmente articulada | 20 % de la rigidez de la columna, para deformaciones en servicio | Igual que la anterior |
| Semirrígida | Hasta 20 % de la rigidez de la columna en el análisis | La fundación se diseña para los momentos resultantes |
| Nominalmente rígida | Igual a la rigidez de la columna | La fundación se diseña para el momento |

La nota agrega un dato que muestra cuánto es convención: en algunos países, Suecia entre ellos, una placa delgada con cuatro pernos se considera articulada si tiene capacidad de deformación suficiente, aunque en realidad se comporta como semirrígida.

## Lo que cambia la suposición

La regla que atraviesa toda la tabla es simple: el empotramiento que se cuenta en la estructura lo tiene que pagar la fundación. Una base articulada le pasa a la zapata fuerzas verticales y horizontales; una base empotrada le pasa, además, un momento que en una nave de luz media puede definir el tamaño de la zapata.

Del lado de la estructura, la diferencia está en la deriva. En un ejemplo publicado por MasterSeries, un programa de cálculo británico, considerar un 20 % de fijación en las bases redujo el desplazamiento en el alero casi un 40 %, mientras la flecha en el centro de la luz cambió menos de un 5 %. Es un caso, no una regla, pero muestra dónde trabaja la base: en el desplazamiento lateral, que es lo que suele gobernar un pórtico liviano con viento, y lo que más le importa a un cerramiento o a un puente grúa.

Ninguna de las dos opciones es mejor en abstracto. Una base articulada simplifica la fundación y exige más acero en el pórtico; una empotrada aliviana el pórtico y carga la fundación. Lo que no funciona es decidir una cosa en el cálculo y construir otra: una base calculada como empotrada con una placa delgada y pernos cerca del eje de la columna gira más de lo previsto, y el pórtico se desplaza más de lo calculado.

## Cuatro pernos como mínimo

Aun en una base articulada, la columna tiene que quedarse parada sola durante el montaje, antes de que lleguen las vigas y los arriostramientos. La norma de seguridad en montaje de acero de la OSHA estadounidense, la 1926.755, lo fija con dos requisitos:

| Requisito | Valor |
|---|---|
| Pernos de anclaje por columna | Al menos 4 |
| Carga que debe resistir el conjunto | 300 libras, unos 136 kg, aplicados a 18 pulgadas, unos 45 cm, de la cara exterior de la columna |
| Modificación de pernos en obra | Solo con aprobación del ingeniero responsable |

La carga representa a un montador colgado de la columna. La Guía de Diseño 1 de la AISC, sobre placas base y pernos de anclaje, señala que esta regla prácticamente eliminó el detalle de dos pernos, salvo para postes livianos.

## Las tolerancias de los pernos ya hormigonados

Los pernos se hormigonan antes de que la estructura llegue a obra, y casi nunca quedan exactamente donde dice el plano. El Código de Práctica Estándar de la AISC, en la edición de 2005 citada por la Guía de Diseño 1, fija estas tolerancias:

| Medida | Tolerancia |
|---|---|
| Entre dos pernos de un mismo grupo | 3 mm |
| Entre grupos adyacentes | 6 mm |
| Centro del grupo respecto del eje de columna | 6 mm |
| Altura del extremo superior de los pernos | ±13 mm |
| Acumulada a lo largo de un eje de columnas | 6 mm cada 30 m, con un máximo de 25 mm |

La norma de tolerancias del hormigón, la ACI 117, es más generosa: admite de ±6 a ±13 mm según el diámetro del perno. La guía recomienda exigir los valores de la AISC en la especificación. Según publicaciones técnicas, la edición 2016 del código de la AISC adoptó los valores de la ACI 117, así que conviene ver qué edición cita cada proyecto.

La forma de absorber esa diferencia es el agujero sobredimensionado en la placa, cubierto por una arandela de chapa gruesa. La tabla de la guía, convertida a milímetros:

| Diámetro del perno | Agujero en la placa | Espesor mínimo de la arandela |
|---|---|---|
| 19 mm (3/4") | 33 mm | 6 mm |
| 25 mm (1") | 46 mm | 10 mm |
| 38 mm (1 1/2") | 59 mm | 13 mm |
| 51 mm (2") | 83 mm | 19 mm |

Un artículo del Engineering Journal de la AISC de 2024 revisó esos espesores y los encontró adecuados, salvo para pernos de acero de alta resistencia de algunos diámetros, que necesitan arandelas más gruesas.

## El corte no lo toman los pernos

El agujero sobredimensionado tiene una consecuencia que suele pasarse por alto. La Guía de Diseño 1 reconoce tres formas de transmitir el corte de la base a la fundación: fricción contra el mortero, apoyo contra el hormigón mediante una llave de corte soldada bajo la placa, y corte en los pernos.

Sobre la última, la guía es explícita: con agujeros sobredimensionados, la placa puede deslizar bastante antes de apoyarse en los pernos, y por las tolerancias no todos se apoyan a la vez. Recomienda contar solo dos pernos para el corte, salvo que las arandelas se suelden a la placa con un agujero apenas mayor que el perno. En una nave con viento lateral importante o con puente grúa, eso suele inclinar la decisión hacia la llave de corte.

## El mortero y la forma de nivelar

Entre la placa y el hormigón queda un espacio que se llena con mortero sin contracción. La guía recomienda que su resistencia sea al menos el doble de la del hormigón de la fundación, y un espesor de unos 25 mm sobre un piso terminado o de 38 a 50 mm sobre una zapata o un dado. Las placas grandes o con llave de corte pueden necesitar más.

La columna se nivela antes de llenar ese espacio, y el método elegido cambia cómo trabajan los pernos:

| Método | Cómo trabaja | Límite que señala la guía |
|---|---|---|
| Tuercas de nivelación bajo la placa | La columna apoya en las tuercas; después del mortero, parte de la carga sigue bajando por los pernos | Columnas con carga liviana; verificar los pernos a compresión |
| Placa de asiento | Una chapa nivelada previamente, sobre la que apoya la placa base | Hasta unos 60 cm, porque las chapas mayores se alabean |
| Calces de chapa | La compresión baja directo a la fundación sin pasar por los pernos | Es el método que no carga los pernos |

## Lo que deja la experiencia

La placa base es el lugar donde se juntan dos oficios: el que hace la fundación y el que monta la estructura. Casi todos los problemas que aparecen ahí no son de cálculo, sino de coordinación: pernos hormigonados fuera de tolerancia, un mortero que no tiene espacio, una base calculada empotrada que se construyó como articulada.

Por eso la decisión sobre la base conviene cerrarla antes de dibujar la fundación, junto con la plantilla de pernos que va a usar el que la hormigona. Una plantilla de chapa, perforada con los mismos agujeros de la placa, cuesta poco y evita la mayor parte de lo que después se resuelve con soplete en obra, que es justamente lo que la OSHA prohíbe hacer sin el ingeniero.

---

*Este apunte forma parte de la serie sobre naves y sistemas compatibles con la estructura metálica. Se complementa con [naves industriales: anatomía de una estructura que parece simple](/blog/naves-industriales-anatomia-de-una-estructura-que-parece-simple/) y con [viga carril de puente grúa: lo que el puente le exige a la nave](/blog/viga-carril-de-puente-grua-lo-que-el-puente-exige-a-la-nave/).*

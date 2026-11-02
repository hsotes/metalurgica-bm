---
title: "Espesor de pintura: cómo se mide y qué significa el valor que pide el pliego"
description: "Un pliego que pide 240 micrones no pide que cada punto mida 240. Qué es el espesor nominal, cómo se mide sobre acero granallado y cuándo se acepta."
date: "2026-11-02"
author: "Ing. Hernán Soto Escalante"
image: "/blog/espesor-de-pintura-como-se-mide-y-que-significa-el-valor-del-pliego/portada.jpg"
category: "Estructuras"
tags: ["espesor de película seca", "pintura industrial", "ISO 19840", "ISO 12944", "protección anticorrosiva", "inspección"]
---

Casi todos los pliegos de estructura metálica traen una línea parecida: esquema de pintura de tantos micrones de espesor de película seca. Es un número concreto, fácil de escribir y fácil de controlar con un medidor. Y sin embargo es de los requisitos que más discusiones genera en una inspección, porque detrás de ese número hay una forma de medir y una regla de aceptación que no siempre están escritas al lado.

Un pliego que pide 240 micrones no está pidiendo que cada punto de la estructura mida exactamente 240. Está pidiendo algo más preciso que eso.

## Película húmeda y película seca

La pintura se aplica húmeda y se mide seca. Entre una y otra se va el solvente, y lo que queda es la fracción de sólidos en volumen que declara la hoja técnica del producto.

La relación es directa: el espesor seco es el húmedo multiplicado por los sólidos en volumen. Un epoxi con 75 % de sólidos, para dejar 125 micrones secos, necesita unos 167 micrones húmedos. Un poliuretano de terminación con 62 %, para dejar 50 micrones, necesita unos 81.

Por eso el pintor controla el espesor húmedo con un peine mientras aplica: es la única forma de corregir sobre la marcha. Y por eso diluir de más tiene un costo que no se ve: si a una pintura con 65 % de sólidos se le agrega un 20 % de diluyente, los sólidos bajan a un 54 %, y para obtener el mismo espesor seco hay que aplicar bastante más película húmeda, o más manos.

## Qué significa el número del pliego

El valor que aparece en el pliego es el espesor nominal de película seca. La norma ISO 12944-5 tabula esquemas de pintura por categoría de corrosividad del ambiente y por durabilidad esperada, y cada esquema tiene su espesor nominal total. Dos ejemplos de un fabricante: epoxi de 100 micrones más poliuretano de 80, total 180; epoxi de 180 más poliuretano de 60, total 240.

La durabilidad, en la versión vigente de la norma, se expresa en cuatro rangos: baja, hasta 7 años; media, de 7 a 15; alta, de 15 a 25; y muy alta, más de 25, que es la novedad de la última revisión. Son tiempos hasta el primer mantenimiento mayor, no una garantía.

El espesor nominal, entonces, es el valor de diseño del esquema. La pregunta es cómo se verifica que la estructura lo tiene.

## Cómo se mide sobre acero granallado

El espesor de película seca sobre acero se mide con medidores magnéticos, que leen la distancia entre la sonda y el acero de base. Sobre una chapa lisa, esa lectura es el espesor. Sobre acero granallado, no.

El granallado deja un perfil de rugosidad: picos y valles de varias decenas de micrones. La sonda apoya sobre la pintura y el medidor ve el acero en algún punto entre los picos y los valles. La norma ISO 19840 define el espesor sobre superficies rugosas como el que hay por encima de los picos, que es lo que efectivamente protege, y por eso exige restar a cada lectura un valor de corrección según el perfil.

| Perfil de rugosidad, según ISO 8503-1 | Corrección a restar |
|---|---|
| Fino | 10 µm |
| Medio | 25 µm |
| Grueso | 40 µm |
| Desconocido, sin muestra sin pintar | 25 µm |

Una lectura de 150 micrones sobre un perfil medio corresponde a 125 micrones de película. La norma es explícita en que las lecturas de un medidor ajustado sobre acero liso, sin corrección, no la cumplen. Y prevé un método para determinar una corrección propia de la obra, midiendo sobre una probeta del mismo acero granallado.

La práctica estadounidense, la de la norma SSPC-PA 2, llega a un resultado equivalente por otro camino: ajusta el medidor directamente sobre el acero granallado, con láminas patrón.

## Cuántas lecturas y cuándo se acepta

La ISO 19840 no se conforma con una medición. Fija un mínimo de lecturas según el tamaño del área de inspección.

| Área de inspección | Lecturas mínimas |
|---|---|
| Hasta 1 m² | 5 |
| De 1 a 3 m² | 10 |
| De 3 a 10 m² | 15 |
| De 10 a 30 m² | 20 |
| De 30 a 100 m² | 30 |
| Cada 100 m² adicionales | 10 más |

Y el área se acepta solo si se cumplen cuatro condiciones a la vez:

| Condición | Qué controla |
|---|---|
| El promedio de todas las lecturas es igual o mayor que el nominal | Que haya, en conjunto, el espesor de diseño |
| Ninguna lectura está por debajo del 80 % del nominal | Que no haya puntos débiles |
| Las lecturas entre el 80 y el 100 % son menos del 20 % del total | Que los puntos bajos sean excepciones |
| Ninguna lectura supera el máximo especificado | Que no haya exceso |

Con un nominal de 240 micrones, esto significa que una lectura de 200 es admisible, una de 190 no lo es, y que si demasiadas lecturas quedan entre 192 y 240 el área se rechaza aunque el promedio dé bien. Esa es la lectura precisa del número del pliego.

La SSPC-PA 2 trabaja con otra unidad: el punto, que es el promedio de al menos tres lecturas en un círculo de 4 cm. En su nivel por defecto, cada punto puede estar entre el 80 % del mínimo y el 120 % del máximo especificado, pero el promedio del área tiene que quedar dentro del rango. Las dos normas no dan exactamente el mismo resultado, y por eso conviene que la especificación diga con cuál se inspecciona.

## El exceso también es un defecto

Es tentador pensar que pintura de más nunca está mal. No es así. El máximo que admite cada producto lo fija su fabricante, y por encima aparecen problemas reales: tensiones internas, solvente atrapado, pérdida de adherencia.

El caso más conocido es el del silicato inorgánico de zinc. Si la película es demasiado gruesa, la superficie se cierra antes de que el solvente termine de salir, y la película se cuartea en un dibujo que se conoce como piel de cocodrilo. Las hojas técnicas lo advierten por encima de 125 o 150 micrones, según el producto, y el daño no se repara en el lugar: hay que quitar y volver a aplicar.

Cuando el fabricante no fija un máximo, la práctica habitual toma como referencia tres veces el espesor nominal, por encima del cual las partes tienen que ponerse de acuerdo.

## Donde el espesor no llega

La pintura, al secar, se retrae en los cantos y las esquinas. En un borde vivo el espesor real puede quedar muy por debajo del que se mide en el paño, y es ahí donde el esquema empieza a fallar.

Por eso las buenas especificaciones piden dos cosas que el medidor no ve: el redondeado de los cantos antes de pintar, que la ISO 8501-3 clasifica en grados de preparación P1, P2 y P3, y las manos de refuerzo a pincel sobre soldaduras, cantos y bulones. Un estudio de la marina estadounidense encontró que hacía falta un radio de al menos 3 mm para que un canto se comportara como una chapa plana.

## Lo que deja la experiencia

El espesor de pintura de un pliego es un número que solo tiene sentido junto con tres cosas: la norma con la que se mide, la corrección por rugosidad y la regla de aceptación. Con las tres definidas, la inspección es un trámite objetivo. Sin ellas, dos inspectores con el mismo medidor pueden llegar a conclusiones opuestas sobre la misma pieza.

Y el número promedio no cuenta toda la historia. Una estructura con el espesor correcto en los paños y cantos vivos sin refuerzo va a mostrar óxido en los bordes mucho antes que en ningún otro lugar. El micrón que importa es el que está donde la pintura más cuesta quedarse.

---

*Este apunte forma parte de la serie sobre tratamiento de superficies y protección anticorrosiva del acero. Se complementa con [preparación de superficie: grado de limpieza y perfil de rugosidad](/blog/preparacion-de-superficie-grado-de-limpieza-y-perfil-de-rugosidad/) y con [pintar sobre galvanizado: el arenado de barrido y el sistema dúplex](/blog/pintar-sobre-galvanizado-arenado-de-barrido-y-sistema-duplex/).*

---
title: "Conectores de corte: el detalle que convierte dos materiales en una sección mixta"
description: "Una viga metálica con losa encima no es una viga mixta hasta que algo transmite el corte entre las dos. Cómo trabaja el conector y qué exige en taller y obra."
date: "2026-09-28"
author: "Ing. Hernán Soto Escalante"
image: "/blog/conectores-de-corte-seccion-mixta/portada.jpg"
category: "Estructuras"
tags: ["conectores de corte", "vigas mixtas", "pernos Stud", "Eurocódigo 4", "AISC 360", "estructura metálica"]
---

Una losa de hormigón apoyada sobre una viga de acero no forma una sección mixta. Forma dos elementos apilados: cuando la viga flexiona, la cara inferior de la losa y el ala superior del perfil se deslizan una sobre la otra, y cada material trabaja por su cuenta.

Lo que convierte ese apilamiento en una sola sección es un elemento pequeño, soldado sobre el ala: el conector de corte. De su cantidad, su resistencia y su capacidad de deformarse depende que el conjunto rinda como viga mixta o como viga de acero con una carga encima.

## Lo que el conector tiene que transmitir

En una viga mixta flexionada, el hormigón trabaja comprimido arriba y el acero traccionado abajo. Para que eso ocurra, en la interfaz entre los dos materiales tiene que transmitirse un esfuerzo rasante: el corte longitudinal.

La adherencia natural entre el hormigón y el acero no se cuenta para eso. El Eurocódigo 4 es explícito: los conectores y la armadura transversal deben transmitir el corte longitudinal ignorando el efecto de la adherencia. Todo el esfuerzo pasa por los conectores.

Y hay una segunda función menos visible: impedir que la losa se separe del perfil. Por eso el conector se diseña también para una tracción nominal, del orden del 10 % de su resistencia al corte. Es la razón por la que el perno lleva cabeza.

## Dos formas de fallar

El conector más usado es el perno con cabeza, soldado sobre el ala. El diámetro más frecuente en la práctica europea es 19 mm. Su resistencia queda gobernada por la menor de dos capacidades: la del acero del perno cortándose, o la del hormigón aplastándose alrededor de él.

Para un perno de 19 mm, acero de 450 MPa de resistencia a la tracción y 100 mm de altura, aplicando las expresiones del Eurocódigo 4 con su coeficiente de seguridad de 1,25:

| Hormigón | Capacidad del acero del perno | Capacidad del hormigón | Gobierna |
|---|---|---|---|
| C25/30 | 81,6 kN | 73,7 kN | El hormigón |
| C30/37 | 81,6 kN | 83,3 kN | El acero |

La tabla muestra algo que conviene tener presente: con los hormigones de uso corriente, el conector está prácticamente en equilibrio entre sus dos modos de falla. Un cambio de calidad del hormigón en obra desplaza cuál de los dos gobierna.

## La ductilidad como requisito

El Eurocódigo 4 distingue entre conectores dúctiles y no dúctiles, y el criterio es la capacidad de deslizamiento: un conector es dúctil si puede deformarse al menos **6 mm** antes de fallar.

No es un detalle académico. La ductilidad es la que permite que los conectores de una viga redistribuyan el esfuerzo entre ellos: los más cargados se deforman y trasladan corte a los vecinos, hasta que todos trabajan juntos. Sin esa capacidad, el conector más solicitado falla primero y arrastra a los demás.

De esa propiedad depende una decisión de proyecto que tiene efecto directo en el costo.

## Conexión total y conexión parcial

Una viga tiene **conexión total** cuando sus conectores pueden transmitir todo el esfuerzo que la sección es capaz de desarrollar. Tiene **conexión parcial** cuando se colocan menos, y la capacidad queda limitada por los conectores y no por los materiales.

La conexión parcial es habitual y razonable: muchas veces la viga no necesita su resistencia plástica completa. Pero tiene límites, porque exige que los conectores sean dúctiles.

| Referencia | Grado mínimo de conexión |
|---|---|
| Eurocódigo 4, perfiles de alas iguales | Depende del acero y de la luz; nunca menos de 40 %. Por encima de 25 m, conexión total |
| NBR 8800 (Brasil) | Misma curva que el Eurocódigo, con el mismo mínimo de 40 % |
| AISC 360 (Estados Unidos) | Sin mínimo normativo. La práctica usa 25 % y el comentario advierte que por debajo del 50 % la ductilidad disponible es muy limitada |

Para una viga de acero S355 de 10 m de luz, la expresión del Eurocódigo da un grado mínimo de 45 %. La cantidad de conectores, por lo tanto, no es un dato que se elige: es un **resultado del cálculo**, que cambia con la luz, con el grado de conexión adoptado, con la chapa y con la calidad del hormigón.

## Cuando el perno atraviesa la chapa

En los entrepisos con chapa colaborante, el perno se suelda a través de la chapa sobre el ala de la viga. Ahí su capacidad se reduce, porque el hormigón que lo rodea ya no es una losa maciza sino el relleno de un nervio.

Si los nervios corren perpendiculares a la viga, el Eurocódigo 4 aplica un coeficiente de reducción que depende de la geometría del nervio y de la cantidad de pernos por nervio, con topes que dependen del espesor de la chapa:

| Pernos por nervio | Chapa de hasta 1,0 mm | Chapa de más de 1,0 mm |
|---|---|---|
| 1 | 0,85 | 1,0 |
| 2 | 0,70 | 0,80 |

Hay además un límite de diámetro: para soldar a través de la chapa, el Eurocódigo admite pernos de hasta **20 mm**. El motivo es experimental. En ensayos de corte directo realizados en Nueva Zelanda con pernos de 22 mm soldados a través de la chapa, la capacidad de deslizamiento resultó muy baja: se comportaron como conectores no dúctiles. La recomendación que se desprende es usar 19 mm, o dos pernos por nervio.

La relación entre la chapa y el perno se desarrolla con más detalle en el apunte sobre [chapa colaborante sobre estructura metálica](/blog/chapa-colaborante-sobre-estructura-metalica/).

## La geometría del detalle

Las reglas de detalle son pocas y bien definidas. Conviene tenerlas presentes desde el despiece, porque varias las condiciona el perfil y no el perno:

| Regla | Eurocódigo 4 | AISC 360 |
|---|---|---|
| Altura del perno | Al menos 3 diámetros | Al menos 4 diámetros |
| Separación mínima en la dirección del corte | 5 diámetros | 6 diámetros |
| Separación mínima transversal | 4 diámetros (2,5 en losa maciza) | 4 diámetros |
| Separación máxima | 6 veces el espesor de losa y 800 mm | 8 veces el espesor de losa y 900 mm |
| Diámetro respecto del ala | Hasta 2,5 veces el espesor del ala, salvo que el perno quede sobre el alma | Igual criterio |

La última fila es la que vincula el conector con la estructura metálica principal. Un ala delgada limita el diámetro del perno, y con él la resistencia de cada conector y la cantidad necesaria. El perfil se elige también pensando en lo que va a recibir encima.

## La soldadura en obra

El perno se suelda por arco: una pistola levanta el perno, abre un arco eléctrico entre su extremo y el ala, y lo hunde en el baño fundido. Una férula cerámica contiene el material y forma el collar de soldadura alrededor de la base.

El control está estandarizado. La práctica británica, basada en la norma ISO 14555, establece:

| Momento | Control |
|---|---|
| Antes de producción, en obra | Al menos 10 pernos, inspección visual y plegado a 30° de todos |
| Durante producción | Inspección visual y ensayo de sonido con martillo en todos; plegado a 15° de al menos el 5 % o 2 pernos por viga |
| Pernos sin collar completo | Plegado a 15°; si no se rompe, queda plegado |

Y las causas de falla más frecuentes son conocidas: humedad o suciedad entre la chapa y el ala, chapa mojada, temperaturas bajo cero, y un ala con pintura o galvanizado. El zinc de una viga galvanizada produce soldaduras frágiles. El galvanizado liviano de la chapa colaborante sí se quema localmente con el arco, pero el recubrimiento de una viga galvanizada por inmersión es varias veces más grueso.

## Lo que se gana

La referencia técnica británica resume el efecto de una conexión eficaz en dos órdenes de magnitud: frente a la viga de acero sola, la viga mixta tiene alrededor del **doble de resistencia** y hasta el **triple de rigidez**. En luces de 12 a 20 m, el peso de acero resulta entre un **30 y un 50 % menor** que en una construcción no mixta.

Todo eso descansa sobre unos pocos pernos por metro de viga.

## Una línea que se está abriendo

El perno soldado tiene una limitación que la industria europea empezó a revisar: una vez hormigonada la losa, la viga y el entrepiso ya no se separan. La guía SCI P428, surgida de un proyecto de investigación europeo, sistematiza **conectores abulonados desmontables** —bulones con doble tuerca, bulones de alta resistencia con acoples embebidos— que permiten desarmar el entrepiso y recuperar las vigas al final de la vida útil del edificio. En paralelo, los conectores continuos de chapa recortada, usados en puentes cuando el perno no alcanza, cuentan ya con una especificación técnica europea propia.

## Lo que deja la experiencia

El conector de corte es el elemento más chico de un entrepiso mixto y el que define si el cálculo se cumple. Y buena parte de sus condiciones se resuelven en taller, antes de que el perno exista: el espesor del ala que admite el diámetro, la zona del ala superior que tiene que llegar a obra sin pintura, y la decisión de no galvanizar una viga que va a recibir pernos.

Son definiciones de fabricación de la estructura principal. Tomadas temprano, la soldadura de los conectores en obra es un proceso controlado y repetible. Tomadas tarde, el perno se termina soldando sobre una superficie que no fue preparada para recibirlo.

---

*Este apunte forma parte de la serie sobre sistemas que se apoyan en la estructura metálica principal. Se complementa con [chapa colaborante sobre estructura metálica](/blog/chapa-colaborante-sobre-estructura-metalica/) y con [la unión entre el pórtico metálico y el elemento de madera](/blog/union-portico-metalico-elemento-de-madera/).*

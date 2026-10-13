---
title: "Grado de protección IP de un shelter: dónde aplica y dónde deja de aplicar"
description: "El grado IP describe una envolvente ensayada en una configuración concreta. En un shelter con puertas, rejillas y pasamuros, conviene saber a qué parte aplica."
date: "2026-10-13"
author: "Ing. Hernán Soto Escalante"
image: "/blog/grado-de-proteccion-ip-de-un-shelter/portada.jpg"
category: "TBex"
tags: ["grado IP", "IEC 60529", "shelters", "gabinetes", "estanqueidad", "envolvente"]
---

El grado de protección IP es probablemente el dato más citado en una especificación de equipamiento para intemperie. Dos cifras, IP55 o IP66, que parecen resumir cuánto resiste una envolvente al polvo y al agua.

Y lo resumen bien, para aquello que fue ensayado. La norma IEC 60529 define cada grado por un ensayo concreto, sobre una muestra concreta, en una configuración concreta. En un gabinete, esa muestra es el producto entero. En un shelter transitable, con puertas, rejillas de ventilación, pasamuros de cables y equipos de climatización, vale la pena precisar a qué parte se refiere el número.

## Qué mide cada cifra

La primera cifra describe la protección contra el ingreso de sólidos, y los dos valores que importan a la intemperie son el 5 y el 6. Son distintos de una manera que se suele pasar por alto: el **5** admite que entre polvo, mientras no interfiera con el funcionamiento ni con la seguridad; el **6** exige que no entre nada.

La segunda cifra describe la protección contra el agua, y cada valor corresponde a un ensayo distinto:

| Grado | Ensayo |
|---|---|
| IPX4 | Salpicaduras desde todas las direcciones |
| IPX5 | Chorro de agua: boquilla de 6,3 mm, 12,5 litros por minuto, desde 2,5 a 3 m, durante al menos 3 minutos |
| IPX6 | Chorro potente: boquilla de 12,5 mm, 100 litros por minuto, a la misma distancia |
| IPX7 | Inmersión temporal, hasta 1 m de profundidad y 30 minutos |

El ensayo de polvo, por su parte, se hace en una cámara con talco en suspensión, durante dos a ocho horas, y en las envolventes que respiran por ciclos térmicos se realiza poniendo el interior en depresión, para forzar el ingreso.

## Dos particularidades del código

**Los grados no son todos acumulativos.** Hasta el 6, cumplir un grado implica cumplir los anteriores: un IP65 sirve donde se pide IP55. Pero el 7 y el 8 son ensayos de inmersión, no de chorro, y no cubren a los anteriores. Una envolvente IP67 puede no resistir el chorro del IP66. Por eso existen los marcados dobles, del tipo IP66/IP67.

**El criterio de aprobación no es "ni una gota".** Los laboratorios aplican un criterio funcional: el agua que ingrese no debe interferir con la operación, comprometer la seguridad, depositarse sobre aislaciones o bornes, alcanzar partes con tensión ni acumularse en los extremos de los cables. Y que el equipo siga funcionando no alcanza como prueba: después del ensayo se abre, se inspecciona y normalmente se hace un ensayo dieléctrico.

## Lo que el grado IP no dice

El código IP habla de dos cosas, sólidos y agua, y de nada más. La asociación norteamericana de fabricantes eléctricos, NEMA, lo expresa con precisión al explicar por qué sus designaciones no son equivalentes: un grado IP solo considera el ingreso de objetos sólidos y de agua, mientras que los tipos NEMA consideran además el hielo, la resistencia a la corrosión y los detalles constructivos.

La consecuencia práctica es directa. Un gabinete IP66 de chapa sin tratamiento adecuado cumple su grado el día del ensayo y se oxida igual. La resistencia a la corrosión, la radiación solar, el impacto mecánico —que tiene su propio código, el IK— y la condensación interior son requisitos distintos, que se especifican por separado.

La condensación merece una línea propia, porque es la que más sorprende. Una envolvente muy hermética respira: con cada ciclo de temperatura, la presión interior sube y baja respecto del ambiente, y cuando baja, la junta aspira aire húmedo. Cuanto más estanco es el gabinete, más importa resolver esa respiración con un dispositivo de compensación de presión, que deja pasar el aire y retiene el agua.

## El ensayo es de tipo

La misma comparación de NEMA trae el punto central para un shelter: sus designaciones exigen ensayar la envolvente completamente instalada y lista para usar, mientras que los grados IP pueden aplicarse a estados parciales de instalación.

Un grado IP es el resultado de un ensayo de tipo: se ensaya una muestra, en una condición de montaje, con determinados accesorios. Lo que se le agregue después —una perforación para un prensacable, un ventilador, una rejilla— ya no es lo que se ensayó. NEMA lo resume con una regla que, aunque pertenece a su sistema, describe bien el principio: la calificación de un conjunto armado en campo queda limitada por la del componente menos exigente. El eslabón más débil de la cadena.

Los accesorios de uso corriente tienen sus propios grados, y conviene conocerlos:

| Componente | Grado típico declarado por los fabricantes |
|---|---|
| Ventilador con filtro estándar | IP54 |
| Ventilador con filtro de mayor prestación | IP55 |
| Equipo de refrigeración de gabinete, circuito interior | IP54 |
| Equipo de refrigeración de gabinete, circuito exterior | IP34 |

Un gabinete ensayado como IP66 al que se le monta un equipo de refrigeración de ese tipo queda, hacia el interior, en IP54. No es un defecto de ninguno de los dos: es la suma de dos productos con grados distintos.

## El caso del shelter

En un recinto transitable se juntan todas las condiciones anteriores, y una más: el tamaño.

Las cámaras de ensayo tienen límites. Los laboratorios europeos publican capacidades del orden de 5 por 6 por 4 metros para ensayos de agua, y cámaras de polvo bastante menores, de unos pocos metros de lado. Un módulo de seis o más metros de largo no entra en una cámara de polvo, y el ensayo de la primera cifra en su versión más exigente supondría poner en depresión todo el volumen del recinto.

Y el shelter tiene, por función, elementos que no son estancos. Las puertas son de paso de personas y se abren a diario. El compartimento de baterías necesita ventilación, con una entrada y una salida de aire. Los equipos de climatización tienen un circuito exterior. Los cables entran por pasamuros que se completan en obra.

Por eso en estos recintos el grado IP se ubica con más precisión cuando se lo refiere a algo concreto:

| A qué se refiere | Cómo se verifica |
|---|---|
| Los gabinetes y tableros que están dentro del recinto | Grado IP de cada gabinete, con su ensayo de tipo |
| Las rejillas, los ventiladores y los equipos de climatización | Grado declarado por el fabricante de cada componente |
| Los pasamuros de cables | Grado del sistema de sellado, una vez completado |
| La envolvente del recinto | Ensayo de estanqueidad al agua sobre la unidad terminada, en fábrica |

El último renglón es el que resuelve la mayor parte de las dudas. Un ensayo de lluvia o de chorro sobre el módulo terminado, con sus puertas, sus juntas y sus pasamuros colocados, antes del despacho, es una verificación sobre la unidad real y no sobre una muestra.

## Lo que deja la experiencia

Cuando un pedido indica un grado IP para un shelter completo, lo que expresa es una exigencia legítima: que el equipamiento quede protegido del polvo y del agua del sitio. La manera de responderla con rigor es decir qué parte cumple qué grado y cómo se comprobó.

Los gabinetes interiores llevan su grado ensayado. Los componentes llevan el suyo. Y la envolvente se demuestra con un ensayo sobre la unidad terminada. Esa respuesta es más larga que dos cifras, pero es la que se puede verificar el día de la recepción.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/) y con la [ventilación del recinto de baterías](/blog/ventilacion-recinto-baterias-hidrogeno-renovaciones/).*

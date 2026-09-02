---
title: "Ventilación del recinto de baterías: hidrógeno y renovaciones de aire"
description: "Por qué una batería regulada por válvula igual desprende hidrógeno, qué límite fija la IEC 62485-2 y por qué el aire acondicionado del shelter no cumple esta función."
date: "2026-10-08"
author: "Ing. Hernán Soto Escalante"
image: "/blog/ventilacion-recinto-baterias-hidrogeno-renovaciones/portada.jpg"
category: "TBex"
tags: ["baterías", "hidrógeno", "IEC 62485-2", "ventilación", "shelters", "UPS"]
---

Todo shelter con energía respaldada tiene un banco de baterías adentro, y ese banco desprende hidrógeno. No es un evento excepcional ni una condición de falla: ocurre durante la carga, en operación normal, todos los días.

El punto que más confusión genera es que las baterías más usadas hoy en estas aplicaciones se llaman "selladas", y ese nombre sugiere que el problema no existe.

## La batería regulada por válvula no está sellada

La denominación correcta es **VRLA**, batería de plomo-ácido regulada por válvula. La válvula existe justamente porque hay algo que tiene que salir.

En condiciones normales, una VRLA recombina internamente la mayor parte del gas que produce, y por eso su tasa de desprendimiento es mucho menor que la de una batería abierta. Pero la recombinación no es total, y deja de serlo cuando la batería se sobrecarga, cuando envejece o cuando trabaja a temperatura elevada —tres condiciones que en un shelter son perfectamente esperables—. En esas situaciones la válvula abre y libera al ambiente.

La consecuencia de proyecto es directa: **una batería VRLA requiere ventilación**. Menos que una abierta, pero requiere. Diseñar el recinto asumiendo que no desprende nada es diseñar sobre una condición que solo se cumple mientras todo funcione perfecto.

## El límite y de dónde sale

La norma de referencia es la **IEC 62485-2** —adoptada en Europa como EN IEC 62485-2, que reemplazó a la anterior EN 50272-2—. Cubre baterías estacionarias de hasta 1.500 V de corriente continua, incluyendo plomo-ácido abiertas y VRLA y níquel-cadmio, en aplicaciones de UPS, respaldo de telecomunicaciones y energía de emergencia.

El criterio de ventilación se apoya en un único número: **la concentración de hidrógeno en el recinto debe mantenerse por debajo del 1 % en volumen**.

Ese 1 % conviene entenderlo. El límite inferior de explosividad del hidrógeno en aire está en el orden del 4 %. La norma no fija el límite en el borde de la explosividad: lo fija en la cuarta parte, y esa distancia es el margen de seguridad frente a la falta de homogeneidad del aire dentro del recinto. El hidrógeno es el gas más liviano que existe y se acumula arriba: la concentración media del recinto puede ser baja mientras la concentración bajo el cielorraso es varias veces mayor.

De ahí se desprende un criterio de disposición que vale más que cualquier cálculo: **la salida de aire va arriba, lo más alto posible, y la entrada abajo**. Una ventilación con las dos aberturas a media altura cumple el caudal y no cumple la función.

## El cálculo

El caudal de ventilación se determina a partir de la máxima tasa de desprendimiento de hidrógeno durante la carga, que depende de la corriente de carga, de la capacidad del banco y del tipo de batería, y del volumen del recinto.

Para el caso de **ventilación natural**, la norma fija el área libre de las aberturas de entrada y salida con una expresión sencilla, del tipo **A ≥ 28 · Q**, con el área en centímetros cuadrados y el caudal en metros cúbicos por hora, asumiendo una velocidad de aire de 0,1 m/s. Esa velocidad tan baja es lo que explica que las aberturas resulten grandes: la ventilación natural no tiene quien empuje el aire.

Cuando el área que resulta no es compatible con el recinto —y en un shelter compacto muchas veces no lo es— la salida es ventilación forzada, con extractor, y con el criterio de que el extractor tiene que funcionar durante la carga, que es cuando se genera el gas.

## Por qué el aire acondicionado no resuelve esto

Es la confusión más frecuente y la más costosa de descubrir tarde.

Un equipo de aire acondicionado de expansión directa **recircula**. Toma aire del recinto, lo enfría y lo devuelve al recinto. No introduce aire exterior ni extrae aire interior. Puede mantener la temperatura perfecta mientras la concentración de hidrógeno sube sin que nada lo impida.

Son dos funciones distintas sobre el mismo volumen: la climatización controla temperatura, la ventilación controla concentración. Un shelter necesita las dos, y la segunda no viene incluida en la primera.

Hay además un efecto cruzado que conviene considerar: la ventilación del recinto de baterías introduce aire exterior, y ese aire exterior es carga térmica adicional que el equipo de climatización tiene que absorber. Si la ventilación es continua y el sitio es cálido, ese aporte entra en el balance térmico y no es despreciable.

## La temperatura, que es el otro lado del mismo problema

Existe una realimentación entre las dos funciones que vale la pena tener presente.

La tasa de desprendimiento de hidrógeno crece con la temperatura de la batería. Y la vida útil de una batería de plomo cae aproximadamente a la mitad por cada 8 a 10 °C por encima de su temperatura de referencia. Un recinto que se calienta produce más gas y consume más rápido su banco de baterías.

Por eso el compartimento de baterías es, en muchos diseños, el elemento que fija la consigna de temperatura de todo el shelter. El equipamiento electrónico tolera bastante más calor que el banco; la batería es la que manda.

## Lo que deja la experiencia

La ventilación del recinto de baterías es de los pocos requisitos de un shelter que tiene una consecuencia de seguridad directa, y a la vez de los que más fácil se resuelven mal, porque el nombre comercial de la batería sugiere que el problema no existe.

Los tres puntos que conviene dejar cerrados en el proyecto son siempre los mismos: que exista ventilación específica del compartimento, independiente de la climatización; que la salida esté en el punto más alto del recinto; y que el criterio de cálculo quede escrito con la corriente de carga y la capacidad del banco sobre los que se dimensionó. Si después el banco cambia —y cambia, porque la autonomía se redefine seguido— esa memoria es lo que permite saber si la ventilación sigue siendo suficiente.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con el [balance térmico de un shelter para operar a +45 °C](/blog/balance-termico-de-un-shelter-como-dimensionar-el-aire-acondicionado-para-operar-a-45-c/) y con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).*

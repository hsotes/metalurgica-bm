---
title: "La profundidad del rack define el ancho interior del shelter"
description: "Cómo los pasillos de servicio frontal y posterior fijan la geometría de una sala técnica, y en qué punto la huella deja de entrar en el gálibo de transporte convencional."
date: "2026-09-24"
author: "Ing. Hernán Soto Escalante"
image: "/blog/profundidad-del-rack-define-el-ancho-interior-del-shelter/portada.jpg"
category: "TBex"
tags: ["racks", "sala técnica", "shelters", "TIA-942", "layout", "gálibo de transporte"]
---

La huella de una sala técnica no se define desde afuera hacia adentro. Se define al revés: se parte del equipamiento, se le suman los espacios que hacen falta para operarlo, y de esa suma sale el ancho interior. Recién después aparece la pregunta de si eso entra en un camión.

Cuando el orden se invierte —cuando se parte de una huella disponible y se intenta acomodar el equipamiento adentro— el problema no desaparece: se traslada al mantenimiento.

## Las dos dimensiones que gobiernan

Un rack de 42U de uso corriente en infraestructura crítica tiene **1.000 mm de profundidad**. Esa es la primera dimensión.

La segunda son los pasillos. La **TIA-942**, que es la norma de infraestructura de telecomunicaciones para centros de datos y la referencia habitual para salas técnicas, fija valores mínimos y recomendados para el espacio libre delante y detrás de los gabinetes:

| Pasillo | Mínimo | Preferible |
|---|---|---|
| Frontal | 1.000 mm | 1.200 mm |
| Posterior | 600 mm | 1.000 mm |

Los dos valores responden a funciones distintas y por eso son distintos entre sí.

El **pasillo frontal** es el de instalación. Por ahí entra y sale el equipo: un servidor, una fuente, un módulo de potencia. Para extraer un equipo de 1.000 mm de fondo hace falta ese metro más el espacio para maniobrarlo y sostenerlo. Por eso la norma recomienda 1.200 mm cuando el equipamiento es profundo.

El **pasillo posterior** es el de conexionado. Por ahí no pasa equipamiento: pasan las manos de quien conecta, revisa o reemplaza un cable. Con 600 mm se trabaja, con 800 se trabaja cómodo, y por encima de eso el rendimiento adicional es marginal.

## La suma

Con esos números, un layout de una sola fila de racks con acceso frontal y posterior da:

**Pasillo frontal 1.200 + rack 1.000 + pasillo posterior 800 = 3.000 mm de ancho interior.**

Ese resultado no depende del proyecto: depende de la profundidad del rack y del requisito de acceso por ambas caras. Si el equipamiento se opera solo de frente —como ocurre con muchos tableros murales— la cuenta cambia por completo y el ancho interior puede bajar a la mitad. Pero desde el momento en que se pide acceso posterior a racks de 1.000 mm, los tres metros están fijados.

Vale la pena notar qué **no** entra en esa cuenta. No entra la unidad interior de climatización, que se monta en alto justamente para no consumir planta. No entran los tableros murales, que se ubican en los extremos. Y no entra el espacio de trabajo frente a los tableros eléctricos, que responde a su propio requisito reglamentario y que en un layout apretado puede superponerse mal con el pasillo frontal.

## El punto donde la huella deja de ser convencional

Un contenedor marítimo de 20 pies tiene aproximadamente **2.350 mm de ancho interior**. Es una dimensión que aparece con frecuencia como referencia de partida en las especificaciones, porque el contenedor es el objeto mental con el que la mayoría asocia la palabra "módulo transportable".

Los tres metros que exige el acceso posterior no entran ahí. No es una cuestión de optimizar el layout: son 650 mm de diferencia sobre una dimensión que no admite ajuste.

Y cuando el ancho interior sube a 3.000 mm, el ancho exterior se va a **3.200 mm** contando la envolvente. Eso cruza el límite de 2.600 mm de ancho de carga que se puede transportar sin permiso especial. El traslado pasa a ser transporte con permiso de exceso de dimensiones, con lo que eso implica en costo, en planificación de ruta y en horarios de circulación.

Es una consecuencia en cadena que conviene ver completa desde el principio:

| Decisión | Consecuencia |
|---|---|
| Acceso frontal y posterior a racks de 1.000 mm | Ancho interior 3.000 mm |
| Ancho interior 3.000 mm | Ancho exterior del orden de 3.200 mm |
| Ancho exterior mayor a 2.600 mm | Transporte especial con permiso |

Ninguno de esos pasos es evitable sin renunciar al primero.

## El detalle de las puertas de los racks

Hay un elemento del equipamiento, no del recinto, que puede recuperar espacio útil: las puertas de los gabinetes.

Una puerta de rack de hoja única, al abrirse, barre un arco igual a su ancho. Con un rack de 600 mm y un pasillo posterior de 800, la puerta abierta deja apenas 200 mm de paso libre. En la práctica eso significa que no se puede estar detrás del rack con la puerta abierta, que es exactamente lo que hay que hacer para conectar.

Con **puertas bipartidas de doble hoja**, cada hoja barre entre 300 y 400 mm y el paso libre remanente se mantiene en el orden de 400 mm en el pasillo posterior y de 800 en el frontal. Es un requisito que se especifica en la provisión de los racks, no en la fabricación del recinto, y que rescata espacio que de otro modo habría que sumar al ancho del módulo.

## Lo que deja la experiencia

En la mayoría de los módulos transportables la restricción que gobierna la geometría es el transporte: se parte del gálibo y se acomoda lo que entre. En una sala técnica con racks de acceso por ambas caras eso deja de ser cierto. **Gobierna el mantenimiento**, y el transporte pasa a ser una consecuencia que hay que resolver, no un límite que haya que respetar.

Reconocerlo temprano evita el escenario que más cuesta: descubrir en la ingeniería de detalle que la huella acordada no admite el layout, cuando ya hay un precio comprometido. Los tres metros salen de una suma de tres números, y esa suma se puede hacer el primer día.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/) y con el [análisis de las variables de diseño que definen la vida útil](/blog/vida-util-de-un-shelter-modular-analisis-de-las-variables-de-diseno/).*

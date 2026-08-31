---
title: "Anclaje de un shelter: reacciones de diseño y frontera con la fundación"
description: "El módulo lo fabrica uno y la base la ejecuta otro. Qué información tiene que cruzar esa frontera para que el anclaje se pueda verificar, y por qué el viento la gobierna."
date: "2026-09-24"
author: "Ing. Hernán Soto Escalante"
image: "/blog/anclaje-shelter-reacciones-frontera-fundacion/portada.jpg"
category: "TBex"
tags: ["anclaje", "fundaciones", "reacciones de diseño", "ACI 318", "shelters", "vuelco"]
---

En un módulo transportable hay una frontera que no existe en la construcción tradicional: el que fabrica la caja y el que ejecuta la base son dos partes distintas, muchas veces separadas por mil kilómetros y por varios meses. El punto donde se encuentran es el anclaje.

Esa frontera no se resuelve con un bulón. Se resuelve con información, y la calidad de esa información determina si el anclaje se puede verificar o si queda librado a la buena voluntad de quien hormigona.

## Qué tiene que cruzar la frontera

El entregable que hace verificable el anclaje no es un plano de detalle del bastidor: son las **reacciones de diseño en cada apoyo**, acompañadas de las condiciones que el hormigón tiene que cumplir.

| Información | Por qué la necesita la obra civil |
|---|---|
| Reacciones por apoyo: axil, corte y momento, por combinación | Es la carga de entrada para dimensionar la base |
| Posición de los apoyos y geometría de la placa | Define la ubicación de pernos y la armadura local |
| Resistencia mínima del hormigón | Los modos de falla del anclaje dependen de ella |
| Espesor mínimo del elemento | Condiciona la profundidad de empotramiento posible |
| Distancia mínima al borde | Es, con frecuencia, lo que gobierna la capacidad |
| Tipo de anclaje previsto | Preinstalado u hormigonado posterior, no son equivalentes |

Las tres últimas filas son las que más se omiten y las que más problemas generan. Una base perfectamente dimensionada para la carga, ejecutada con el borde a pocos centímetros del perno, puede tener la mitad de la capacidad que se supuso.

## Por qué el viento gobierna el anclaje

En un módulo liviano la relación entre superficie expuesta y peso propio invierte el problema respecto de una construcción convencional.

El peso propio de un shelter con envolvente de panel se ubica, vacío, en el orden de una a dos toneladas. La superficie de barlovento es de varios metros cuadrados y el techo, que es plano y liviano, recibe succión. Con las presiones de diseño de un emplazamiento de campo abierto, la combinación de empuje horizontal y succión de techo produce **tracción neta en los anclajes de barlovento**.

Ese es el punto que cambia todo. Un anclaje comprimido es un problema trivial: el hormigón trabaja a compresión y la fricción entre placa y base absorbe cortes moderados. Un anclaje traccionado activa los modos de falla que la normativa trata con detalle, porque son frágiles.

La **ACI 318, capítulo 17**, que es la referencia habitual para anclajes al hormigón, trata la tracción y el corte por separado y después los combina en un diagrama de interacción. Los modos de falla que verifica incluyen la rotura del acero del perno, el arrancamiento del cono de hormigón, el deslizamiento por adherencia y la rotura del borde. En la práctica, para las profundidades de empotramiento habituales en este tipo de anclaje, **el que gobierna casi siempre es un modo del hormigón, no del acero**.

Eso tiene una implicancia contraintuitiva: poner un perno más grueso no siempre mejora nada. Si el que falla es el cono de hormigón, la variable útil es la profundidad de empotramiento, la distancia al borde o el espesor del elemento —todas del lado de la obra civil—.

## La fricción no se puede invocar para el vuelco

Es un error de razonamiento que aparece seguido. Frente a un esfuerzo horizontal, la fricción entre la placa base y el hormigón puede absorber una parte, y para acciones pequeñas es una hipótesis aceptable.

El problema es que la fricción disponible es proporcional a la compresión sobre la placa. Y en la combinación que gobierna —viento con succión de techo— la compresión es justamente lo que se está perdiendo. La fricción desaparece exactamente en el instante en que se la necesita.

Por eso el corte, en la combinación de vuelco, tiene que ir a los pernos o a un dispositivo específico, y verificarse en interacción con la tracción simultánea.

## Los apoyos articulados y por qué conviene declararlos

En el modelo estructural de un módulo transportable, los apoyos suelen definirse como **articulados**: transmiten axil y corte, no momento.

Es una decisión de proyecto con consecuencias en las dos direcciones. Del lado del bastidor, un apoyo articulado obliga a que la estabilidad lateral la resuelva la propia estructura, no el empotramiento. Del lado de la base, simplifica enormemente el trabajo de la obra civil: recibe fuerzas, no momentos concentrados.

Lo que no conviene es dejarlo implícito. Si el cálculo del módulo supuso apoyos articulados y la base se ejecuta con un empotramiento rígido, la estructura recibe solicitaciones para las que no se verificó. Y al revés, si el cálculo supuso empotramiento y la base entrega una articulación, la estructura es más flexible de lo previsto.

## Lo que hay del otro lado y no se controla

Hay una asimetría en esta frontera que conviene asumir con honestidad: quien fabrica el módulo entrega reacciones y requisitos, pero no ve la base hasta que llega al sitio.

El terreno real, la calidad del hormigón efectivamente colocado, la nivelación de la platea y la posición real de los insertos son variables que se conocen el día del montaje. De ahí que la verificación dimensional previa al despacho tenga tanto peso: es el único momento en que las dos mitades de la interfaz están bajo control de una sola parte.

Y de ahí también que el plano de anclaje tenga que emitirse temprano, no con la ingeniería de detalle final. La obra civil suele hormigonar antes de que el módulo esté terminado; si el plano llega tarde, llega después del hormigón.

## Lo que deja la experiencia

El anclaje de un módulo transportable es, en el fondo, un problema de documentación más que de cálculo. El cálculo es acotado y está bien cubierto por la normativa. Lo que falla es la transmisión: reacciones que se entregan sin las combinaciones, requisitos de borde que no se explicitan, o un plano que llega cuando la platea ya está hecha.

La regla práctica que evita casi todos esos problemas es simple: la fundación queda fuera del alcance de quien fabrica, pero **el plano de anclaje con las reacciones de diseño no**. Es lo primero que debería salir de la ingeniería del módulo, aun antes de que estén resueltos los detalles de terminación, porque es lo que otro necesita para poder empezar.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con las [acciones de viento sobre un shelter](/blog/acciones-de-viento-sobre-un-shelter-localidad-exacta/) y con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).*

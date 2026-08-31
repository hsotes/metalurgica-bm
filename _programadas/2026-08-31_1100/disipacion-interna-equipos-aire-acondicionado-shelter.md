---
title: "Disipación interna de los equipos: el dato que define la capacidad del aire acondicionado de un shelter"
description: "Por qué la carga térmica de un shelter no es la potencia de placa del equipamiento, cómo se arma el balance y qué pasa cuando el equipo de aire se dimensiona sobre el número equivocado."
date: "2026-08-31"
author: "Ing. Hernán Soto Escalante"
image: "/blog/disipacion-interna-equipos-aire-acondicionado-shelter/portada.jpg"
category: "TBex"
tags: ["shelters", "balance térmico", "climatización", "disipación interna", "GR-487", "infraestructura crítica"]
---

El equipo de aire acondicionado de un shelter se elige a partir de un número: cuánto calor entrega el equipamiento que va adentro. Todo lo demás del balance térmico —la envolvente, el sol, las infiltraciones— es real y hay que calcularlo, pero rara vez mueve la aguja tanto como ese primer término.

Y es, casi siempre, el número menos firme de todo el cálculo.

## La disipación no es la potencia de placa

En un recinto que aloja equipamiento eléctrico y electrónico no hay trabajo mecánico saliendo del sistema. Prácticamente toda la energía eléctrica que entra termina convertida en calor dentro del volumen. Esa es la buena noticia: no hace falta un modelo complejo para saber cuánto calor genera un rack. Alcanza con saber cuánta potencia consume.

El problema es que la potencia de placa y la potencia consumida no son lo mismo, y la diferencia no es marginal.

La potencia nominal de una fuente, de un variador o de un servidor corresponde a su condición de plena carga. En operación, un rack de comunicaciones difícilmente trabaja por encima del 40 a 60 % de esa cifra. Dimensionar el aire sobre la suma de las placas produce un equipo sobredimensionado con certeza matemática; dimensionar sobre una estimación optimista produce lo contrario. Ninguno de los dos extremos es gratis.

### El consumo que casi nunca se cuenta

Hay una fuente de calor que suele quedar afuera de la planilla: la propia UPS.

Una UPS on-line de doble conversión tiene un rendimiento del orden del 92 al 95 % según el punto de carga. Esas pérdidas no se van a ningún lado: quedan adentro del shelter. Sobre una carga crítica de 5 kW, la UPS aporta entre 250 y 450 W adicionales solo por su rendimiento. A eso hay que sumarle la corriente de carga del banco de baterías, que después de un corte prolongado puede sostenerse durante horas y constituye un régimen térmico distinto del de operación normal.

En shelters chicos, donde la carga crítica es de pocos kilowatts, ese aporte deja de ser un detalle: puede representar entre el 5 y el 10 % de la carga térmica total.

## Los otros términos del balance

Con la disipación interna definida, el resto del balance sigue el camino conocido.

| Término | De qué depende |
|---|---|
| Transmisión por envolvente | Transmitancia del panel, superficie expuesta y salto térmico entre interior y exterior de diseño |
| Ganancia solar | Orientación, absortancia de la terminación exterior, superficie de techo y de muros expuestos |
| Infiltración y renovaciones | Estanqueidad real de la envolvente y ventilaciones forzadas si existen |
| Ocupación | Casi siempre despreciable: son recintos sin personal permanente |

La **Telcordia GR-487**, que es la referencia internacional para gabinetes y recintos de planta externa, es explícita en un punto que conviene subrayar: el sistema térmico debe resolver la disipación del equipamiento **más** el aporte de la radiación solar por exposición directa al sol, sobre un rango ambiente que la norma fija entre –40 y +46 °C. No son dos cálculos separados que después se comparan: es un único balance donde ambos términos ocurren al mismo tiempo, en la hora más desfavorable del día más desfavorable del año.

La ganancia solar sobre el techo de un shelter de dimensiones habituales, con terminación clara y en verano, se ubica en el orden de unos pocos cientos de watts. Es un término secundario frente a una disipación interna de varios kilowatts, pero deja de serlo cuando el equipamiento adentro es liviano y el recinto es grande.

## El orden de magnitud

La literatura técnica ubica la disipación interna de los recintos de telecomunicaciones en un rango amplio, de aproximadamente 500 W a 10 kW, según el tipo y la cantidad de equipamiento. Ese rango de veinte a uno explica por qué no existe el "aire acondicionado estándar para shelter": la misma caja, con la misma envolvente y en el mismo sitio, puede necesitar un equipo de 2 kW o de 15 kW según lo que se le ponga adentro.

Un shelter de interconexión eléctrica, con tableros de protección, medición y telecontrol, se mueve en la banda baja de ese rango. Una sala técnica con racks poblados y una UPS de decenas de kVA se mueve en la banda alta. Son productos que se parecen por afuera y no tienen nada que ver por adentro.

## Qué pasa cuando el número está mal

El error de dimensionamiento no se manifiesta igual en los dos sentidos, y eso es lo que lo vuelve interesante.

**Un equipo corto** se detecta rápido y de la peor manera. La temperatura interior sube hasta que el equipamiento entra en su régimen de reducción de prestaciones o directamente en protección térmica. En infraestructura crítica eso es una salida de servicio, y ocurre exactamente en las condiciones ambientales más severas, que es cuando menos se la puede permitir.

**Un equipo sobrado** no se detecta nunca, y ese es el problema. Trabaja en ciclos cortos: arranca, satisface la consigna en pocos minutos, para, y vuelve a arrancar. Cada arranque es el momento de mayor esfuerzo mecánico y eléctrico del compresor. Un equipo que cicla de más envejece de más, deshumidifica peor —porque nunca llega a régimen estacionario— y consume más de lo que debería. El shelter opera a la temperatura correcta durante años mientras el equipo se desgasta al doble de velocidad.

Entre los dos errores, el segundo es el más común y el más caro a lo largo de la vida útil.

## Lo que cambia con la ventilación libre

Hay una consecuencia del balance térmico que no suele aparecer en la etapa de diseño y que pesa mucho en el costo operativo: durante buena parte del año, la temperatura exterior es más baja que la consigna interior. En esas horas, enfriar con un compresor es pagar por algo que el aire exterior hace gratis.

Los estudios de campo sobre estaciones base son consistentes en la magnitud del efecto. Una investigación en Guangzhou midió alrededor de un **49 % de ahorro energético** con tecnología de ventilación, con repago inferior a dos años. Los rangos publicados para distintos climas van del 60 al 90 % del consumo del equipo de aire, según latitud y estación. Y hay un dato que interesa tanto o más que el ahorro: un ensayo de campo estimó que la incorporación de ventilación libre eliminó del orden de **16.000 ciclos de compresor por año**. Eso no es energía, es vida útil.

Las contras existen y hay que ponerlas sobre la mesa. La ventilación libre introduce aire exterior al recinto, con lo que trae consigo polvo, humedad y, en ambientes industriales, contaminantes. En un sitio con polvo conductivo o atmósfera corrosiva, la filtración necesaria puede volver la solución poco práctica. Y en los meses de verano, que es cuando el equipo de aire se dimensiona, el aporte de la ventilación libre es nulo: no reduce la capacidad instalada, reduce las horas que esa capacidad trabaja.

## Lo que deja la experiencia

El balance térmico de un shelter es un cálculo sencillo apoyado sobre un dato difícil. La parte que se aprende en cualquier manual —transmitancias, salto térmico, ganancia solar— se resuelve en una planilla. La parte que decide el resultado es cuánto calor entrega realmente el equipamiento, y ese número vive del lado del que va a operar el shelter, no del lado del que lo fabrica.

Cuando el dato existe, el cálculo es directo. Cuando no existe —y muchas veces no existe todavía, porque el equipamiento se define después que el recinto— la salida no es adivinar: es dimensionar sobre una hipótesis explícita, dejarla escrita, y decir sobre qué carga se calculó el equipo. Una hipótesis declarada se puede revisar cuando el dato aparece. Una hipótesis implícita se descubre el primer día de calor.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Puede complementarse con el [balance térmico de un shelter para operar a +45 °C](/blog/balance-termico-de-un-shelter-como-dimensionar-el-aire-acondicionado-para-operar-a-45-c/) y con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).*

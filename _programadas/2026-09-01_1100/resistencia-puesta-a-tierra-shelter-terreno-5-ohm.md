---
title: "Resistencia de puesta a tierra: qué hacer cuando el terreno no baja de 5 Ω"
description: "Dos objetivos distintos sobre el mismo electrodo, por qué la resistividad del terreno decide si el valor es alcanzable, y por qué la red equipotencial pesa más que el número de ohms."
date: "2026-09-01"
author: "Ing. Hernán Soto Escalante"
image: "/blog/resistencia-puesta-a-tierra-shelter-terreno-5-ohm/portada.jpg"
category: "TBex"
tags: ["puesta a tierra", "shelters", "resistividad del terreno", "AEA 90364", "ITU-T K.27", "equipotencialidad"]
---

Cuando se especifica la puesta a tierra de un shelter aparece un valor objetivo, casi siempre 5 Ω, y la conversación se concentra en si se alcanza o no. Es una discusión razonable, pero incompleta: sobre ese mismo electrodo conviven dos objetivos técnicos que no piden lo mismo, y el número solo tiene sentido cuando se sabe cuál de los dos se está persiguiendo.

## Dos objetivos sobre el mismo electrodo

El primero es la **protección de las personas**. Ante una falla de aislación, la puesta a tierra tiene que permitir que la protección actúe y limitar la tensión de contacto durante el tiempo que tarde en hacerlo. Ese objetivo está reglamentado.

En Argentina, la **AEA 90364-7-771** —la reglamentación para instalaciones eléctricas en inmuebles— fija en su subcláusula **771.3.3.1** un valor máximo de **40 Ω** para la resistencia de puesta a tierra de protección, acompañado de una tabla con los valores admitidos según la corriente diferencial de la protección instalada. Vale la pena notar el recorrido: la edición anterior fijaba 10 Ω y la vigente lo llevó a 40. No es un relajamiento arbitrario. Con protección diferencial de alta sensibilidad, la corriente necesaria para el disparo es tan baja que una resistencia mayor sigue garantizando la actuación y una tensión de contacto segura. El criterio se corrió del electrodo hacia la protección.

El segundo objetivo es **la referencia del sistema frente a sobretensiones**. Acá no se trata de que actúe una protección, sino de darle a una corriente de origen atmosférico o de maniobra un camino de baja impedancia hacia el terreno, para que no lo busque a través del equipamiento. Ese objetivo no está en el reglamento eléctrico de inmuebles: está en la práctica de infraestructura crítica.

La referencia del rubro es la **Motorola R56**, el estándar de instalación para sitios de comunicaciones, que fija un objetivo de **5 Ω o menos** para sitios de telecomunicaciones e industriales. Es el mismo valor que aparece en la mayoría de las especificaciones de shelters.

No son valores contradictorios ni uno corrige al otro: **son dos problemas distintos resueltos sobre el mismo conductor enterrado**. Un shelter puede cumplir holgadamente el reglamento eléctrico y estar muy lejos de lo que necesita el equipamiento que aloja. Las dos cosas pueden ser ciertas al mismo tiempo.

## Lo que decide si 5 Ω es alcanzable

La resistencia de un sistema de puesta a tierra no la define el electrodo: la define el terreno. El electrodo es apenas la interfaz.

La variable de entrada es la **resistividad del terreno**, ρ, medida en ohm·metro, y su rango es enorme:

| Terreno | Orden de magnitud de ρ |
|---|---|
| Arcilla saturada | Menos de 10 Ω·m |
| Suelos agrícolas húmedos | Decenas de Ω·m |
| Arenas y gravas | Cientos de Ω·m |
| Roca seca, granito | Más de 10.000 Ω·m |

Tres órdenes de magnitud entre un extremo y el otro. La misma jabalina, con la misma longitud y el mismo diámetro, da valores completamente distintos según dónde se clave. Por eso el dato de la localidad exacta de emplazamiento no es un dato administrativo: es un dato de cálculo.

### La medición

El método de referencia es el **ensayo de Wenner de cuatro picas**. Cuatro electrodos auxiliares se clavan alineados y equiespaciados una distancia *a*; se inyecta corriente entre los dos exteriores y se mide la tensión entre los dos interiores. La resistividad aparente resulta de ρ = 2·π·a·R, donde R es la relación entre la tensión medida y la corriente inyectada.

Lo importante del método es que la separación entre picas determina la profundidad que se está explorando: separaciones chicas leen las capas superficiales, separaciones grandes leen el terreno profundo. Un solo ensayo con una única separación no describe el sitio; describe una capa. Y como la humedad superficial varía con la estación, la medición hecha en la época húmeda del año puede mostrar un terreno que en verano no existe.

## Cuando el terreno no colabora

Por encima del orden de los **500 Ω·m** el valor objetivo deja de ser alcanzable con una configuración convencional de jabalinas, y hay que decidir por dónde se va a resolver. Las salidas son conocidas y cada una tiene su costo:

**Más electrodo.** Aumentar la cantidad de jabalinas, separarlas al menos su propia longitud para que no se apantallen entre sí, o pasar a electrodos más profundos que alcancen capas de menor resistividad. Es la salida más directa y la que más superficie de terreno consume.

**Contrapesos y radiales.** Conductores enterrados horizontalmente, que en terrenos de alta resistividad suelen rendir mejor que las jabalinas verticales porque desarrollan mucha más superficie de contacto en las capas superficiales.

**Mejorador de terreno.** Bentonita o compuestos químicos que envuelven el conductor y reducen la resistividad en la zona inmediata al electrodo. Funciona, pero conviene entender qué hace: no baja la resistividad del terreno, crea un anillo de baja resistividad alrededor del conductor dentro de un terreno que sigue siendo malo. El sistema se comporta como un compuesto, y su rendimiento depende de la geometría de la zona tratada. Además, la bentonita necesita humedad para conservar sus propiedades; en terrenos que se secan por completo, el efecto se degrada.

La decisión entre estas alternativas no es del que fabrica el shelter: es de obra civil y depende del terreno real del sitio. Lo que sí corresponde definir de antemano es cómo se vincula el shelter con lo que la obra ejecute, y ese punto se resuelve con la barra equipotencial y el borne de conexión, no con el valor de resistencia.

## El eje que suele quedar en segundo plano

Hay un aspecto de la puesta a tierra que decide más sobre la supervivencia del equipamiento que el valor absoluto de resistencia, y recibe mucha menos atención: **la red de equipotencialidad interna**.

La **ITU-T K.27**, que es la recomendación específica para conexiones equipotenciales y puesta a tierra dentro de un edificio de telecomunicaciones, define las configuraciones posibles. La red común de equipotencialidad (CBN) es la malla conductora principal del edificio, a la que se vinculan estructuras, bandejas, gabinetes y pantallas. La malla extendida (mesh-BN) amplía ese concepto vinculando cada rack en múltiples puntos. La red aislada (IBN) separa un bloque del resto salvo por un único punto de conexión.

El principio que atraviesa la recomendación es que las redes densamente interconectadas, con múltiples conductores y uniones de baja impedancia, mejoran el apantallamiento, reducen el acoplamiento de sobretensiones y bajan las emisiones radiadas. Las uniones soldadas o engarzadas dan mejor comportamiento electromagnético que las atornilladas.

La consecuencia práctica es directa: durante una descarga, lo que daña el equipamiento no es que el terreno esté a un potencial elevado —eso ocurre siempre— sino que **dos puntos del equipamiento estén a potenciales distintos entre sí**. Un shelter con una malla interna bien resuelta sube y baja de potencial como un bloque, y el equipamiento no ve diferencia. Un shelter con 5 Ω medidos y una equipotencialidad pobre puede perder equipos igual.

Por eso el orden de prioridades, cuando el terreno no colabora, no es evidente. Gastar el presupuesto en bajar de 12 a 5 Ω puede rendir menos que gastarlo en una barra equipotencial de cobre bien dimensionada, con todos los bastidores, bandejas y pantallas vinculados a ella, y con la coordinación de descargadores correctamente resuelta aguas arriba —un tema que tratamos aparte en [la coordinación de SPD Clase I y II](/blog/spd-clase-i-y-ii-en-shelters-la-coordinacion-que-evita-perder-los-equipos/).

## Lo que deja la experiencia

Los 5 Ω son un objetivo de proyecto razonable y conviene sostenerlo. Pero es un objetivo que depende de un terreno que casi nunca se midió al momento de especificar, y comprometerlo antes de conocer la resistividad del sitio es comprometer algo que no está en manos de nadie garantizar.

Lo que sí se puede definir sin conocer el terreno es todo lo demás: la barra equipotencial, la sección de los conductores, el criterio de unión, qué se vincula y en cuántos puntos, y el borne por donde el shelter se conecta a la malla que ejecute la obra. Eso es lo que viaja con la caja y es lo que va a determinar cómo se comporta el equipamiento el día de la tormenta.

El valor de resistencia se verifica en sitio, con el terreno adelante y el medidor en la mano. Antes de eso es una hipótesis, y conviene tratarla como tal.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con [la coordinación de SPD Clase I y II en shelters](/blog/spd-clase-i-y-ii-en-shelters-la-coordinacion-que-evita-perder-los-equipos/) y con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).*

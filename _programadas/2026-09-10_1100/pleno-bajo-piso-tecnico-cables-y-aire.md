---
title: "El pleno bajo piso técnico: canalización de cables y distribución de aire en el mismo espacio"
description: "Qué ocurre cuando el espacio bajo el piso registrable se pide simultáneamente como cámara de impulsión y como canalización principal, y cómo se resuelve la incompatibilidad."
date: "2026-09-10"
author: "Ing. Hernán Soto Escalante"
image: "/blog/pleno-bajo-piso-tecnico-cables-y-aire/portada.jpg"
category: "TBex"
tags: ["piso técnico", "shelters", "climatización", "canalizaciones", "sala técnica", "distribución de aire"]
---

El piso técnico registrable resuelve dos problemas a la vez y por eso se especifica casi siempre. Debajo de las baldosas queda un espacio libre que sirve para llevar cables de energía, datos y fibra sin verlos, y que sirve también como cámara de impulsión para climatizar desde abajo hacia los equipos.

Sirve para las dos cosas. Lo que no siempre se advierte es que no sirve para las dos cosas al mismo tiempo.

## Qué es cada uno de los dos usos

**Como canalización**, el pleno es un espacio de paso. Se lo llena de bandejas, se lo recorre con cables, y su altura se define por el volumen de conductores que tiene que alojar más el espacio de maniobra para tenderlos y mantenerlos. Cuanto más ocupado esté, mejor cumple su función.

**Como cámara de impulsión**, el pleno es un conducto. El equipo de climatización descarga aire ahí adentro, el aire se presuriza, se distribuye horizontalmente y sale por las baldosas perforadas ubicadas frente a los equipos. Su altura se define por la pérdida de carga admisible y su desempeño depende de que el aire circule libre y de que la caja esté sellada.

Los dos usos piden lo contrario del mismo volumen.

## Por qué la incompatibilidad es física

Un pleno de impulsión funciona por presión estática. El equipo lo presuriza, y esa presión es lo que empuja el aire hacia arriba a través de cada baldosa perforada, de manera razonablemente pareja en toda la superficie. Todo lo que interfiere con esa distribución degrada el sistema.

Las bandejas y los mazos de cables hacen exactamente eso: obstruyen secciones de paso, generan pérdidas de carga localizadas y crean zonas muertas donde el aire no llega. El resultado no es una reducción proporcional del caudal: es una distribución despareja, con baldosas que entregan de más y baldosas que no entregan nada. Y como las que no entregan suelen ser las más alejadas del equipo, los puntos calientes aparecen justamente donde menos se los espera.

Hay además un segundo efecto, menos evidente y más costoso. Un pleno de impulsión tiene que ser **estanco**. La investigación sobre centros de datos publicada por ASHRAE ubica en hasta un **30 % la proporción de aire acondicionado que se pierde por sellado deficiente del pleno**. Cada pasamuros de cable sin sellar, cada baldosa mal asentada por el paso de un mazo, cada abertura de registro es una fuga. Un pleno pensado para cables tiene decenas de penetraciones; un pleno pensado para aire trata cada penetración como un defecto.

## La escala agrava el problema en un shelter

En un centro de datos convencional el pleno técnico se resuelve con alturas del orden de 600 a 900 mm. Con ese volumen, todavía hay margen para convivir: las bandejas ocupan una fracción de la sección y el aire encuentra camino.

En un recinto tipo shelter la altura útil bajo piso rara vez supera los 200 a 400 mm, porque cada milímetro sale de la altura interior libre, que a su vez sale del gálibo de transporte. Con esa altura, un par de bandejas cargadas no reducen la sección de paso: la ocupan. La convivencia deja de ser una cuestión de grado y pasa a ser una decisión excluyente.

## Cómo se resuelve

La salida es definir para qué es el pleno y mandar la otra función arriba.

**Si el pleno es de cables**, la climatización trabaja por impulsión y retorno en el ambiente, con las unidades interiores montadas en alto y la distribución resuelta por el propio movimiento del aire en el recinto. Es la configuración habitual en shelters de interconexión y en salas técnicas chicas, donde la carga térmica está concentrada en pocos equipos y no hace falta una distribución fina.

**Si el pleno es de aire**, las canalizaciones se resuelven con bandeja superior, por encima de los racks. Esta alternativa suele generar resistencia porque se percibe como menos prolija, pero tiene ventajas que conviene poner sobre la mesa: la bandeja superior es accesible sin levantar piso, permite ver el estado del cableado de un vistazo, y no compromete la estanqueidad del pleno.

Hay una tercera vía, que es dividir el pleno en zonas: un sector sellado para impulsión y otro para canalización, separados por tabiques. Funciona, pero exige que el layout esté congelado desde el principio, porque la separación es física. En recintos que van a crecer o cambiar, esa rigidez se paga.

## El detalle que decide si el piso es realmente registrable

Un piso técnico se llama registrable porque las baldosas se levantan. Vale la pena verificar que se puedan levantar de verdad.

Una baldosa bajo un rack cargado no se levanta. Una baldosa atravesada por el mazo de cables que sube a ese rack tampoco, o se levanta rompiendo algo. En la práctica, el porcentaje realmente registrable de un piso técnico en un recinto compacto es mucho menor al 100 % nominal, y ese porcentaje se define en el layout, no en la especificación del piso.

Cuando se dibuja la distribución conviene marcar qué baldosas van a quedar accesibles y verificar que por ahí pase lo que efectivamente se va a necesitar tocar durante la vida del recinto.

## Lo que deja la experiencia

La pregunta correcta frente a un piso técnico no es qué altura tiene, sino qué se le pide al espacio de abajo. De esa respuesta se derivan la altura, la estanqueidad, la tipología de climatización, la ubicación de las unidades interiores y si hace falta o no bandeja superior. Son decisiones encadenadas: no se pueden tomar de a una.

Cuando la especificación pide las dos funciones simultáneamente, no hay una solución que las cumpla bien a las dos. Hay una que las cumple a medias, y en general falla del lado térmico, que es el lado donde la falla se nota tarde y en verano.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con el [balance térmico de un shelter para operar a +45 °C](/blog/balance-termico-de-un-shelter-como-dimensionar-el-aire-acondicionado-para-operar-a-45-c/) y con la [guía técnica de diseño, climatización y protección](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).*

---
title: "Redundancia N+1 en la climatización de un shelter sin personal permanente"
description: "Dos equipos de aire en un shelter no garantizan nada por sí solos. Qué significa N+1, cómo alternan, cuánto tarda el recinto en calentarse y dónde se pierde."
date: "2026-10-29"
author: "Ing. Hernán Soto Escalante"
image: "/blog/redundancia-n-mas-1-climatizacion-shelter/portada.jpg"
category: "TBex"
tags: ["redundancia N+1", "climatización", "shelters", "sitios remotos", "free cooling", "infraestructura crítica"]
---

La mayoría de las especificaciones de shelters para equipamiento crítico piden climatización redundante. Casi siempre se resuelve con dos equipos de aire acondicionado montados en la pared, uno al lado del otro. Y casi siempre, mirando desde afuera, parece suficiente.

Lo es si se cumplen algunas condiciones que no se ven en la fachada. Cuando el sitio no tiene personal y el técnico más cercano está a horas de viaje, esas condiciones son las que deciden si una falla queda en una alarma o termina en equipos apagados.

## Qué significa N+1

N es la cantidad de equipos que hace falta para cubrir la carga térmica. N+1 es esa cantidad más uno de reserva. En un shelter chico, donde un solo equipo alcanza, N+1 se convierte en 1+1: dos equipos, cada uno capaz de mantener el recinto solo.

Esa última condición es la que se pierde con más facilidad. El manual de un controlador de alternancia de uso corriente en estos recintos lo dice de forma literal: si se busca un 100 % de redundancia, cada equipo debe dimensionarse para la carga total de la estructura. Dos equipos que juntos cubren la carga, pero no por separado, no son redundantes: son un equipo partido en dos.

Y hay una distinción de fondo. Redundancia de capacidad no es lo mismo que redundancia de componentes. Dos equipos de aire con un solo controlador, un solo circuito eléctrico o un solo sensor tienen un punto único de falla en otro lado.

## Cómo trabajan los dos equipos

En un sistema 1+1 bien resuelto, los equipos no funcionan los dos todo el tiempo ni uno siempre y el otro nunca. Un controlador los alterna.

| Función | Cómo la resuelve un controlador de uso corriente |
|---|---|
| Alternancia | Cambia el equipo principal cada 7 días por defecto, configurable de 1 a 30, para repartir el desgaste |
| Escalonamiento | Arranca el principal; si la temperatura sube unos 2 °C sobre la consigna, entra el segundo |
| Temperaturas extremas | Los dos compresores quedan en marcha a la vez |
| Free cooling | Si el aire exterior sirve, la primera etapa usa aire exterior antes que el compresor |
| Alarmas | Temperatura alta en dos niveles, falla de cada equipo, pérdida de energía de cada uno, falla del propio controlador |

La alternancia tiene una razón práctica que se entiende con el tiempo: un equipo de reserva que nunca arranca es un equipo del que no se sabe si va a arrancar. Hacerlo trabajar una semana de cada dos lo mantiene probado.

## Cuánto aguanta el recinto sin frío

La pregunta que define la redundancia es cuánto tiempo pasa entre que se corta toda la climatización y que los equipos llegan a su límite de temperatura.

Una patente de un fabricante de envolventes para telecomunicaciones lo estima para un shelter convencional: según las condiciones exteriores, el tiempo hasta el corte por sobretemperatura es corto, del orden de **20 minutos a una hora**.

Una cuenta simple confirma el orden. Un shelter de 3 por 2,4 m con 5 kW de equipamiento tiene unos 19 m³ de aire. Si solo se calentara el aire, la temperatura subiría más de diez grados por minuto. Lo que la frena es la masa del recinto: racks, estructura y, sobre todo, las baterías. Con una masa térmica efectiva de una tonelada y media, la subida es del orden de 0,4 °C por minuto, y de 25 a 40 °C pasan unos 40 minutos. Es una estimación ilustrativa, sin contar el sol sobre la envolvente, que acorta ese tiempo.

¿Y dónde está el límite? Depende de qué se proteja:

| Referencia | Rango de temperatura |
|---|---|
| Equipos de telecomunicaciones en local climatizado (ETSI, clase 3.1) | De +5 a +40 °C |
| Operación de corta duración según la norma de Telcordia | Hasta 50 °C, por no más de 96 horas seguidas |
| Equipos de tecnología de la información, rango recomendado (ASHRAE) | De 18 a 27 °C |
| Baterías de plomo-ácido | Referencia de 25 °C; la vida útil se reduce a la mitad por cada 8 a 10 °C de más |

Las 96 horas de la norma de Telcordia tienen sentido: son la ventana para que llegue la reparación. Pero las baterías no tienen ese margen. Una hora a 40 °C no las destruye, pero cada exceso se cobra en vida útil, y por eso en muchos shelters son las baterías las que fijan la consigna.

## Lo que significa "sin personal permanente"

Con 20 a 60 minutos de autonomía térmica, y un sitio a horas de viaje, la cuenta es simple: la redundancia tiene que resolver la falla sola. El técnico llega después, a reparar, no a salvar.

La experiencia de los operadores de telecomunicaciones lo describe bien. Una empresa norteamericana con sitios a más de 160 kilómetros, a tres o cuatro horas de manejo y a veces inaccesibles por la nieve, terminó haciendo funcionar sus grupos electrógenos de respaldo en forma continua porque no recibía las alarmas a tiempo.

Por eso el monitoreo remoto es parte de la redundancia, no un agregado. Y con un detalle: si todas las alarmas salen por un solo contacto, desde el centro de operaciones se sabe que algo pasó, pero no qué. La alarma de "equipo 1 en falla" y la de "temperatura alta" piden respuestas distintas.

## Donde se pierde la redundancia

La redundancia de dos equipos se puede perder entera por un elemento compartido:

| Elemento compartido | Qué pasa |
|---|---|
| El mismo circuito eléctrico o el mismo tablero | Un disparo apaga los dos equipos a la vez |
| El mismo controlador | Los buenos controladores tienen alarma de falla propia y siguen alimentados si uno de los equipos pierde energía |
| El mismo sensor de temperatura | Los controladores de mejor nivel tienen un sensor de respaldo que toma el control si el principal da lecturas absurdas |
| El contacto de incendio | Apaga los dos equipos de inmediato, por diseño: es correcto, pero es una vía por la que se pierde todo el frío |
| El corte de energía de red | Si el aire depende de la red y del grupo, un corte prolongado deja el recinto sin frío aunque haya baterías |

El último renglón tiene una respuesta propia de las telecomunicaciones: la **ventilación de emergencia en corriente continua**. Alimentar los equipos de aire desde las baterías requeriría bancos enormes; en cambio, un ventilador o un damper de aire exterior de 48 V consume poco —del orden de 100 W para mover 1.000 m³/h— y mantiene el recinto ventilado mientras dura el corte. No enfría como un compresor, pero gana tiempo.

## El free cooling como tercera línea

El aire exterior, cuando está más frío que el interior, puede refrigerar el shelter sin compresor. Además de ahorrar energía —un estudio experimental en una radiobase de Brasil midió un 26 % menos de consumo mensual, y un modelo validado en Italia, entre 10 y 30 % anual—, es una forma de redundancia parcial: cuando falla la refrigeración mecánica, el damper abierto sigue sacando calor.

Su límite es el clima. En una noche de invierno alcanza de sobra; en una siesta de verano a 40 °C no sirve. Y exige filtración, porque el aire que entra trae polvo y humedad.

## Lo que deja la experiencia

Dos equipos de aire en la pared son el comienzo de la redundancia, no la redundancia. Lo que la completa no se ve desde afuera: que cada equipo pueda solo, que alternen, que no compartan circuito ni controlador sin respaldo, que las alarmas lleguen separadas, y que haya una ventilación que funcione aunque se corte la red.

En un sitio sin personal, la pregunta útil no es cuántos equipos hay. Es qué pasa en los cuarenta minutos que siguen a la falla de uno, y quién se entera.

---

*Este apunte forma parte de la serie técnica sobre shelters y recintos para equipamiento crítico. Se complementa con [disipación interna de los equipos](/blog/disipacion-interna-equipos-aire-acondicionado-shelter/) y con la [ventilación del recinto de baterías](/blog/ventilacion-recinto-baterias-hidrogeno-renovaciones/).*

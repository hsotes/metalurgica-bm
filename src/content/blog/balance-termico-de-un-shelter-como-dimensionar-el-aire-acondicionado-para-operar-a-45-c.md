---
title: "Balance Térmico de un Shelter: Cómo Dimensionar el Aire Acondicionado para Operar a +45 °C"
description: "Cómo calcular el balance térmico de un shelter de telecomunicaciones y dimensionar la climatización para operar con +45 °C exterior en LATAM."
date: "2026-05-26"
author: "Metalurgica Boto Mariani"
image: "/blog/balance-termico-de-un-shelter-como-dimensionar-el-aire-acondicionado-para-operar-a-45-c-1779799714564.jpg"
category: "TBex"
tags: ["balance térmico shelter", "climatización shelter telecomunicaciones", "dimensionamiento aire acondicionado shelter", "shelter +45 grados", "ETSI EN 300 019", "panel sándwich lana de roca", "transmitancia térmica U panel", "ventilación de emergencia shelter", "carga térmica equipos críticos", "infraestructura modular LATAM"]
---

# Balance Térmico de un Shelter: Cómo Dimensionar el Aire Acondicionado para Operar a +45 °C

En la mayoría de los pliegos de licitación que llegan a la industria de fabricación de shelters de telecomunicaciones, la especificación de climatización aparece de manera genérica: *"aire acondicionado industrial de operación 24/7, capaz de operar con temperatura exterior de +45 °C"*. La frase tiene un problema serio: **no menciona la potencia frigorífica requerida**. Y la potencia frigorífica no se elige por catálogo — se calcula a partir del balance térmico del shelter.

Cuando ese cálculo no se hace, ocurre uno de dos escenarios. En el primero, el integrador especifica un equipo subdimensionado — habitualmente un split residencial de 12.000 o 18.000 BTU/h — que opera al 100 % de su capacidad de manera permanente, con compresor sobreexigido, ciclos cortos y vida útil de 18 a 30 meses en lugar de los 10-15 años esperados. En el segundo, sobredimensiona "por las dudas" instalando un equipo de 36.000 BTU/h donde alcanzaba uno de 18.000, generando ciclos de encendido/apagado demasiado frecuentes, problemas de humedad por baja deshumidificación y costo energético innecesario.

Este artículo desarrolla, paso a paso, el cálculo del balance térmico de un shelter típico y la metodología para seleccionar la climatización con criterio de ingeniería.

---

## 1. La ecuación de base

El principio físico es simple: en estado estacionario, el calor que se extrae del shelter debe igualar al calor que ingresa o se genera en su interior. Cuando esa igualdad no se cumple, la temperatura interna sube hasta encontrar un nuevo equilibrio — habitualmente muy por encima del rango de operación de los equipos.

**Q_extraer = Q_equipos + Q_conducción + Q_radiación + Q_ventilación**

| Término | Origen del calor |
|---|---|
| **Q_equipos** | Disipación interna de UPS, racks, baterías, iluminación |
| **Q_conducción** | Calor que atraviesa la envolvente por diferencia de temperatura interior-exterior |
| **Q_radiación** | Aporte solar absorbido por la envolvente expuesta |
| **Q_ventilación** | Calor que ingresa con el aire fresco (en shelters críticos suele despreciarse: son herméticos) |

---

## 2. Datos de partida para el ejemplo

Consideremos un shelter típico para alojar equipamiento de telecomunicaciones de un nodo intermedio:

| Parámetro | Valor |
|---|---|
| Dimensiones interiores | 6,0 × 2,4 × 2,8 m (largo × ancho × alto) |
| Superficie envolvente expuesta | 2 paredes largas + 2 paredes cortas + techo = ≈ 61 m² |
| Aislación | Panel sándwich con núcleo de lana de roca, 50 mm de espesor |
| Conductividad térmica de la lana de roca | λ = 0,040 W/m·K |
| Transmitancia U del panel | ≈ 0,75 W/m²·K (incluyendo resistencias superficiales) |
| Temperatura exterior de diseño | +45 °C (zona Chaco, Norte argentino, valles cordilleranos) |
| Temperatura interior objetivo | +25 °C (clase 3.1 de ETSI EN 300 019-1-3) |
| ΔT | 20 °C |
| Disipación interna de equipos | 2.500 W (especificada por el cliente) |
| Coeficiente solar estimado | +15 % sobre la conducción |

---

## 3. Cálculo paso a paso

### 3.1. Calor por conducción a través de la envolvente

Aplicamos Q = U · A · ΔT:

| Variable | Valor | Unidad |
|---|---|---|
| U | 0,75 | W/m²·K |
| A | 61 | m² |
| ΔT | 20 | K |
| **Q_conducción** | **0,75 × 61 × 20 = 915** | **W** |

### 3.2. Calor por radiación solar

La radiación solar sobre la envolvente añade aproximadamente un 15 a 25 % al término de conducción en zonas de alta insolación, dependiendo de la orientación del shelter, el color exterior y la presencia de un techo radiante. Usando una estimación conservadora del 20 %:

**Q_radiación ≈ 0,20 × 915 ≈ 180 W**

Para reducir este aporte, las prácticas de diseño documentadas incluyen pintura blanca exterior con alta reflectancia solar (SR ≥ 0,75), doble techo ventilado tipo "techo a la sombra" — que crea una cámara de aire entre la cubierta y el panel sándwich y reduce la transmitancia efectiva — y orientación del shelter con la cara más larga al norte (en hemisferio sur) para minimizar la fachada expuesta a la insolación pico.

### 3.3. Calor disipado por equipos internos

Es el dato que el cliente debe aportar. Cada equipo electrónico tiene una placa o ficha técnica donde declara su consumo en watts; ese valor se convierte íntegramente en calor disipado.

| Equipo | Consumo declarado |
|---|---|
| UPS 3 kVA on-line | ~300 W (pérdidas; el resto entrega a la carga) |
| Carga útil: switches, routers, radios | 1.800 W |
| Iluminación LED interior | 80 W |
| Misceláneos (sensores, controladores) | 70 W |
| Baterías en carga de flotación | 50 W |
| Cargas anexas | 200 W |
| **Q_equipos total** | **≈ 2.500 W** |

### 3.4. Sumatoria y factor de seguridad

| Componente | Aporte |
|---|---|
| Q_conducción | 915 W |
| Q_radiación | 180 W |
| Q_equipos | 2.500 W |
| **Subtotal** | **3.595 W** |
| Factor de seguridad +25 % | 900 W |
| **Q_total dimensionante** | **≈ 4.495 W ≈ 15.350 BTU/h** |

---

## 4. Elección del equipo

Con un Q_total dimensionante de ~4,5 kW (~15.350 BTU/h), el equipo de climatización razonable es un **split de 18.000 BTU/h con compresor inverter, certificado para operar a temperaturas exteriores hasta +52 °C**. Tres consideraciones críticas al especificar:

| Criterio | Por qué importa |
|---|---|
| **Compresor inverter** | Modula la velocidad según la carga real. Reduce ciclos de arranque, baja el consumo eléctrico y prolonga la vida útil del compresor |
| **Refrigerante R410A o R32** | R22 está fuera de norma. R32 tiene menor potencial de calentamiento global y mejor performance a alta temperatura ambiente |
| **Rango exterior certificado** | Equipos residenciales típicos están certificados hasta +40-43 °C. Para shelters en zona Chaco o valles cordilleranos hay que verificar específicamente operación a +45 °C o +50 °C |
| **Protección IP en condensadora** | La unidad condensadora exterior debe ser IP24 mínimo. En zonas costeras o industriales, IP44 o IP55 |

---

## 5. La estrategia de redundancia N+1

Un equipo de climatización solo es un punto único de falla. En shelters críticos, la práctica internacional dominante es la configuración **N+1**: dos equipos del mismo tipo, cada uno dimensionado para cubrir el 100 % de la carga, controlados por un controlador inteligente que los rota.

| Ventaja de N+1 | Implicancia operativa |
|---|---|
| Tolerancia a falla de un equipo | El segundo asume la totalidad sin interrupción de servicio |
| Rotación de horas de uso | Ambos compresores se desgastan parejos; se evita el escenario "uno opera 8 años, el otro arranca para fallar al mes" |
| Mantenimiento sin corte | Permite intervenir un equipo mientras el otro mantiene el ambiente |
| Capacidad de overflow | Ante carga térmica extrema (día de +50 °C con sol pleno), pueden operar ambos simultáneamente |

---

## 6. La ventilación de emergencia: el sistema que muchos olvidan

Aún con N+1, existe el escenario de **doble falla simultánea**: corte de energía + UPS agotado + climatización fuera de servicio. Para ese caso límite, el shelter debe contar con un sistema de ventilación pasiva-asistida que se active automáticamente si la temperatura interna supera un umbral (típicamente +40 °C):

- Extractor termostático de chapa galvanizada con motor IP55, accionado por sensor.
- Rejillas de admisión con filtros y persianas anti-retorno.
- Alimentado desde el banco de baterías del UPS, separado del consumo principal.

Este sistema no reemplaza al aire acondicionado — la temperatura interna en ese modo puede llegar a equilibrar la exterior — pero **previene escenarios catastróficos** de embalamiento térmico de baterías o de daño irreversible a equipos electrónicos sensibles, dando margen al equipo de mantenimiento para arribar al sitio.

---

## 7. Diagrama orientativo de elección

A modo de resumen, los rangos típicos de selección según disipación interna y temperatura exterior de diseño:

| Disipación interna | Tamb 35 °C | Tamb 40 °C | Tamb 45 °C |
|---|---|---|---|
| 1,0 kW | 9.000 BTU/h | 12.000 BTU/h | 12.000-18.000 BTU/h |
| 2,5 kW | 12.000-18.000 BTU/h | 18.000 BTU/h | 18.000-24.000 BTU/h |
| 5,0 kW | 24.000 BTU/h | 24.000-30.000 BTU/h | 30.000-36.000 BTU/h |
| 8,0 kW | 36.000 BTU/h | 36.000-48.000 BTU/h | 48.000-60.000 BTU/h |
| 12,0 kW | 48.000-60.000 BTU/h | 60.000 BTU/h | 60.000 BTU/h (o 2× 36k) |

Los valores son orientativos y deben verificarse con el cálculo específico de cada proyecto. Asumen panel sándwich de 50 mm de lana de roca, factor solar moderado y factor de seguridad +25 %.

---

## 8. Cierre

Un shelter cuya climatización está correctamente dimensionada es invisible: opera durante años sin que nadie deba volver al sitio a "ver qué pasa con el aire". Cuando, en cambio, se elige un equipo por catálogo sin balance térmico previo, el shelter se convierte en una fuente de tickets de mantenimiento, fallas de equipos por temperatura y disputas comerciales sobre alcance del proveedor.

El cálculo expuesto no requiere herramientas sofisticadas — una planilla de cálculo basta — pero sí exige tres datos del cliente: la disipación real de equipos, la temperatura exterior de diseño del sitio y la temperatura interior objetivo. Sin esos tres datos no hay balance térmico posible.

Para más contexto sobre el diseño integral del shelter, las normas aplicables y los demás sistemas (energía, protecciones, logística), puede consultarse la [guía técnica completa sobre shelters modulares para equipos críticos](/blog/shelters-modulares-equipos-criticos-guia-tecnica/).

Cuando una integradora o un proyectista necesita verificar un balance térmico, comparar ofertas de climatización o especificar la configuración correcta para un sitio en particular, el equipo de ingeniería de Metalúrgica Boto Mariani está disponible para apoyar el análisis técnico.

Autor Ing. Sebastian Boto Mariani

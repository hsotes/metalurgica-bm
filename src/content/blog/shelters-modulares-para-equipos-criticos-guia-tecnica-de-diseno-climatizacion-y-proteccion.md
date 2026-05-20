---
title: "Shelters Modulares para Equipos Críticos: Guía Técnica de Diseño, Climatización y Protección"
description: "Guía técnica integral sobre shelters modulares metálicos para alojar equipos críticos. Diseño, normativa ETSI e IEC, balance térmico, UPS, protección contra rayos y logística en LATAM."
date: "2026-05-20"
author: "Metalurgica Boto Mariani"
image: "/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion-1779286925540.jpg"
category: "Estructuras"
tags: ["shelter modular metálico", "shelter equipos críticos", "shelter telecomunicaciones", "cabina técnica prefabricada", "shelter outdoor IP55", "ETSI EN 300 019", "IEC 62305 protección rayos", "balance térmico shelter", "UPS shelter telecomunicaciones", "shelter corredor vial", "shelter ITS sistemas inteligentes transporte", "infraestructura modular LATAM"]
---

# Shelters Modulares para Equipos Críticos: Guía Técnica de Diseño, Climatización y Protección

Cuando un operador de red, una concesionaria vial o una integradora tecnológica necesita desplegar equipos electrónicos sensibles en un sitio remoto — una banquina de ruta, una loma sin tendido eléctrico, una planta industrial, un nodo de fibra óptica — la pregunta técnica que define el éxito del proyecto rara vez aparece en el pliego inicial: **¿cómo se garantiza que esos equipos sigan operando los próximos 15 a 20 años, sin asistencia humana frecuente, expuestos al clima, al polvo, al viento, a las descargas atmosféricas y a la variabilidad de la red eléctrica?**

La respuesta, en la mayoría de los casos, es un **shelter modular**: una envolvente prefabricada metálica, transportable, diseñada para alojar el equipamiento crítico en un entorno controlado. Aunque el concepto suena simple, su diseño correcto involucra ingeniería estructural, térmica, eléctrica y logística. Una decisión incorrecta en cualquiera de esas cuatro dimensiones se traduce, según diversos estudios del sector telecomunicaciones, en **costos de mantenimiento que pueden multiplicar por tres o cuatro el ahorro inicial obtenido en la compra**.

Este artículo desarrolla, con base en normativa internacional y en la experiencia documentada en proyectos desplegados en Argentina y Latinoamérica, los criterios técnicos que distinguen un shelter bien especificado de uno que llegará a obra sin cumplir su función.

---

## 1. ¿Qué es exactamente un shelter de equipos críticos?

Un **shelter** — del inglés *refugio* — es una construcción modular prefabricada, generalmente metálica, diseñada para alojar y proteger equipos electrónicos, eléctricos o de telecomunicaciones que deben operar de manera continua en ubicaciones donde no es viable instalar una construcción tradicional. El término se popularizó en la industria de las telecomunicaciones a partir de los años 80, cuando la expansión de las redes móviles obligó a desplegar estaciones base en sitios donde no había edificación previa.

A diferencia de una caseta tradicional de mampostería, el shelter presenta cuatro características que lo definen:

| Característica | Implicancia técnica |
|---|---|
| **Prefabricación completa** | Llega a obra terminado, con instalación eléctrica, climatización, piso, aislación y puerta. Reduce tiempos de obra de meses a horas |
| **Transportabilidad** | Se traslada en camión, se iza con grúa y se posiciona sobre fundación prearmada. Permite reubicaciones futuras |
| **Estanqueidad controlada** | Diseñado para grado de protección IP55 o superior según IEC 60529, mantiene el ambiente interior aislado de polvo, humedad e insectos |
| **Acondicionamiento interno** | Incluye climatización, iluminación, tomacorrientes, tablero eléctrico y barra de puesta a tierra dimensionados para el equipamiento que alojará |

Las aplicaciones más documentadas en LATAM incluyen estaciones base de telefonía móvil, nodos de fibra óptica, equipamiento de Sistemas Inteligentes de Transporte (ITS) en corredores viales, casetas de control para plantas fotovoltaicas y eólicas, salas técnicas para subestaciones eléctricas, equipamiento de monitoreo ambiental en sitios mineros u oil & gas, y centros de datos perimetrales (edge data centers) para aplicaciones de baja latencia.

---

## 2. Shelter walk-in vs gabinete outdoor: la decisión que define el proyecto

Una de las confusiones más frecuentes — y costosas — en las solicitudes de cotización es no distinguir entre un **shelter walk-in** (en el que una persona puede ingresar y trabajar de pie) y un **gabinete outdoor** (un armario sellado al que se accede desde el exterior abriendo puertas).

Ambos protegen equipos, ambos son metálicos, ambos pueden cumplir IP55. Pero el modo de uso, el costo, las dimensiones y la disipación térmica disponible son radicalmente distintos.

| Criterio | Gabinete outdoor | Shelter walk-in |
|---|---|---|
| **Acceso del técnico** | Desde el exterior, abriendo puerta o tapa | Ingresa al interior y trabaja de pie |
| **Volumen típico** | 0,2 a 2 m³ | 12 a 60 m³ (a partir de ~2,4 m de altura interior) |
| **Carga térmica admisible** | 200 W a ~2 kW con disipación pasiva o ventilación forzada | 2 a 20 kW con climatización por equipo de aire acondicionado |
| **Equipamiento que aloja** | 1 a 4 racks, baterías VRLA pequeñas, equipos compactos | Racks múltiples, UPS rackeables, bancos de baterías grandes, tableros de potencia |
| **Costo relativo** | Bajo a medio | Medio a alto |
| **Mantenimiento en condiciones adversas** | El técnico opera expuesto al clima | El técnico trabaja en ambiente climatizado |
| **Normativa de referencia** | ETSI EN 300 019-1-4 (clase 4.1E) | ETSI EN 300 019-1-3 (clase 3.1) para el ambiente interior |

La regla heurística que aplica la industria es directa: si la suma de la disipación térmica de los equipos supera **2-3 kW** o si el sitio requiere intervenciones técnicas frecuentes (más de una vez al mes), un shelter walk-in es más eficiente en costo total de propiedad (TCO) que un gabinete. Por el contrario, si se trata de un equipo único de bajo consumo (un nodo óptico pasivo, una unidad de medición, un repetidor de baja potencia), el gabinete outdoor es la solución correcta.

Existe abundante literatura técnica sobre [criterios térmicos y acústicos en gabinetes outdoor](/blog/disipacion-pasiva-calor-ruido-gabinetes-outdoor-telecom/) y sobre la [elección del material de la envolvente entre acero y aluminio](/blog/acero-vs-aluminio-gabinetes-outdoor-comparativa/) que aplica también, parcialmente, al shelter walk-in.

---

## 3. Las cinco cargas que definen el diseño estructural

Un shelter no se proyecta como un container. Aunque ambos comparten morfología (un prisma metálico transportable), la ingeniería estructural difiere porque el shelter debe responder a un escenario de cargas combinado que rara vez aparece en un container estándar.

### 3.1. Carga de viento

Es, en la mayoría de los proyectos LATAM, la carga gobernante. La normativa argentina **CIRSOC 102-2005** clasifica el territorio en zonas de velocidad básica de viento, con valores que en Patagonia pueden superar los 60 m/s (≈216 km/h) y en gran parte de la Pampa y la Mesopotamia se ubican entre 40 y 50 m/s. La normativa internacional equivalente (ASCE 7, Eurocódigo EN 1991-1-4) establece criterios similares.

Cuando un pliego solicita "resistencia al viento ≥180 km/h", se está exigiendo una velocidad básica de ráfaga (3 segundos) de ese orden, lo que implica:

- Verificación de vuelco del shelter sobre su base (factor de seguridad mínimo recomendado: 1,5).
- Verificación de deslizamiento del shelter sobre la fundación.
- Anclaje mecánico a fundación de hormigón o a base metálica pre-instalada.
- Verificación de las uniones soldadas y atornilladas del esqueleto estructural.
- Cálculo de presión de viento sobre los paneles laterales y la cubierta para evitar deformaciones.

### 3.2. Carga sísmica

En zonas sísmicamente activas — gran parte de la cordillera y precordillera andina — debe aplicarse la normativa **INPRES-CIRSOC 103** o sus equivalentes locales (NCh 433 en Chile, E.030 en Perú). El shelter debe verificarse a corte basal, distorsión angular y desplazamientos diferenciales.

### 3.3. Carga muerta y carga de equipos

Los equipos a alojar — racks de servidores, UPS, baterías, tableros — pueden representar entre 500 kg y 3.500 kg distribuidos en una superficie de 14 m². El piso técnico debe diseñarse para una carga de uso de **al menos 500 kg/m²** en zonas de tránsito y **hasta 2.000 kg/m²** puntual bajo equipos pesados (bancos de baterías).

### 3.4. Carga de transporte e izaje

Esta es la carga que más diferencia un buen diseño de uno mediocre. Durante el viaje en camión por rutas de mil o más kilómetros, el shelter sufre **aceleraciones longitudinales** (frenadas, arranques), **laterales** (curvas) y **verticales** (baches, lomas de burro) que superan, según mediciones publicadas en literatura técnica del sector, **±1,5 g en pico**. Adicionalmente, el izaje por grúa concentra toda la carga del shelter en cuatro puntos (orejas de izaje), generando esfuerzos que en una pieza mal diseñada provocan deformaciones permanentes.

La práctica recomendada es verificar el modelo estructural en tres condiciones independientes: izaje, transporte y servicio.

### 3.5. Cargas climáticas combinadas

Granizo (impactos puntuales sobre la cubierta), nieve acumulada (cargas en CABA son menores pero en cordillera pueden superar 200 kg/m²), radiación solar (ciclos térmicos diarios de 30 °C en zona patagónica o puna) y corrosión atmosférica (zonas costeras o industriales) deben considerarse en el cálculo y en la especificación de tratamientos superficiales.

---

## 4. Anatomía de un shelter bien diseñado

Una vez resuelto el dimensionado estructural, el shelter se compone de seis sistemas que deben especificarse con el mismo nivel de detalle.

### 4.1. Esqueleto estructural

Habitualmente realizado en perfilería de acero estructural — perfiles UPN, IPN, tubos estructurales rectangulares — soldado y luego **galvanizado en caliente por inmersión** (norma IRAM 252 o ASTM A123). El galvanizado en caliente, en espesores adecuados (mínimo 80 µm para condiciones atmosféricas industriales), provee una vida útil de 25 a 50 años antes de requerir mantenimiento.

### 4.2. Envolvente: panel sándwich

La envolvente moderna se resuelve con **paneles sándwich** de dos chapas metálicas pre-pintadas con núcleo aislante. Las opciones más documentadas son:

| Tipo de núcleo | Conductividad térmica λ (W/m·K) | Comportamiento al fuego | Aplicación recomendada |
|---|---|---|---|
| Lana de roca de alta densidad | 0,037 – 0,043 | Incombustible (Euroclase A1) | Shelters con riesgo de incendio interno (UPS, baterías) o normativa estricta |
| Poliuretano (PUR) | 0,022 – 0,028 | B s2 d0 (combustible, baja emisión humos) | Shelters donde prima la performance térmica y el peso |
| Poliisocianurato (PIR) | 0,022 – 0,028 | B s1 d0 (mejor que PUR) | Solución intermedia |
| Lana mineral con cara de yeso | 0,037 – 0,045 | A1 / A2 | Aplicaciones con exigencia de resistencia al fuego F-60 o superior |

Para shelters de equipos críticos, **la práctica internacional dominante es lana de roca de alta densidad** (≥100 kg/m³) en espesores de 50 a 80 mm. La razón es que en un shelter que aloja UPS y bancos de baterías, un evento de incendio interno (ej. embalamiento térmico de batería de litio) puede comprometer toda la operación; la combustión del panel no puede agregarse al problema.

### 4.3. Piso técnico

El piso recibe equipos de gran peso concentrado, y simultáneamente debe ser fácil de limpiar, antideslizante y compatible con el ingreso de cableado por canalizaciones. Las soluciones típicas son:

- Chapa antideslizante de acero galvanizado de 4 a 6 mm sobre estructura de perfiles, con aislación inferior.
- Piso técnico modular elevado (raised floor), usado cuando el cableado de potencia y datos requiere distribución por debajo.
- Recubrimiento superior con baldosa vinílica o resina epoxi para tránsito industrial.

### 4.4. Puerta de acceso

La puerta es el punto más vulnerable a la intemperie y al vandalismo. Debe especificarse:

- **Chapa de acero** con espesor mínimo de 1,5 mm en cara exterior y aislación de panel sándwich (la guía sobre [puertas de chapa inyectada vs no inyectada](/blog/puertas-chapa-inyectada-vs-no-inyectada-comparativa/) desarrolla este punto en profundidad).
- **Cerradura multipunto** con cilindro europeo de alta seguridad y opcionalmente sistema electrónico de control de acceso.
- **Bisagras anti-extracción** o soldadas para evitar desmontaje desde el exterior.
- **Burletes perimetrales** que garanticen el grado IP de la envolvente.
- **Apertura hacia el exterior** con tope para evitar daño por viento.

### 4.5. Iluminación interior

LED IP65 para resistir condiciones de humedad e impacto, con encendido automático al abrir la puerta y **circuito de emergencia autónomo** que mantenga iluminación por al menos 90 minutos ante corte total de energía (típicamente con luminarias dotadas de batería interna).

### 4.6. Tomacorrientes y servicios

Tomacorrientes 220 V monofásico schuko o IRAM 2073 distribuidos perimetralmente, tomacorrientes trifásicos 380 V si se requieren, conexiones de datos (RJ45 + fibra óptica) llevadas al rack principal, y barra equipotencial de puesta a tierra accesible para conexión de equipos.

---

## 5. Clima interior: el balance térmico que casi nadie explica

Esta es, probablemente, la sección donde más proyectos fracasan. La mayoría de los pliegos solicitan "aire acondicionado industrial de 24/7 para operar a +45 °C exterior", pero no especifican la potencia frigorífica requerida porque no se ha hecho el balance térmico.

### 5.1. La ecuación de base

El balance térmico de un shelter responde a una ecuación fundamental: el calor que se debe extraer es igual a la suma del calor generado por los equipos internos más el calor que ingresa desde el exterior.

**Q_total = Q_equipos + Q_conducción + Q_radiación**

Donde:

| Término | Significado | Cálculo aproximado |
|---|---|---|
| **Q_equipos** | Calor disipado por equipos internos | Suma de las potencias en watts (≈3,41 BTU/h por W) |
| **Q_conducción** | Calor que atraviesa la envolvente por diferencia de temperatura | Q = U · A · ΔT, donde U es la transmitancia del panel, A la superficie y ΔT la diferencia entre exterior e interior |
| **Q_radiación** | Calor solar absorbido por la envolvente | Depende de orientación, color y reflectancia de la pintura exterior |

### 5.2. Un ejemplo numérico orientativo

Para un shelter de 6,0 × 2,4 × 2,8 m con disipación interna estimada de 2,5 kW, ubicado en una zona con temperatura de diseño exterior de +45 °C y temperatura interior objetivo de +25 °C (ΔT = 20 °C), con panel sándwich de lana de roca de 50 mm (U ≈ 0,75 W/m²·K), el cálculo aproximado sería:

| Componente | Cálculo orientativo | Resultado |
|---|---|---|
| Superficie envolvente expuesta | 2 × (6,0 × 2,8) + 2 × (2,4 × 2,8) + (6,0 × 2,4) | ≈ 61 m² |
| Q_conducción | 0,75 × 61 × 20 | ≈ 915 W |
| Q_radiación (estimación) | 15-20 % adicional sobre conducción en zona soleada | ≈ 180 W |
| Q_equipos | Dato del cliente | 2.500 W |
| **Q_total aproximado** | Suma + factor de seguridad 25 % | **≈ 4.500 W (~15.400 BTU/h)** |

Es decir, para 2,5 kW de equipos, **se requiere un equipo de climatización de aproximadamente 18.000 BTU/h con compresor inverter** que pueda operar con confiabilidad a +45 °C exterior. La elección de un equipo subdimensionado — habitual cuando se especifica "un split de 12.000 BTU/h" sin cálculo previo — se traduce en operación al límite, fallas prematuras del compresor y temperatura interior fuera de la clase 3.1 de ETSI EN 300 019-1-3.

El análisis detallado paso a paso, con un caso real, se desarrolla en el artículo satélite [Balance térmico de un shelter: cómo dimensionar el aire acondicionado para operar a +45 °C](/blog/balance-termico-shelter-climatizacion-45-grados/).

### 5.3. Redundancia y ventilación de emergencia

La práctica de diseño robusto incluye:

- **Dos equipos de climatización** en configuración N+1 (un equipo cubre toda la carga; el segundo es respaldo), con controlador que rota el equipo principal periódicamente para igualar horas de uso.
- **Sistema de ventilación de emergencia** con extractor termostático que se activa si la temperatura interior supera un umbral (típicamente +40 °C), aún sin climatización funcional. Provee tiempo de respuesta al equipo de mantenimiento.
- **Sensores de temperatura y humedad** con telemetría hacia el NOC del cliente.

---

## 6. Energía respaldada: UPS, baterías y autonomía

El equipo electrónico crítico no tolera cortes de energía. La función del sistema de respaldo es doble: filtrar la calidad de la red (transitorios, armónicos, micro-cortes) y proveer autonomía ante cortes prolongados.

### 6.1. UPS: tres topologías, una elegida

| Topología | Funcionamiento | Aplicación en shelters críticos |
|---|---|---|
| **Off-line (standby)** | La carga se alimenta de red; ante falla, transfiere a inversor en ~4-10 ms | NO recomendada para equipos sensibles |
| **Line-interactive** | Regula tensión con auto-transformador, transfiere a inversor ante corte | Aceptable para equipos de telecomunicaciones de baja potencia |
| **On-line doble conversión** | La carga siempre se alimenta del inversor; la red recarga las baterías. Sin transferencia | **Es la topología estándar en shelters de equipos críticos** |

Para el caso de uso típico (rack de equipos de telecomunicaciones, switches, routers, módulos de radio), un **UPS rackeable on-line doble conversión de 3 kVA** es la solución de referencia. Para data centers perimetrales o sitios con disipación de 10 kW o más, se escala a UPS de 5, 10 o 20 kVA.

### 6.2. Banco de baterías: la autonomía real

La autonomía de un UPS no la define el UPS sino el banco de baterías. Las tecnologías documentadas son:

| Tecnología | Vida útil típica | Comportamiento térmico | Mantenimiento |
|---|---|---|---|
| **VRLA AGM** (plomo-ácido sellada) | 3-5 años | Vida útil se reduce ~50 % por cada 10 °C sobre 25 °C | Bajo, sin reposición de electrolito |
| **VRLA Gel** | 5-8 años | Mejor tolerancia térmica que AGM | Bajo |
| **Litio-ferrofosfato (LiFePO4)** | 10-15 años | Tolerancia térmica superior, mayor densidad energética | Mínimo, BMS integrado |

Una autonomía de 30 minutos a plena carga es el mínimo razonable para permitir que el equipo de mantenimiento responda o que arranque un grupo electrógeno de respaldo. Para sitios verdaderamente remotos (sin acceso vehicular rápido), se especifican 4 a 8 horas de autonomía y se prevé generador.

### 6.3. Tablero eléctrico principal

Debe especificarse con grado de protección IP55 si está en zona no climatizada del shelter, e incorporar como mínimo:

- Llave general termomagnética con interruptor automático
- Protección diferencial **tipo A** (apta para corrientes continuas pulsantes que generan los UPS modernos y los cargadores de litio)
- Protección contra sobretensiones SPD coordinados (ver sección 7)
- Medidor de energía digital con comunicación Modbus o equivalente
- Sub-tablero de servicios menores (iluminación, tomacorrientes, climatización)

---

## 7. Protección contra rayos y sobretensiones: la disciplina IEC 62305

Un shelter en banquina de ruta o en altura de loma es un objetivo perfecto para descargas atmosféricas. La normativa internacional de referencia es la familia **IEC 62305** (cuatro partes: principios generales, evaluación de riesgo, protección física, protección eléctrica). En Argentina, sus homólogas son **IRAM 2184**.

### 7.1. Sistema externo: pararrayos

El shelter debe estar cubierto por un sistema externo de captación según el cálculo de riesgo (IEC 62305-2). Para sitios de alto riesgo se utilizan pararrayos tipo Franklin o malla conductora con bajadas dimensionadas (mínimo 50 mm² de cobre o 70 mm² de aluminio) hacia el sistema de puesta a tierra.

### 7.2. Sistema interno: SPD coordinados

Es la disciplina donde más errores se cometen. El estándar IEC 62305-4 define tres clases de Surge Protective Devices (SPD) que deben **coordinarse en cascada** según el principio de Lightning Protection Zones (LPZ):

| Clase de SPD | Función | Ubicación típica |
|---|---|---|
| **Clase I (Tipo 1)** | Descarga corrientes parciales de rayo directo (forma de onda 10/350 µs) | Entrada principal del shelter, antes del tablero |
| **Clase II (Tipo 2)** | Descarga sobretensiones inducidas (forma de onda 8/20 µs) | En el tablero principal, aguas abajo del SPD I |
| **Clase III (Tipo 3)** | Protección final de equipos sensibles | En el rack, junto al equipo a proteger |

La **coordinación entre etapas** exige que la energía que pasa el SPD I sea menor que la capacidad del SPD II, y así sucesivamente. En la práctica esto se logra con dos mecanismos:

- **Distancia mínima** entre etapas: la inductancia natural del cable entre SPD I y SPD II provee desacople. La industria sugiere 10 m de cable, aunque hay configuraciones más cortas si se utilizan inductores de desacople.
- **Tablas de coordinación** del fabricante, que verifican la compatibilidad entre etapas.

La elección frecuente de un único SPD II "porque parecía suficiente" deja al sistema sin protección frente a rayo directo o cercano, con riesgo de daño catastrófico al equipamiento aún cuando el SPD II quede destruido.

El detalle completo, con cálculos de evaluación de riesgo y selección de clases, se desarrolla en el artículo satélite [SPD Clase I y II en shelters: la coordinación que evita perder los equipos](/blog/spd-clase-i-ii-coordinacion-shelter-iec-62305/).

### 7.3. Puesta a tierra

La puesta a tierra del shelter debe ser **integrada** — un único sistema de tierra para puesta a tierra de servicio, de protección, de los SPD y del pararrayos — con resistencia objetivo **menor o igual a 5 Ω** medida con telurímetro. En suelos de alta resistividad puede requerir tratamientos químicos o jabalinas profundas.

Los conductores de bajada deben ser de **cobre desnudo de al menos 35 mm²** (50 mm² en zonas de alto riesgo), las jabalinas de acero-cobre tipo Copperweld de 16 mm × 3 m o equivalente, y todas las conexiones soldadas mediante soldadura exotérmica (cuproaluminotermia) para evitar corrosión galvánica.

---

## 8. Normas que importan (y por qué)

El shelter es un producto que cruza varias disciplinas normativas. Conocer la nomenclatura es lo que distingue una especificación técnica seria de un pedido genérico.

| Norma | Alcance | Qué especifica |
|---|---|---|
| **ETSI EN 300 019-1-3** | Equipo en interior con protección climática | Define rangos de temperatura, humedad y vibración del ambiente interior del shelter (clase 3.1 típica: +5 a +40 °C, 5-85 % HR) |
| **ETSI EN 300 019-1-4** | Equipo en exterior sin protección climática | Aplica a la envolvente del shelter como objeto sometido al ambiente (clase 4.1E: -33 a +40 °C en condiciones normales; valores extremos hasta +45 °C) |
| **IEC 60529** | Grados de protección IP | Define el código IPxx. El primer dígito (sólidos) y el segundo (líquidos). IP55 = polvo limitado + chorros de agua de cualquier dirección |
| **IEC 62305 (1-4)** | Protección contra rayos | Familia completa: principios, evaluación de riesgo, protección física, protección eléctrica |
| **IEC 60364 / IRAM 2281** | Instalaciones eléctricas | Diseño y verificación de la instalación de baja tensión interior |
| **NEBS Level 3 (Telcordia GR-63)** | Resiliencia ambiental para equipos telecom (mercado norteamericano) | Estándar equivalente a ETSI usado por carriers de EE.UU. |
| **IRAM 252 / ASTM A123** | Galvanizado en caliente por inmersión | Espesores y verificación |
| **CIRSOC 102 / ASCE 7 / EN 1991-1-4** | Cargas de viento | Velocidad básica, presión dinámica, coeficientes |
| **INPRES-CIRSOC 103** | Cargas sísmicas | Zonificación, coeficiente sísmico, espectros |
| **ISO 9001** | Sistema de gestión de calidad del fabricante | Trazabilidad, control de proceso, ensayos |

Para un comprador técnico, la verificación de cumplimiento de estas normas — con ensayos documentados o cálculos memorizados firmados por profesional matriculado — es la diferencia entre comprar un producto certificado y comprar una chapa pintada.

---

## 9. Logística: el factor que se subestima

Cuando la planta de fabricación está a 800, 1.000 o 1.500 km del sitio de instalación, la logística deja de ser un costo accesorio para convertirse en una variable de diseño.

| Variable logística | Implicancia |
|---|---|
| **Dimensiones del shelter** | Si excede los 2,55 m de ancho (norma de tránsito en Argentina, RTO Cargas Especiales), requiere permisos especiales y escolta. Sheltrers de 2,4 m de ancho permiten transporte estándar |
| **Altura total con carrocería** | Límite habitual 4,30 m. Diseños con paneles solares o pararrayos plegables resuelven esta restricción |
| **Peso total** | Un shelter de 6 × 2,4 m equipado pesa entre 4.500 y 7.500 kg. Define el tipo de camión, la grúa de descarga y la fundación |
| **Itinerario** | Pasos a nivel, puentes con limitación de altura, rotondas estrechas: deben verificarse en mapa antes de despachar |
| **Plazo de fabricación + entrega** | Típicamente 60 a 120 días según complejidad. Plazos menores suelen indicar fabricantes que improvisan |
| **Maniobra de izaje en sitio** | Requiere grúa con pluma y capacidad de carga suficiente (típicamente 25 a 50 t para shelters medianos); el cliente debe garantizar accesibilidad del camión y la grúa |

La práctica recomendada para sitios remotos es **diseñar el shelter con orejas de izaje y puntos de eslingaje claramente identificados**, entregar plano de izaje al equipo de campo, y ensayar el procedimiento en planta antes del despacho.

El artículo satélite [Shelter para corredor vial: siete detalles de ingeniería que el pliego no menciona](/blog/shelter-corredor-vial-ingenieria-7-detalles/) desarrolla en profundidad las particularidades de un despliegue en banquina de ruta.

---

## 10. Checklist para solicitar (y evaluar) una cotización seria

A partir de los temas tratados, una cotización profesional debería incluir, como mínimo, los siguientes ítems desagregados:

| Bloque | Información requerida en la oferta |
|---|---|
| **Producto** | Dimensiones, peso, materiales, espesores, tratamiento superficial, grado IP |
| **Cálculo estructural** | Verificación de viento, sísmica y transporte. Firma de profesional matriculado |
| **Balance térmico** | Memoria de cálculo, potencia frigorífica del equipo seleccionado, redundancia |
| **Sistema eléctrico** | Esquema unifilar, dimensionado del tablero, marca y modelo de protecciones |
| **Sistema de respaldo** | UPS (marca, modelo, kVA, topología), banco de baterías (tecnología, autonomía), tablero asociado |
| **Protección contra rayos** | Estudio de riesgo IEC 62305-2, esquema de SPD coordinados, resistencia objetivo de PAT |
| **Logística** | Distancia, modalidad de transporte, plazo de fabricación, plazo de entrega, condiciones de izaje |
| **Garantía** | Por ítem (envolvente, climatización, UPS, baterías, protecciones), con duración y alcance |
| **Documentación entregable** | Planos as-built, manuales de operación y mantenimiento, certificados de ensayos, registros de control de calidad |
| **Condición comercial** | Precio desagregado por ítem, precio llave en mano con y sin transporte, condición de pago, moneda |

Una oferta que entrega solo un precio global, sin desagregación, sin memoria de cálculo y sin ficha técnica del producto, está dejando al comprador en estado de indefensión técnica. La ingeniería del shelter no es opinable: cumple norma o no cumple.

---

## 11. Cierre: la diferencia entre un shelter y una caja

Si un párrafo resume la diferencia entre un shelter bien diseñado y uno mediocre, es este: el primero se concibe como **un sistema integrado** — estructura, envolvente, clima, energía y protecciones diseñadas de manera coordinada con un escenario de operación específico —, mientras que el segundo es la suma de componentes elegidos por separado y montados en una chapa pintada.

La industria latinoamericana cuenta con fabricantes capaces de entregar shelters de calidad internacional, con memorias de cálculo, ensayos documentados y trazabilidad ISO 9001. Reconocerlos es cuestión de leer la oferta con criterio técnico: si la cotización no incluye lo que esta guía describe, lo que falta no es información — es ingeniería.

Cuando una integradora tecnológica, una operadora vial o una empresa de telecomunicaciones evalúa proveedores para un proyecto de despliegue de infraestructura crítica, el equipo de ingeniería de Metalúrgica Boto Mariani está disponible para analizar el pliego, sugerir mejoras de especificación y proveer una memoria técnica que permita comparar ofertas sobre bases equivalentes.

### Autor: Ing Hernan Soto E.
---

*Referencias y lecturas relacionadas:*

- [Disipación pasiva de calor y control de ruido en gabinetes outdoor para telecomunicaciones](/blog/disipacion-pasiva-calor-ruido-gabinetes-outdoor-telecom/)
- [Acero vs aluminio en gabinetes outdoor: lo que los catálogos no comparan](/blog/acero-vs-aluminio-gabinetes-outdoor-comparativa/)
- [Puertas de chapa inyectada vs no inyectada: lo que cambia con el poliuretano](/blog/puertas-chapa-inyectada-vs-no-inyectada-comparativa/)
- [Módulos habitables y campamentos modulares para obra: guía técnica](/blog/modulos-habitables-campamentos-modulares-obra/)

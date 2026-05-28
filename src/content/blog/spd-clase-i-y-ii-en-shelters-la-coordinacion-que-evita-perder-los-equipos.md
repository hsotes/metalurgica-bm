---
title: "SPD Clase I y II en Shelters: La Coordinación que Evita Perder los Equipos"
description: "Protección contra rayos en shelters de equipos críticos: coordinación SPD Clase I y II según IEC 62305-4, zonas LPZ y puesta a tierra."
date: "2026-05-28"
author: "Metalurgica Boto Mariani"
image: "/blog/spd-clase-i-y-ii-en-shelters-la-coordinacion-que-evita-perder-los-equipos-1779980143465.jpg"
category: "TBex"
tags: ["SPD Clase I Clase II", "IEC 62305 protección rayos", "shelter protección contra rayos", "coordinación SPD", "Lightning Protection Zones LPZ", "puesta a tierra shelter telecomunicaciones", "IRAM 2184", "sobretensiones equipos críticos", "shelter telecomunicaciones LATAM", "diseño eléctrico shelter modular"]
---

# SPD Clase I y II en Shelters: La Coordinación que Evita Perder los Equipos

Un shelter de telecomunicaciones en una banquina de ruta, en lo alto de un cerro o en medio de un campo abierto cumple, sin proponérselo, todas las condiciones para ser objetivo de descargas atmosféricas: es un cuerpo metálico aislado en un entorno sin estructuras competidoras. Sin protección adecuada, una descarga directa o cercana puede destruir el equipamiento interno en milisegundos, con costos de reposición que habitualmente superan diez veces el valor de los dispositivos de protección que faltaron.

La disciplina que regula este problema es la familia normativa **IEC 62305** — cuatro partes que cubren principios, evaluación de riesgo, protección física y protección eléctrica — y, en Argentina, la **IRAM 2184** que la traduce al marco local. Este artículo se concentra en el punto que más errores produce en proyectos reales: la **coordinación de SPD (Surge Protective Devices) clase I, II y III** según IEC 62305-4.

---

## 1. Qué protege qué (y por qué tres clases y no una)

Un SPD es un dispositivo que deriva a tierra la energía de una sobretensión transitoria antes de que alcance el equipo a proteger. Lo hace por medio de un componente no lineal — habitualmente un varistor de óxido metálico (MOV), un spark gap o una combinación — que se comporta como circuito abierto en condiciones normales y como cortocircuito a tierra cuando la tensión supera un umbral.

El problema es que **no existe un único dispositivo capaz de proteger contra todos los tipos de sobretensión simultáneamente**. La energía de un rayo directo es muchas veces superior a la de una sobretensión inducida por una descarga cercana, y un SPD optimizado para descargar 50 kA de impulso rayo no es el más adecuado para limitar a 1,5 kV una sobretensión rápida que viaja por la línea de baja tensión.

La normativa resuelve este compromiso con **tres clases de SPD coordinadas en cascada**:

| Clase de SPD | Forma de onda de ensayo | Capacidad típica | Función |
|---|---|---|---|
| **Clase I (Tipo 1)** | 10/350 µs | I_imp 12,5 a 100 kA | Descarga corrientes parciales de rayo directo o muy cercano |
| **Clase II (Tipo 2)** | 8/20 µs | I_n 5 a 40 kA, I_max hasta 80 kA | Descarga sobretensiones inducidas; limita tensión residual al rango que toleran los equipos |
| **Clase III (Tipo 3)** | combinada 1,2/50 - 8/20 µs | algunos kA | Protección final en el rack, junto al equipo sensible |

La forma de onda 10/350 µs reproduce el contenido energético de un rayo directo: rise time muy lento pero duración prolongada, con alta energía total. La 8/20 µs reproduce una sobretensión inducida: rise time rápido, baja duración. Un SPD diseñado para 8/20 µs (Clase II) **no soporta** una descarga 10/350 µs: el MOV se destruye en el primer rayo directo y el shelter queda sin protección.

---

## 2. Las zonas de protección (LPZ)

La IEC 62305-4 introduce el concepto de **Lightning Protection Zones**: el espacio físico de un proyecto se divide en zonas con distinto nivel de amenaza, y los SPD se ubican en las fronteras entre zonas.

| Zona | Definición | Ejemplo en un shelter |
|---|---|---|
| **LPZ 0_A** | Zona expuesta a impacto directo y al campo electromagnético no atenuado | Exterior del shelter, antenas, pararrayos |
| **LPZ 0_B** | Zona protegida del impacto directo pero con campo electromagnético no atenuado | Bajo el alero del shelter, próximo a tableros |
| **LPZ 1** | Interior protegido por una primera capa de SPD; corrientes parciales y campo atenuado | Interior del shelter, antes del tablero principal |
| **LPZ 2** | Interior con segunda capa de protección; corrientes residuales muy reducidas | Salida del tablero principal, rack |
| **LPZ 3** | Protección final en el equipo crítico | Conector del equipo sensible |

La transición LPZ 0 → LPZ 1 exige **SPD Clase I** en el ingreso de la alimentación. La transición LPZ 1 → LPZ 2 exige **SPD Clase II**. La transición LPZ 2 → LPZ 3, opcional, se cubre con **SPD Clase III** instalados en el rack.

---

## 3. La coordinación: por qué no basta con poner dos SPD en cascada

Es habitual encontrar instalaciones donde se compraron e instalaron un SPD Clase I y un SPD Clase II, pero la protección sigue siendo deficiente. La razón es que **no están coordinados**.

La coordinación significa que el SPD aguas arriba (Clase I) tiene un nivel de protección Up superior al umbral de operación del SPD aguas abajo (Clase II), de modo que el Clase II opera ANTES que el Clase I y absorbe las sobretensiones menores; cuando llega una descarga grande, el Clase II se sobrecarga, su impedancia sube, y el Clase I toma el control para descargar la energía masiva del rayo.

Sin coordinación, ambos SPD intentan actuar al mismo tiempo, la corriente se reparte de forma incontrolada y, en el peor caso, el SPD Clase II — mucho menos robusto — recibe parte de la corriente de rayo directa y se destruye.

### 3.1. Mecanismos de coordinación

| Mecanismo | Descripción | Aplicabilidad |
|---|---|---|
| **Distancia de cable** | La inductancia natural del cable entre etapas provee desacople. Regla industrial: 10 m mínimo de cable entre SPD I y SPD II | Aplicable cuando el tablero principal está al menos 10 m de la acometida |
| **Inductor de desacople** | Bobina específica intercalada entre SPD I y SPD II. Reemplaza la distancia | Cuando el tablero principal está cerca de la acometida (caso shelters compactos) |
| **SPD combinado I+II** | Un único dispositivo certificado para ambas funciones | Solución compacta para shelters con espacio limitado en el tablero |
| **Tablas del fabricante** | Documento del fabricante que verifica qué pares de SPD están coordinados | Siempre consultar antes de seleccionar |

---

## 4. Evaluación de riesgo: IEC 62305-2

La norma exige, antes de elegir SPD, hacer una **evaluación de riesgo** (IEC 62305-2). El cálculo tiene en cuenta:

| Parámetro | Significado |
|---|---|
| **Ng** | Densidad de descargas a tierra del sitio (rayos/km²/año). En Argentina varía de 0,5 (Patagonia sur) a 8 (NEA) |
| **A_d** | Área de captación del shelter, ampliada por las líneas eléctricas o de telecomunicaciones que ingresan |
| **L_T** | Pérdidas potenciales (vida humana, servicio público, patrimonio cultural, valor económico) |
| **R_T** | Riesgo tolerable (típicamente 10⁻⁵ por año para vida humana, 10⁻³ para pérdida económica) |

El resultado define la **clase de protección requerida** del LPS (Lightning Protection System), de I (la más exigente) a IV (la menos), que a su vez determina los parámetros mínimos de I_imp del SPD Clase I.

| Clase LPS | Eficacia | I_imp mínima SPD Clase I (10/350 µs) |
|---|---|---|
| I | 98 % | 100 kA total / 25 kA por polo |
| II | 95 % | 75 kA / 18,75 kA |
| III | 90 % | 50 kA / 12,5 kA |
| IV | 80 % | 50 kA / 12,5 kA |

Un shelter en banquina de ruta, en zona NEA, alojando equipos críticos de telecomunicaciones, suele requerir **Clase II o Clase I** del LPS. El SPD Clase I del tablero, en consecuencia, debe tener I_imp de al menos 18,75 kA por polo (sistema monofásico) o 25 kA (sistema trifásico).

---

## 5. La puesta a tierra: el componente que define todo lo demás

Un SPD funciona derivando la energía a tierra. Si la puesta a tierra está mal hecha — alta impedancia, mal contacto, conexiones corroídas — el SPD no tiene a dónde drenar la corriente y la sobretensión vuelve por el camino que encuentre, habitualmente atravesando los equipos que se quería proteger.

### 5.1. Requisitos esenciales

| Requisito | Valor típico |
|---|---|
| **Resistencia a tierra** | ≤ 5 Ω (telecom típica); ≤ 10 Ω en suelos resistivos con tratamiento |
| **Cable de bajada** | Cobre desnudo 35 mm² mínimo (50 mm² recomendado) |
| **Jabalinas** | Acero-cobre Copperweld 16 mm × 3 m, en cantidad suficiente según resistividad del suelo |
| **Conexiones** | Soldadura exotérmica (cuproaluminotermia) para uniones permanentes; conectores tipo "C" mecánicos solo en accesos a inspección |
| **Sistema integrado** | Una única tierra integrada para PAT de protección, de servicio, de SPD y del LPS externo. Evita potenciales transitorios entre subsistemas |

### 5.2. Diseño de la malla

En suelos de alta resistividad (suelos arcillosos secos, rocosos, arenosos áridos) el diseño puro de jabalinas verticales puede ser insuficiente. Las prácticas documentadas para reducir la resistencia son:

- Malla horizontal a 0,5-0,8 m de profundidad, perimetral al shelter
- Tratamiento químico del suelo (bentonita, sales conductoras, mezclas comerciales como GEM o equivalentes)
- Aumento del número de jabalinas, dispuestas en triángulo o cuadrado con separación igual a la longitud de la jabalina

Es importante validar la resistencia con un **telurímetro** en cada estación del año y registrar la medición en el informe de puesta en marcha.

---

## 6. Diferencial tipo A: una decisión que se subestima

La protección diferencial de un shelter de equipos críticos debe ser **tipo A** y no **tipo AC**. La diferencia es importante:

| Tipo de diferencial | Detecta |
|---|---|
| **Tipo AC** | Solo corrientes alternas senoidales |
| **Tipo A** | AC senoidal + corrientes continuas pulsantes |
| **Tipo B** | A + corrientes continuas puras (uso especializado, ej. inversores fotovoltaicos sin transformador) |

Los UPS modernos, los cargadores de baterías de litio y los rectificadores de telecomunicaciones generan corrientes de fuga con componentes continuas pulsantes que un diferencial tipo AC **no detecta**, dejando el sistema sin protección de personas. La norma argentina (Reglamento AEA 90364) y la europea (IEC 60364-4-41) hace ya varios años que exigen diferencial tipo A como mínimo en circuitos que alimentan equipos electrónicos.

---

## 7. Errores frecuentes en proyectos reales

Una recopilación, basada en patologías observadas en sitios de telecomunicaciones de LATAM, de los errores más frecuentes:

| Error | Consecuencia |
|---|---|
| Instalar solo SPD Clase II "porque es más barato" | Falla catastrófica ante rayo directo; pérdida de equipos |
| SPD I y II sin coordinación (sin distancia ni inductor) | Reparto incontrolado de corriente; el Clase II se quema |
| Puesta a tierra > 10 Ω no documentada | El SPD no puede derivar; sobretensión queda atrapada |
| Tierra de pararrayo separada de tierra de servicio | Potenciales transitorios entre subsistemas; quema de tarjetas de red |
| Diferencial tipo AC en circuitos con UPS | Falsa protección; en caso de fuga continua pulsante no actúa |
| No reemplazo del SPD después de evento de rayo | El MOV degradado opera con tensión residual alta; falla silenciosa |
| Tablero IP55 con prensaestopas mal montados | Ingreso de humedad, corrosión de barras, falla intermitente |

---

## 8. Mantenimiento: lo que no se hace, no protege

Los SPD son consumibles. Un SPD Clase I puede operar varias veces antes de degradarse, pero después de un evento severo se debe reemplazar. La práctica recomendada incluye:

- Ventana indicadora de estado en cada SPD (típicamente verde/rojo).
- Auxiliares de alarma remota conectados al sistema de telemetría del shelter.
- Inspección visual trimestral del estado de los indicadores.
- Verificación anual de la resistencia de PAT.
- Registro documental de eventos eléctricos y de mantenimiento.

---

## 9. Cierre

La protección contra rayos en un shelter de equipos críticos no es un commodity que se elige por catálogo. Cada sitio tiene una densidad de descargas, una resistividad de suelo, un trazado de líneas entrantes y un equipamiento interno con su propio nivel de tolerancia a sobretensiones. La aplicación correcta de IEC 62305-4 — evaluación de riesgo, definición de clase de LPS, selección coordinada de SPD I+II+III, diseño integral de puesta a tierra — es lo que distingue un sistema que protege durante décadas de uno que protege en el catálogo pero falla en el primer evento.

El proyecto completo del shelter, incluyendo el resto de los sistemas (climatización, energía, estructura, logística), se desarrolla en la [guía técnica integral de shelters modulares para equipos críticos](/blog/shelters-modulares-para-equipos-criticos-guia-tecnica-de-diseno-climatizacion-y-proteccion/).

Cuando un proyecto requiere verificar la coordinación de protecciones de un shelter, o auditar una instalación existente que ha sufrido eventos repetidos, el equipo de ingeniería de Metalúrgica Boto Mariani está disponible para acompañar el análisis técnico.
### Autor Ing. Sebastian Boto Mariani
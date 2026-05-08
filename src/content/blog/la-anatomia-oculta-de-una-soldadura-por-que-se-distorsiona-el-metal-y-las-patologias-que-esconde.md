---
title: "La Anatomia Oculta de una Soldadura: Por Que se Distorsiona el Metal y las Patologias que Esconde"
description: "La fisica detras de la distorsion del acero al soldar, las tensiones residuales, la zona afectada por el calor, las 7 patologías clásicas y los casos icónicos donde el control fallo. Soldadura estructural explicada con normativa AWS D1.1, ISO 5817 y BS EN 1090."
date: "2026-05-08"
author: "Metalurgica Boto Mariani"
image: "/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778247694825.jpg"
category: "Estructuras"
tags: ["soldadura estructural", "patologias soldadura", "distorsion termica", "tensiones residuales", "zona afectada por el calor", "HAZ", "hidrogeno difusible", "agrietamiento en frio", "AWS D1.1", "ISO 5817", "BS EN 1090", "ensayos no destructivos", "ultrasonido phased array", "WPS WPQR", "carbono equivalente", "Liberty Ships", "plataforma Alexander Kielland", "soldadura de precision"]
---


# La Anatomía Oculta de una Soldadura: Por Qué se Distorsiona el Metal y las Patologías que Esconde

Una placa de acero perfectamente recta entra al taller. Dos soldadores la unen a otra placa con un cordón continuo. Cuando el conjunto se enfría, la placa ya no está recta. Está curvada, levemente girada, y bajo tensiones internas que ningún operador puso ahí intencionalmente.

Esa pregunta —¿por qué se "revira" el metal cuando lo soldamos?— tiene una respuesta que es, al mismo tiempo, simple desde la física y profundamente compleja desde la ingeniería. Y la respuesta es lo que separa a un taller de soldadura calificado de uno improvisado: porque las consecuencias de no entenderla aparecen meses, años o décadas después, casi siempre como fallas estructurales.

En este artículo desarmamos lo que pasa adentro de una soldadura cuando nadie está mirando. Los gradientes térmicos brutales, las distorsiones inevitables, las tensiones residuales que viven dentro del acero antes de que la estructura entre en servicio, la zona afectada por el calor donde la microestructura cambia, y las siete patologías clásicas que comprometen integridad cuando el proceso no está bajo control.

---

## Lo que pasa cuando un arco eléctrico funde acero

Para entender la distorsión hay que partir de los números reales del proceso, no de la imagen idealizada del electrodo apoyando sobre la pieza.

En una soldadura por arco eléctrico convencional (SMAW, GMAW, FCAW, GTAW), la temperatura en el centro de la pileta líquida está entre **1.500 y 1.700 °C**. A pocos milímetros de distancia, la temperatura del metal base sigue siendo la del taller — 20 a 25 °C en condiciones normales.

Eso significa que en una distancia de **3 a 5 milímetros**, el acero pasa de fundido a sólido a temperatura ambiente. Es uno de los gradientes térmicos más extremos que se aplican a un material estructural en cualquier proceso industrial.

| Posición respecto del eje del cordón | Temperatura típica durante la soldadura |
|--------------------------------------|----------------------------------------|
| Centro de la pileta líquida | 1.500 – 1.700 °C |
| Línea de fusión | 1.450 – 1.500 °C (solidus del acero al carbono) |
| HAZ — zona de granos gruesos | 1.100 – 1.450 °C |
| HAZ — zona de granos refinados | 900 – 1.100 °C |
| HAZ — zona intercrítica | 700 – 900 °C |
| Material base no afectado | 20 – 200 °C |

El acero, como prácticamente todos los metales, se expande cuando se calienta. El coeficiente de expansión térmica de los aceros estructurales al carbono es del orden de **12 × 10⁻⁶ por grado Celsius**. Una zona que pase de 20 °C a 1.500 °C aumenta su longitud aproximadamente un 1,8% y vuelve a contraerse al enfriarse al mismo valor de origen.

Si esa zona estuviera libre, no pasaría nada: se expandiría, se contraería, y volvería a su forma original. **El problema es que no está libre.** Está rodeada de material frío que no se mueve. La zona caliente quiere expandirse pero no puede; al enfriarse quiere contraerse pero el resto la frena.

Ahí nacen tres consecuencias inevitables: distorsión geométrica, tensiones residuales internas, y modificación microestructural de la zona vecina al cordón.

---

## Las cuatro distorsiones clásicas


![Types-of-Welding-Defects-Distortion](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778245792434.jpg)


Cualquier ingeniero de soldadura sabe que toda unión va a generar al menos uno —y casi siempre varios— de estos cuatro patrones de distorsión. La cuestión no es evitarlos. Es predecirlos y compensarlos.

### 1. Contracción transversal


![contraccion transversal](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778245811998.jpg)


La zona del cordón se contrae perpendicularmente a su eje cuando se enfría. En una unión a tope de dos placas, esto se traduce en un acercamiento de las piezas que, sin restricciones, puede ser **de 1 a 3 mm por cada cordón** según el espesor y la energía aportada.

Es la distorsión más fácil de medir y la más sencilla de compensar: se separan las piezas ligeramente más de lo final, o se suelda con presetting (geometría inicial deformada en sentido contrario al esperado).

### 2. Contracción longitudinal


![pandeo](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778245933477.jpg)


El cordón se contrae también a lo largo de su eje, generando esfuerzos longitudinales en toda la pieza. En vigas armadas y perfiles soldados, esta contracción puede flexionar la pieza completa, con flechas que en piezas largas (más de 3 m) son visibles a simple vista.

Una viga armada con cordones longitudinales en una sola ala se curvará hacia ese lado al enfriarse. Soldarla simultáneamente en ambas alas es la forma más simple de evitar la curvatura.

### 3. Distorsión angular


![distorcion angular](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778245969669.jpg)


Es la rotación de las piezas alrededor del eje del cordón. En una unión a tope, las dos placas tienden a "levantarse" formando un ángulo entre sí. En una soldadura de filete con junta en T, la placa vertical tiende a inclinarse hacia el lado del cordón.

La causa es que la contracción no es uniforme en el espesor: la parte superior del cordón (que se enfría primero y que tiene más volumen de aporte) se contrae más que la inferior, generando momento de rotación.

Para una soldadura en V con bisel a un solo lado, la distorsión angular típica está entre **2 y 6 grados** sin compensación. Para soldaduras en X con bisel doble, baja a 1 a 2 grados.

### 4. Distorsión rotacional o por viga


![distorcion rotacional](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778245990159.jpg)


En piezas largas con soldaduras asimétricas, las contracciones longitudinales y transversales se combinan generando torsión y desalineación de extremos. En vigas armadas largas (más de 6 m), la distorsión rotacional puede dejar los extremos desalineados varios milímetros si la secuencia de soldadura no fue cuidadosamente planificada.

| Tipo de distorsión | Causa principal | Magnitud típica sin compensación |
|---------------------|------------------|----------------------------------|
| Contracción transversal | Contracción del cordón perpendicular al eje | 1 – 3 mm por cordón |
| Contracción longitudinal | Contracción del cordón paralela al eje | 0,1 – 0,3% de la longitud |
| Distorsión angular | Contracción asimétrica en el espesor | 2 – 6° (V simple), 1 – 2° (X) |
| Distorsión rotacional | Combinación de contracciones en piezas asimétricas | 2 – 10 mm en piezas largas |

---

## Las tensiones residuales: la estructura empieza cargada antes de operar

Las distorsiones son la parte visible. Lo que no se ve es lo que más importa.

Cuando la zona caliente intenta contraerse y el material adyacente la frena, no toda la energía se libera en deformación geométrica. **Una parte queda almacenada como tensión interna del material**. Esa tensión está ahí cuando la pieza sale del taller, antes de que la estructura reciba la primera carga de servicio.

Las mediciones experimentales —principalmente con difracción de rayos X, hole drilling y métodos de contour mapping— muestran que las tensiones residuales en el cordón y la zona inmediata pueden alcanzar **valores cercanos al límite de fluencia del material**. Para un acero F-24 (límite de fluencia ≈ 240 MPa), las tensiones residuales longitudinales en el centro del cordón pueden ser **+200 a +250 MPa de tracción**.

Es decir: el acero del cordón está, sin que la estructura haya sido cargada, traccionado al borde de su capacidad elástica.

Este dato tiene tres implicancias prácticas que rara vez aparecen explícitas en pliegos:

1. **El cordón ya está usando una parte importante de su resistencia disponible** antes de que llegue la carga externa. Cuando se le suma la solicitación de servicio, la combinación de tensiones puede acercarse o superar la fluencia local más rápido de lo que predice un cálculo elástico simple.

2. **Las tensiones residuales son la principal causa del fenómeno conocido como "agrietamiento retardado"** o cold cracking, especialmente cuando el contenido de hidrógeno difusible es alto. La fisura aparece horas o días después de soldar, sin que la pieza haya sido cargada.

3. **Las tensiones residuales aumentan la sensibilidad a fatiga.** Una pieza con tensiones residuales de tracción cerca del cordón tiene vida en fatiga sustancialmente menor que la misma pieza sin esas tensiones. Es una de las razones técnicas por las que los códigos de diseño penalizan los detalles soldados con factores de concentración específicos.

Eliminar o reducir las tensiones residuales requiere tratamientos térmicos posteriores (PWHT — post-weld heat treatment), procesos mecánicos como peening, o secuencias de soldadura cuidadosamente diseñadas. No se eliminan solas con el tiempo.

---

## La zona afectada por el calor: donde realmente fallan las soldaduras

Cuando se analizan fallas de uniones soldadas en servicio, el lugar donde aparece la fisura **no suele ser el cordón** ni el material base lejano. La fractura aparece, en una proporción muy alta de los casos, en la **zona afectada por el calor (HAZ — Heat Affected Zone)**.

La HAZ es la franja de material base contigua al cordón que, sin haber fundido, alcanzó temperaturas suficientes para alterar su microestructura. Su espesor típico es de **2 a 10 milímetros** según el aporte térmico y el espesor del material.

Dentro de la HAZ se distinguen cuatro subzonas, cada una con propiedades muy distintas:

| Subzona de la HAZ | Rango de temperatura alcanzado | Microestructura resultante | Característica mecánica |
|-------------------|-------------------------------|----------------------------|--------------------------|
| Granos gruesos (CGHAZ) | 1.100 – 1.450 °C | Austenita de granos grandes que al enfriar puede formar martensita o bainita | Dureza alta, tenacidad reducida — más propensa a fisuración |
| Granos refinados (FGHAZ) | 900 – 1.100 °C | Granos finos por recristalización | Buena resistencia y tenacidad |
| Intercrítica (ICHAZ) | 700 – 900 °C | Mezcla de ferrita y austenita parcialmente transformada | Heterogénea, posible fragilización |
| Subcrítica (SCHAZ) | 500 – 700 °C | Material base con alivio parcial de tensiones, sin transformación de fase | Generalmente sin pérdida significativa |

La zona de granos gruesos (CGHAZ) es la más comprometida. En aceros con carbono equivalente alto, allí se forma martensita o bainita —fases duras y frágiles— que quedan rodeadas de tensiones residuales y, si hay hidrógeno presente, son el punto donde se inicia la fisuración.

**El carbono equivalente** del material —parámetro que combina los porcentajes de C, Mn, Cr, Mo, V, Ni y Cu— es la métrica que predice el riesgo. Las normas internacionales (AWS D1.1, ISO 17642, IIW) coinciden en valores de referencia aproximados:

| Carbono equivalente CE | Riesgo de fisuración en CGHAZ | Recomendación práctica |
|-----------------------|-------------------------------|------------------------|
| CE ≤ 0,40 | Bajo | Procedimientos estándar |
| 0,40 < CE ≤ 0,45 | Moderado | Considerar precalentamiento ligero según espesor |
| 0,45 < CE ≤ 0,55 | Alto | Precalentamiento obligatorio, electrodos básicos |
| CE > 0,55 | Muy alto | Precalentamiento + control de hidrógeno + post-calentamiento |

CE = C + Mn/6 + (Cr + Mo + V)/5 + (Ni + Cu)/15 (fórmula IIW, válida para aceros al carbono y baja aleación).

Saltarse el precalentamiento en aceros de CE alto es una de las causas más documentadas de fisuración en frío. No es un detalle: es la diferencia entre una unión que dura décadas y una que se fisura antes de salir del taller.

---

## Las siete patologías clásicas de soldadura

Cuando una soldadura se ejecuta sin control adecuado del procedimiento, los defectos que aparecen no son aleatorios. Son siete patologías recurrentes, cada una con causa raíz identificable, mecanismo de detección y criterio de aceptación normativo.

### 1. Porosidad


![Porosity](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246288806.jpg)


Cavidades esféricas o tubulares atrapadas en el metal de soldadura, generadas por gases que no alcanzaron a escapar antes de la solidificación.

| Aspecto | Detalle |
|---------|---------|
| Causa raíz | Humedad en electrodos o en la pieza, contaminación con grasa/aceite, gas de protección insuficiente, longitud de arco excesiva |
| Detección | Radiografía (RT) — aparecen como manchas oscuras redondeadas. Ultrasonido (UT) limitado |
| Criterio AWS D1.1 | Porosidad uniformemente distribuida: tamaño máximo individual ≤ 2,4 mm, suma de diámetros en 25 mm ≤ 9,5 mm |

### 2. Fusión incompleta



![incomplete-fusion-defect-in-welding](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246559820.jpg)




Falta de unión metalúrgica entre el metal de aporte y el metal base, o entre cordones sucesivos. La unión existe geométricamente pero no estructuralmente.

| Aspecto | Detalle |
|---------|---------|
| Causa raíz | Aporte térmico insuficiente, ángulo de electrodo incorrecto, velocidad excesiva de avance, superficie sucia |
| Detección | Ultrasonido (UT) — muy efectivo. Radiografía (RT) variable según orientación |
| Criterio AWS D1.1 | No se acepta — defecto inadmisible en cualquier longitud o profundidad |


![R](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246539058.jpg)


### 3. Falta de penetración


![Lack-of-penetration-768x412](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246653734.jpg)


El cordón no alcanzó la profundidad de raíz prevista. La unión queda con un "vacío" en la base de la junta.

| Aspecto | Detalle |
|---------|---------|
| Causa raíz | Diseño de junta inadecuado para el espesor, abertura de raíz insuficiente, corriente baja, electrodo grande |
| Detección | Radiografía (RT) — claramente visible. Ultrasonido (UT) en juntas accesibles |
| Criterio AWS D1.1 | En general, no aceptable en juntas con penetración completa requerida |


![Incomplete-Penetration](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246677535.jpg)


### 4. Fisuras


![fig-fisuras-longitudinales-y-transversales](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246838623.jpg)


La patología más severa. Pueden ser longitudinales (paralelas al eje del cordón), transversales, en cráter, en HAZ o en metal de aporte. Se subdividen en fisuras **en caliente** (durante o inmediatamente después de la solidificación) y **en frío** (horas o días después).

| Aspecto | Detalle |
|---------|---------|
| Causa raíz fisuras en caliente | Composición química con alto azufre/fósforo, geometría que genera contracción excesiva, velocidad de enfriamiento inadecuada |
| Causa raíz fisuras en frío | Hidrógeno difusible + microestructura susceptible (martensita en HAZ) + tensiones residuales — los tres factores juntos |
| Detección | Líquidos penetrantes (PT) para fisuras superficiales, partículas magnéticas (MT) para superficiales y subsuperficiales, ultrasonido (UT) para internas, radiografía (RT) limitada en orientación desfavorable |
| Criterio AWS D1.1 | Cualquier fisura es rechazo automático, sin excepciones |


![v2-83c58ce6f86766fa2914e3df8de8963a_720w](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778246866580.jpg)


### 5. Mordeduras (undercut)


![undercut-defect-in-welding](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778247118958.jpg)


Surcos en el material base junto al pie del cordón, generados por fusión excesiva del metal base sin aporte suficiente para rellenarlos. Son concentradores de tensión severos.

| Aspecto | Detalle |
|---------|---------|
| Causa raíz | Corriente excesiva, ángulo de electrodo incorrecto, velocidad de avance alta |
| Detección | Inspección visual (VT) directa, calibre de mordedura |
| Criterio AWS D1.1 | Cargas estáticas: profundidad ≤ 1 mm. Cargas cíclicas: ≤ 0,25 mm — la fatiga es muy sensible a este defecto |

### 6. Escoria atrapada


![Inclusion-escoria](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778247364047.jpg)


Inclusiones de escoria del recubrimiento del electrodo o del flux que quedaron incrustadas dentro del metal de aporte sin haber flotado a la superficie.

| Aspecto | Detalle |
|---------|---------|
| Causa raíz | Limpieza insuficiente entre cordones (en uniones multipase), técnica de soldadura inadecuada, electrodo de baja calidad |
| Detección | Radiografía (RT) — aparecen como inclusiones oscuras irregulares |
| Criterio AWS D1.1 | Tamaño individual ≤ 6 mm, suma en 30 cm de cordón ≤ 19 mm |


![152b72_71d80624d07d48f498936e74a261a369~mv2](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778247392272.jpg)


### 7. Salpicaduras y socavadura interna


![defectos-de-soldadura_opt](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778247537557.jpg)


Las salpicaduras superficiales en sí no son críticas estructuralmente, pero suelen acompañar otros defectos. La socavadura interna (concavidad en la raíz, o concavidad excesiva en la cara superior) sí compromete la sección resistente.

| Aspecto | Detalle |
|---------|---------|
| Causa raíz socavadura | Aporte insuficiente, velocidad excesiva, técnica oscilante mal ejecutada |
| Detección | Inspección visual de raíz (cuando es accesible), radiografía, perfilómetro |
| Criterio AWS D1.1 | Reducción de espesor del metal base por socavadura no debe llevar el conjunto por debajo del espesor de cálculo |

---

## El hidrógeno: el villano que aparece días después

Entre todas las patologías, hay una que merece párrafo aparte porque es la que más fallas de servicio inesperadas genera: la **fisuración en frío inducida por hidrógeno** (HIC — Hydrogen Induced Cracking, también llamado cold cracking o delayed cracking).

El mecanismo es el siguiente. Durante la soldadura, el hidrógeno disuelto en la atmósfera del arco —proveniente de humedad en electrodos, en la pieza, o del propio aire— se introduce en el acero líquido. Cuando el acero solidifica, el hidrógeno queda atrapado en la red cristalina y comienza a difundir lentamente hacia las zonas de mayor tensión, típicamente la CGHAZ (zona de granos gruesos de la HAZ).

Si en esa zona hay microestructura susceptible (martensita, bainita superior) y las tensiones residuales son altas, los tres factores combinados disparan fisuras que aparecen entre **24 y 72 horas después de soldar** y, en casos extremos, hasta **dos semanas después**. La pieza puede haber pasado inspección visual inicial sin defectos y aparecer fisurada antes de salir del taller.

Las contramedidas técnicas son tres y complementarias:

1. **Reducir el hidrógeno en la fuente.** Electrodos básicos secos (E7018, E8018) tienen menos de 5 ml H2/100g de metal depositado. Electrodos rutílicos comunes (E6013) pueden llegar a 30 ml H2/100g. La diferencia es decisiva.

2. **Reducir la velocidad de enfriamiento mediante precalentamiento.** A mayor temperatura del material base, más lentamente se enfría la HAZ y más tiempo tiene el hidrógeno para difundir y escapar antes de quedar atrapado en zonas de tensión.

3. **Aplicar post-calentamiento controlado** (200 a 350 °C durante 1 a 4 horas) para acelerar la difusión del hidrógeno hacia el exterior antes de que cause fisura.

La norma AWS D1.1 incluye en su Anexo H una metodología específica para calcular el precalentamiento mínimo en función del carbono equivalente, el espesor combinado de la junta y el contenido de hidrógeno difusible del consumible. No es opcional para aceros estructurales de CE alto.

---

## Cuándo el control falló: dos casos icónicos

Las consecuencias de no controlar lo descrito hasta acá no son hipótesis académicas. Son casos documentados que cambiaron la práctica de la ingeniería de soldadura en todo el mundo.

### Liberty Ships (1942-1946)

Durante la Segunda Guerra Mundial, Estados Unidos fabricó aproximadamente 2.700 buques de carga clase Liberty con cascos completamente soldados, en lugar de los cascos remachados tradicionales. Era la primera vez que se aplicaba soldadura intensiva a estructuras de esa escala y volumen de producción.

De los 2.700 buques, **cerca de 1.200 sufrieron fisuras serias** en sus cascos. Doce se partieron literalmente en dos. El caso más documentado es el SS Schenectady, que se quebró en el muelle de Portland en 1943, en aguas tranquilas y a 4 °C de temperatura ambiente.

La investigación posterior identificó tres factores combinados:

1. Aceros con alta sensibilidad a la transición dúctil-frágil a bajas temperaturas (lo que hoy se conoce como temperatura de transición). En el Atlántico Norte, en invierno, el casco trabajaba en zona frágil.
2. Concentradores de tensión en uniones soldadas (esquinas vivas, mordeduras, fusión incompleta) que actuaban como núcleos de fisura.
3. Calidad de soldadura variable por la presión de producción y la incorporación masiva de soldadores con poca calificación.

La consecuencia técnica de Liberty Ships fue el desarrollo de los ensayos de impacto Charpy, los criterios de tenacidad a la fractura como variable de aceptación, y la calificación formal de soldadores como práctica obligatoria. Toda la normativa moderna de soldadura estructural —AWS D1.1, BS EN 1090, AS 1554— tiene su origen en lo que se aprendió revisando esos cascos quebrados.

### Plataforma Alexander L. Kielland (1980)

El 27 de marzo de 1980, la plataforma de alojamiento Alexander L. Kielland, anclada en el Mar del Norte, perdió una de sus cinco columnas de soporte en pocos minutos. La plataforma volcó y se hundió. **Murieron 123 personas** de las 212 que estaban a bordo.

La investigación noruega identificó la causa raíz con precisión inusual: en la columna D —una de las cinco patas de la plataforma— había una soldadura de un anillo hidrofónico (un dispositivo de seis pulgadas, no estructural, montado sobre la columna). Esa soldadura tenía una **fisura inicial de aproximadamente 6 milímetros**, presente desde la fabricación.

Bajo las cargas cíclicas del oleaje, la fisura creció por fatiga durante años. Cuando la sección remanente quedó por debajo de la mínima necesaria, la columna falló súbitamente, los arriostramientos no pudieron redistribuir las cargas, y la plataforma se inclinó hasta volcar.

Lo que enseña Alexander Kielland es la combinación letal de **una soldadura con defecto inicial + tensiones residuales + cargas cíclicas + ambiente corrosivo**. Cada factor por separado puede ser tolerable. Los cuatro juntos generaron la peor catástrofe offshore de Europa hasta ese momento.

Ambos casos —Liberty Ships y Alexander Kielland— son lectura obligatoria en cualquier curso serio de ingeniería de soldadura. No por nostalgia histórica, sino porque ilustran que las fallas de soldadura rara vez son por mala suerte. Casi siempre son por una cadena de decisiones técnicas que parecieron menores en su momento.

---

## Cómo se controla esto en un taller serio


![metal](/blog/la-anatomia-oculta-de-una-soldadura-por-que-se-distorsiona-el-metal-y-las-patologias-que-esconde-1778247650892.jpg)


La diferencia entre un taller que entrega soldaduras confiables y uno que improvisa no se ve mirando un cordón terminado. Se ve en los **documentos** que respaldan el proceso. Si esos documentos no existen, ningún ensayo posterior puede compensar lo que no se hizo en su momento.

Un taller con prácticas alineadas a normas internacionales tiene, como mínimo:

| Documento / práctica | Qué garantiza |
|----------------------|---------------|
| WPS (Welding Procedure Specification) | Procedimiento escrito con todas las variables esenciales (proceso, consumible, posición, precalentamiento, aporte térmico, etc.) |
| WPQR / PQR (Qualification Record) | Registro de la calificación experimental del WPS con ensayos destructivos (tracción, doblado, impacto, macrografía) |
| Calificación de soldadores AWS D1.1 / ISO 9606 / IRAM-IAS U500-164 | Prueba documentada de que cada soldador puede ejecutar el WPS aplicable |
| Plan de inspección END (ensayos no destructivos) | VT 100%, MT/PT en zonas críticas, UT/RT según criticidad de la unión |
| Trazabilidad de consumibles | Lote de electrodos / alambres / fundentes correlacionado con cada cordón |
| Control de precalentamiento y aporte térmico | Pirómetros, registros, protocolos por junta |
| Control de hidrógeno | Hornos de electrodos, control de humedad ambiente, secado de consumibles |

Un proveedor que entrega una estructura sin presentar WPS, WPQR y calificaciones de soldador no entregó una estructura calificada. Entregó una estructura aparente. Las consecuencias aparecen en servicio, no en obra.

---

## Ensayos no destructivos: qué detecta cada uno

No existe un ensayo no destructivo único que detecte todas las patologías. Cada técnica tiene un dominio donde es eficaz y un dominio donde es ciega. Una inspección seria combina al menos dos métodos complementarios.

| Ensayo | Detecta | No detecta | Costo relativo |
|--------|---------|------------|----------------|
| Visual (VT) | Defectos superficiales evidentes (mordeduras, salpicaduras, fisuras grandes, geometría incorrecta) | Defectos subsuperficiales o internos | Muy bajo |
| Líquidos penetrantes (PT) | Fisuras superficiales en cualquier material | Defectos subsuperficiales | Bajo |
| Partículas magnéticas (MT) | Fisuras superficiales y ligeramente subsuperficiales en aceros ferromagnéticos | Defectos profundos, materiales no ferromagnéticos | Bajo |
| Radiografía (RT) | Defectos volumétricos (porosidad, escoria, falta de penetración, fusión incompleta) | Fisuras orientadas perpendicularmente al haz | Medio-alto |
| Ultrasonido (UT) convencional | Defectos planares (fisuras, fusión incompleta) en cualquier orientación | Defectos muy superficiales sin acceso adecuado | Medio |
| Ultrasonido phased array (PAUT) | Mapeo volumétrico de uniones, todas las orientaciones, registro digital | Costo alto, requiere operador certificado nivel II o III | Alto |
| TFM / FMC (full matrix capture) | Imagen completa de la junta, detección de defectos pequeños con alta resolución | Tecnología más reciente, equipamiento sofisticado | Muy alto |

Para uniones críticas (cargas cíclicas, fluido a presión, recipientes nucleares, offshore) la combinación habitual es VT 100% + UT/PAUT 100% + RT spot en zonas seleccionadas. Para uniones estáticas estándar de obra civil suele bastar VT 100% + MT/PT en uniones críticas + UT/RT en porcentaje de la longitud según la categoría de ejecución (BS EN 1090: EXC2, EXC3, EXC4 con porcentajes crecientes de inspección).

---

## El detalle que separa un cordón calificado de un cordón improvisado

Después de todo lo descrito hasta acá, queda un punto que no aparece en los manuales pero que cualquiera que haya supervisado obras importantes conoce: la calidad de una soldadura no se mide en el cordón terminado. Se mide en el **proceso completo** que la generó.

Un soldador calificado, ejecutando un WPS calificado, con consumibles trazables, sobre material precalentado a la temperatura correcta, con control de aporte térmico, en un taller con horno de electrodos y protocolos de inspección, va a producir cordones consistentemente buenos.

Un soldador con experiencia pero sin procedimiento escrito, sobre material a temperatura ambiente, con electrodos comprados a granel, sin trazabilidad y con inspección visual ocasional, puede producir un cordón que se ve bien. Y a veces ese cordón es bueno. Y a veces, no. Y la diferencia entre los dos cordones que se ven igual no la detecta el ojo humano: la detecta el servicio, años después, cuando ya no se puede hacer nada.

Cuando se evalúa un proveedor de estructuras soldadas, las preguntas que importan no son "cuántos años de experiencia tienen" ni "cuántas obras hicieron". Son: ¿qué WPS aplican? ¿están calificados? ¿quién certifica a sus soldadores? ¿qué END realizan en uniones críticas? ¿pueden mostrarme un PQR de un procedimiento equivalente al que vamos a usar?

Si esas preguntas no tienen respuesta documental, la respuesta a la pregunta de fondo —¿esta estructura va a durar?— tampoco existe.

---

## Conclusión

Una soldadura no es solamente unir dos piezas con metal fundido. Es someter al acero a uno de los procesos termodinámicos más extremos que se le aplican en cualquier fabricación industrial: gradientes de 1.500 °C en pocos milímetros, contracciones que generan tensiones internas cercanas al límite elástico, modificaciones microestructurales en la zona afectada por el calor, y vulnerabilidades específicas a hidrógeno, fatiga y fragilización.

Conocer esa anatomía oculta es lo que diferencia una estructura soldada que cumple cuarenta años de servicio sin sorpresas de una que falla antes de tiempo. La diferencia no se ve en el cordón terminado. Se ve en el procedimiento, en la calificación del soldador, en el control de consumibles, en el precalentamiento aplicado, en el plan de inspección ejecutado y registrado.

Toda la normativa internacional —AWS D1.1, BS EN 1090, ISO 3834, ASME IX, INPRES-CIRSOC 103 Parte IV— existe porque la historia industrial enseñó, varias veces y a costos muy altos, que la soldadura no perdona la improvisación. Cuando el control técnico está, el resultado es invisible: la estructura simplemente funciona. Cuando no está, el resultado también puede ser invisible durante años, hasta que aparece como una fisura, una falla en servicio, o un colapso.

Saber lo que pasa adentro de una soldadura es la primera condición para garantizar lo que va a pasar afuera durante el resto de la vida útil de la estructura.

---

autor: "Ing. Hernán Soto"

*¿Tu proyecto requiere uniones soldadas críticas y querés saber cómo aseguramos la calidad del proceso completo? Nuestro equipo trabaja con procedimientos calificados, soldadores certificados y trazabilidad de consumibles desde la primera unión.*

---

### Referencias técnicas

- ANSI/AWS D1.1/D1.1M:2020 — Structural Welding Code – Steel (American Welding Society)
- AWS D1.1 Annex H — Guideline on Alternative Methods for Determining Preheat (control de hidrógeno y carbono equivalente)
- BS EN 1090-2:2018 — Execution of Steel Structures and Aluminium Structures – Technical Requirements for Steel Structures
- ISO 3834-2:2021 — Quality requirements for fusion welding of metallic materials – Part 2: Comprehensive quality requirements
- ISO 5817:2014 — Welding – Fusion-welded joints in steel, nickel, titanium and their alloys – Quality levels for imperfections
- ISO 9606-1:2017 — Qualification testing of welders – Fusion welding – Part 1: Steels
- ISO 17642 — Destructive tests on welds in metallic materials – Cold cracking tests
- IIW Doc IX-2526-09 — Cold Cracking in Welding (International Institute of Welding)
- ASME Boiler and Pressure Vessel Code, Section IX — Welding, Brazing, and Fusing Qualifications
- INPRES-CIRSOC 103 Parte IV — Construcciones de Acero Sismorresistentes
- IRAM-IAS U500-164 — Calificación de soldadores
- Masubuchi, K. (1980). *Analysis of Welded Structures: Residual Stresses, Distortion, and their Consequences*. Pergamon Press.
- Lancaster, J.F. (1999). *Metallurgy of Welding*, 6th ed. Abington Publishing.
- Bailey, N.; Coe, F.R.; Gooch, T.G.; Hart, P.H.M.; Jenkins, N.; Pargeter, R.J. (1973). *Welding Steels Without Hydrogen Cracking*. The Welding Institute (TWI).
- Kommission Sicherheit für Plattformen, Norway (1981). *The Alexander L. Kielland Accident – Report of a Norwegian Public Commission*.
- Tipper, C.F. (1962). *The Brittle Fracture Story*. Cambridge University Press (análisis técnico de las fallas de los Liberty Ships).

Necesitás asesoramiento sobre uniones soldadas críticas en un proyecto industrial? [Contactanos](/contacto/).

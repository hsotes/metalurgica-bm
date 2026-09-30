---
title: "Columnas CFT: cómo trabaja la sección mixta acero-hormigón"
description: "En un tubo de acero relleno de hormigón cada material corrige la debilidad del otro. Cómo se reparte la carga y qué cambia en montaje, en fuego y en taller."
date: "2026-09-30"
author: "Ing. Hernán Soto Escalante"
image: "/blog/columnas-cft-seccion-mixta-acero-hormigon/portada.jpg"
category: "Estructuras"
tags: ["columnas mixtas", "CFT", "tubo relleno de hormigón", "Eurocódigo 4", "AISC 360", "estructura metálica"]
---

Una columna CFT —*concrete-filled tube*— es un tubo de acero estructural, circular o rectangular, relleno de hormigón. Dicho así parece una suma: el acero aporta lo suyo, el hormigón lo suyo, y la capacidad del conjunto es la de los dos juntos.

No es exactamente así. En un tubo relleno cada material corrige la debilidad principal del otro, y la sección resultante trabaja de un modo que ninguno de los dos alcanza por separado.

## El tubo confina al hormigón

El hormigón comprimido se expande lateralmente. Cuando esa expansión está libre, el material se fisura y pierde capacidad. Cuando está impedida, resiste más y se vuelve más dúctil.

En un tubo relleno, la pared de acero es la que impide esa expansión. Al empujar hacia afuera, el hormigón pone al tubo a trabajar en tracción anular, como el aro de un barril, y el tubo le devuelve una presión de confinamiento. El efecto es pleno en secciones circulares, donde la presión es uniforme. En las rectangulares se concentra en las esquinas y se pierde hacia el centro de las caras.

Las normas lo reconocen de maneras distintas:

| Referencia | Cómo incorpora el confinamiento |
|---|---|
| AISC 360-16 | El hormigón de un tubo compacto se computa a 0,95 f'c en secciones circulares y a 0,85 f'c en rectangulares |
| NBR 8800 (Brasil) | Mismo criterio: 0,95 en tubos circulares rellenos, 0,85 en las demás secciones |
| Eurocódigo 4 | En todo tubo relleno el coeficiente 0,85 del hormigón puede reemplazarse por 1,0. En los circulares, además, admite un aumento por confinamiento |

El aumento del Eurocódigo tiene condiciones precisas: columna poco esbelta (esbeltez relativa de hasta 0,5) y carga prácticamente centrada (excentricidad menor al 10 % del diámetro). Y tiene una contrapartida que muestra bien el mecanismo: la fórmula reduce la capacidad axial que se le asigna al tubo, porque parte de su resistencia está ocupada en la tracción anular. El acero cede capacidad propia para que el hormigón gane más.

## El hormigón sostiene la pared del tubo

La debilidad del tubo de pared delgada es el pandeo local: bajo compresión, la pared se abolla antes de que el acero llegue a fluencia. Un tubo vacío puede abollarse hacia adentro o hacia afuera. Un tubo relleno solo puede hacerlo hacia afuera, porque hacia adentro está el núcleo.

Eso permite paredes bastante más delgadas. La AISC 360 lo cuantifica en sus límites de esbeltez de pared para compresión axial:

| Sección | Tubo hueco | Tubo relleno, compacto |
|---|---|---|
| Rectangular, relación ancho/espesor | 1,40 √(E/Fy) | 2,26 √(E/Fy) |
| Circular, relación diámetro/espesor | 0,11 E/Fy | 0,15 E/Fy |

Para un acero de 345 MPa, eso significa pasar de una relación ancho/espesor de unas 34 a una de unas 54 en tubos rectangulares, y de 64 a 87 en circulares. La consecuencia práctica es que los tubos estructurales comerciales rellenos resultan compactos en la enorme mayoría de los casos.

## Cuánto aporta cada material

La resistencia plástica de la sección es la suma de las tres áreas —acero del tubo, hormigón y armadura si la hay— cada una a su resistencia de cálculo, con los coeficientes de la tabla anterior.

El Eurocódigo 4 agrega un control que define qué es una columna mixta: el **coeficiente de contribución del acero**, la fracción de la capacidad total que aporta el tubo, tiene que estar entre 0,2 y 0,9. Por debajo de 0,2 la pieza es una columna de hormigón con encofrado metálico. Por encima de 0,9 es una columna de acero con relleno. Entre esos dos valores, la sección trabaja como mixta y el método se aplica.

## Dos etapas de carga

El tubo se monta vacío. Durante esa etapa es una columna de acero hueca que tiene que sostener su peso, el de las vigas que recibe y las cargas de la obra. Recién después se rellena, y a partir de ahí trabaja como sección mixta.

Esa secuencia es una de las razones por las que se elige el sistema: la estructura metálica avanza a su ritmo y el hormigonado de columnas va detrás, sin encofrados ni, en muchos casos, armadura. El Eurocódigo 4 indica que en tubos rellenos normalmente no hace falta armadura longitudinal cuando no se diseña para fuego.

Pero el hormigonado trae su propia verificación. El hormigón fresco empuja las paredes con presión hidrostática, y en tubos rectangulares de pared delgada la AISC pide verificar tensiones y deformaciones de las caras por esa presión, y apuntalar si hace falta. La práctica japonesa, que tiene la mayor experiencia acumulada con el sistema, registra presiones laterales del orden de 1,3 veces la hidrostática.

El llenado se hace de dos maneras: por bombeo desde la base, que es lo recomendado para no dejar vacíos, o por vertido desde arriba con tubo tremie, limitando la caída libre a entre 0,9 y 1,5 m. El hormigón autocompactante resuelve buena parte de las dificultades.

## Cómo entra la carga al núcleo

La viga descarga sobre el tubo. Para que el hormigón trabaje, esa carga tiene que pasar del acero al núcleo, y eso ocurre en una longitud acotada: el Eurocódigo 4 la limita a dos veces la menor dimensión de la sección o a un tercio de la altura de la columna.

La transferencia puede darse por adherencia, por conectores o por apoyo directo del hormigón sobre chapas que atraviesan el tubo. La adherencia es la más débil y la más variable:

| Referencia | Adherencia de cálculo en tubos rellenos |
|---|---|
| Eurocódigo 4, circular | 0,55 MPa |
| Eurocódigo 4, rectangular | 0,40 MPa |
| AISC 360 | Fórmula en función del espesor y la dimensión del tubo, con un factor de resistencia de 0,50 por la gran dispersión de los ensayos |

El comentario de la AISC agrega dos observaciones útiles: la adherencia es sobre todo fricción, y disminuye con secciones grandes, paredes delgadas, forma rectangular y hormigones de alta retracción. Y los tres mecanismos no se suman: se adopta el de mayor resistencia.

Las uniones viga-columna responden a esa lógica. Las más económicas son las chapas de corte soldadas a la cara del tubo, que transfieren carga porque la excentricidad aprieta el tubo contra el núcleo. Las chapas pasantes son más caras, porque exigen ranurar el tubo, y complican el hormigonado. Los diafragmas internos, pasantes o exteriores, habituales en Japón, llevan una perforación de 200 a 300 mm para que pase el hormigón y perforaciones menores para que salga el aire.

## El comportamiento frente al fuego

Durante un incendio, el tubo exterior se calienta primero y pierde resistencia. La carga se traslada al núcleo, que se calienta mucho más lento por su masa, y la columna sigue en pie mientras el hormigón conserve su capacidad.

Conviene precisar qué significa eso en números. Las tablas del Eurocódigo 4 para fuego muestran que un tubo relleno **sin armadura** alcanza resistencias del orden de 30 minutos, según su dimensión y su nivel de carga. Para 60 minutos o más, la tabla exige **armadura dentro del núcleo**, porque cuando el tubo pierde capacidad es esa armadura la que trabaja con el hormigón. El Steel Tube Institute estadounidense reporta hasta tres horas sin protección exterior, siempre dependiendo del nivel de carga.

El mérito del sistema está en esa palabra: exterior. La protección está adentro de la columna, y la cara del tubo queda a la vista y libre de mortero proyectado o de placas.

Hay además un detalle obligatorio. Con el calor, la humedad del hormigón se convierte en vapor, y un tubo sellado puede deformarse o romperse por presión interna. La parte 1-2 del Eurocódigo 4 exige perforaciones de venteo de al menos 20 mm de diámetro, una arriba y una abajo en cada piso, separadas no más de 5 m.

## Lo que hay que cuidar

El punto débil de la sección es la interfaz. Si el hormigón no llena por completo, queda una separación entre núcleo y tubo, y el confinamiento se pierde justo donde se lo necesita. En ensayos de laboratorio sobre tubos cuadrados, una separación menor al 0,1 % de la dimensión de la sección produjo pérdidas menores al 5 %; una del orden del 0,4 %, cerca del 20 %. Y vacíos concentrados de 10 a 30 mm redujeron la capacidad entre un 9 y un 25 %.

Los lugares críticos son conocidos: debajo de los diafragmas, donde el exudado del hormigón forma huecos, y bajo la chapa de tapa superior, donde actúa la retracción. La práctica recomienda baja relación agua-cemento con superplastificante, y completar los últimos 50 a 100 mm del tubo con grout sin retracción.

La retracción, en cambio, juega a favor. El núcleo queda sellado y no pierde agua hacia el ambiente: en mediciones a un año, la retracción de un núcleo CFT resultó un 62 % menor que la del mismo hormigón expuesto al aire. El Eurocódigo 4 toma para elementos rellenos una retracción de cálculo de 200 millonésimas, contra 325 en ambiente seco.

## Lo que deja la experiencia

Una columna CFT se decide en el cálculo pero se resuelve en el taller. Las perforaciones de venteo, las ventanas de llenado, el paso del hormigón a través de los diafragmas, la conexión de las vigas y el estado de la superficie interior del tubo —las adherencias de cálculo del Eurocódigo valen para una cara sin pintura, sin grasa y sin óxido suelto— quedan definidos antes de que el tubo llegue a obra.

Esa es la parte del sistema que pertenece a la estructura metálica principal. Cuando se proyecta junto con la secuencia de hormigonado, el tubo es encofrado, columna de montaje y armadura exterior a la vez. Cuando se proyecta como un tubo cualquiera que después se llena, se pierde buena parte de lo que justificaba elegirlo.

---

*Este apunte forma parte de la serie sobre sistemas que se apoyan en la estructura metálica principal. Se complementa con [conectores de corte](/blog/conectores-de-corte-seccion-mixta/) y con [chapa colaborante sobre estructura metálica](/blog/chapa-colaborante-sobre-estructura-metalica/).*

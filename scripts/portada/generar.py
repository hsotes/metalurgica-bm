# -*- coding: utf-8 -*-
"""Genera la portada de un apunte en formato revista cientifica.

    python scripts/portada/generar.py _programadas/2026-09-02_1100

Lee el titulo y la fecha del frontmatter del .md de la carpeta. El codigo y los
dos fragmentos salen de la tabla APUNTES, indexada por slug. Si en la carpeta
hay una imagen que no se llame portada.*, se usa como figura a la derecha con
un fundido hacia el azul de marca; si no hay ninguna, la portada sale
tipografica.

Paleta leida de src/styles/global.css: azul petroleo de fondo, celeste de
marca, y el verde lima --color-accent SOLO como adorno.
"""
import io
import os
import re
import sys
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LOGO = os.path.join(RAIZ, "public", "logos", "logo-blanco.png")

W, H = 1200, 630
AZUL_TOP = (15, 51, 71)    # --color-primary-dark  #0f3347
AZUL_BOT = (26, 77, 109)   # --color-primary       #1a4d6d
CELESTE = (117, 170, 219)  # celeste de marca      #75AADB
LIMA = (154, 205, 50)      # --color-accent        #9acd32  solo adorno
BLANCO = (255, 255, 255)
GRIS = (198, 214, 228)
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp")

F = "C:/Windows/Fonts/"
serif_bold = lambda s: ImageFont.truetype(F + "georgiab.ttf", s)
serif_ital = lambda s: ImageFont.truetype(F + "georgiai.ttf", s)
sans = lambda s: ImageFont.truetype(F + "segoeui.ttf", s)
sans_bold = lambda s: ImageFont.truetype(F + "segoeuib.ttf", s)

SHELTERS = u"Shelters y recintos para equipamiento crítico"
MODULAR = u"Construcción modular"
SISTEMAS = u"Sistemas compatibles con la estructura metálica"

# Los fragmentos son TEXTUALES del articulo: se verifican antes de dibujar.
APUNTES = {
    "disipacion-interna-equipos-aire-acondicionado-shelter": (
        "TBEX-APU-001", SHELTERS, [
            u"Prácticamente toda la energía eléctrica que entra termina convertida en calor dentro del volumen.",
            u"Un equipo sobrado no se detecta nunca, y ese es el problema.",
        ]),
    "union-portico-metalico-elemento-de-madera": (
        "ARQ-APU-001", SISTEMAS, [
            u"El problema no está en ninguno de los dos: está en el punto donde se tocan.",
            u"El acero de un pasador tiene una resistencia holgada.",
        ]),
    "resistencia-puesta-a-tierra-shelter-terreno-5-ohm": (
        "TBEX-APU-002", SHELTERS, [
            u"La resistencia de un sistema de puesta a tierra no la define el electrodo: la define el terreno.",
            u"El electrodo es apenas la interfaz.",
        ]),
    "acciones-de-viento-sobre-un-shelter-localidad-exacta": (
        "TBEX-APU-003", SHELTERS, [
            u"Un shelter rara vez está protegido por su entorno.",
            u"El cálculo de viento de un shelter es corto. Lo largo es conseguir las tres entradas.",
        ]),
    "pleno-bajo-piso-tecnico-cables-y-aire": (
        "TBEX-APU-004", SHELTERS, [
            u"Sirve para las dos cosas. Lo que no siempre se advierte es que no sirve para las dos cosas al mismo tiempo.",
            u"Los dos usos piden lo contrario del mismo volumen.",
        ]),
    "aislacion-incombustible-shelters-requisito-no-termico": (
        "TBEX-APU-005", SHELTERS, [
            u"Un material autoextinguible deja de arder cuando se retira la fuente; un material A1 nunca empieza.",
            u"Se están respondiendo dos preguntas distintas.",
        ]),
    "profundidad-del-rack-define-el-ancho-interior-del-shelter": (
        "TBEX-APU-006", SHELTERS, [
            u"La huella de una sala técnica no se define desde afuera hacia adentro.",
            u"Los tres metros salen de una suma de tres números, y esa suma se puede hacer el primer día.",
        ]),
    "oficinas-modulares-campamento-maquinaria-pesada": (
        "MOD-GUIA-004", MODULAR, [
            u"Es una estructura que trabaja más en el camión que en el sitio.",
            u"Un módulo climatizado sin control de presión termina succionando polvo por cada rendija.",
        ]),
    "ventilacion-recinto-baterias-hidrogeno-renovaciones": (
        "TBEX-APU-007", SHELTERS, [
            u"La válvula existe justamente porque hay algo que tiene que salir.",
            u"Puede mantener la temperatura perfecta mientras la concentración de hidrógeno sube sin que nada lo impida.",
        ]),
    "anclaje-shelter-reacciones-frontera-fundacion": (
        "TBEX-APU-008", SHELTERS, [
            u"Esa frontera no se resuelve con un bulón. Se resuelve con información.",
            u"La fricción desaparece exactamente en el instante en que se la necesita.",
        ]),
}


def buscar_fondo(carpeta):
    """Imagen de fondo de la portada.

    Se busca primero en <carpeta>/_fuentes/fondo.*  El publicador no mira
    subcarpetas, asi que el original de alta resolucion queda disponible para
    regenerar la portada sin terminar publicado como imagen suelta del articulo.
    """
    for base in (os.path.join(carpeta, "_fuentes"), carpeta):
        if not os.path.isdir(base):
            continue
        for f in sorted(os.listdir(base)):
            if f.lower().startswith("fondo") and f.lower().endswith(IMG_EXT):
                return os.path.join(base, f)
    return None


def frontmatter(ruta):
    texto = io.open(ruta, encoding="utf-8").read()
    bloque = re.match(r"^---\r?\n(.*?)\r?\n---", texto, re.S)
    if not bloque:
        raise SystemExit("El .md no tiene frontmatter valido: " + ruta)
    campos = {}
    for linea in bloque.group(1).split("\n"):
        kv = re.match(r"^(\w+):\s*(.*)$", linea)
        if kv:
            campos[kv.group(1)] = kv.group(2).strip().strip('"').strip("'")
    return campos, texto


def envolver(draw, texto, fuente, ancho):
    lineas, actual = [], ""
    for palabra in texto.split():
        prueba = (actual + " " + palabra).strip()
        if draw.textlength(prueba, font=fuente) <= ancho:
            actual = prueba
        else:
            if actual:
                lineas.append(actual)
            actual = palabra
    if actual:
        lineas.append(actual)
    return lineas


def letterspace(draw, xy, texto, fuente, fill, sp=2.2):
    x, y = xy
    for ch in texto:
        draw.text((x, y), ch, font=fuente, fill=fill)
        x += draw.textlength(ch, font=fuente) + sp
    return x


def rombo(draw, cx, cy, r, fill=None, borde=None, grosor=2):
    puntos = [(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)]
    draw.polygon(puntos, fill=fill, outline=borde, width=grosor)


def generar(carpeta):
    carpeta = os.path.join(RAIZ, carpeta) if not os.path.isabs(carpeta) else carpeta
    archivos = os.listdir(carpeta)

    mds = [f for f in archivos if f.endswith(".md")]
    if len(mds) != 1:
        raise SystemExit("La carpeta debe tener exactamente un .md")
    slug = os.path.splitext(mds[0])[0]
    if slug not in APUNTES:
        raise SystemExit("Sin entrada en la tabla APUNTES para el slug: " + slug)
    codigo, subseccion, fragmentos = APUNTES[slug]

    fm, cuerpo = frontmatter(os.path.join(carpeta, mds[0]))
    titulo = fm["title"]

    # Los fragmentos tienen que estar en el articulo, palabra por palabra.
    for frag in fragmentos:
        if frag not in cuerpo:
            raise SystemExit("Fragmento NO textual en %s:\n  %s" % (mds[0], frag))

    anio, mes, dia = fm["date"].split("-")
    cabecera_fecha = u"%s   ·   %s · %s · %s" % (codigo, dia, mes, anio)

    fondo = buscar_fondo(carpeta)

    # ------------------------------------------------------------ fondo
    lienzo = Image.new("RGB", (W, H), AZUL_TOP)
    d = ImageDraw.Draw(lienzo)
    for y in range(H):
        t = y / float(H - 1)
        d.line([(0, y), (W, y)],
               fill=tuple(int(AZUL_TOP[i] + (AZUL_BOT[i] - AZUL_TOP[i]) * t) for i in range(3)))

    if fondo:
        # Imagen a sangre: ocupa la portada entera, recortada al centro.
        foto = Image.open(fondo).convert("RGB")
        r_dest, r_foto = W / float(H), foto.width / float(foto.height)
        if r_foto > r_dest:
            nw = int(foto.height * r_dest)
            foto = foto.crop(((foto.width - nw) // 2, 0, (foto.width + nw) // 2, foto.height))
        else:
            nh = int(foto.width / r_dest)
            foto = foto.crop((0, (foto.height - nh) // 2, foto.width, (foto.height + nh) // 2))
        lienzo = foto.resize((W, H), Image.LANCZOS)

        # Tres velos encadenados para que el texto sea legible sobre la foto:
        # lateral desde la izquierda, banda de cabecera y banda de pie.
        def velar(base, pintar):
            capa = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            pintar(ImageDraw.Draw(capa))
            return Image.alpha_composite(base.convert("RGBA"), capa).convert("RGB")

        def lateral(cd):
            for x in range(W):
                a = int(236 * (1 - x / float(W - 1)) ** 1.25)
                cd.line([(x, 0), (x, H)], fill=AZUL_TOP + (a,))

        def cabecera(cd):
            for y in range(0, 200):
                cd.line([(0, y), (W, y)], fill=AZUL_TOP + (int(165 * (1 - y / 200.0) ** 1.2),))

        def pie(cd):
            for y in range(H - 110, H):
                t = (y - (H - 110)) / 110.0
                cd.line([(0, y), (W, y)], fill=AZUL_TOP + (int(165 * t ** 1.2),))

        for capa in (lateral, cabecera, pie):
            lienzo = velar(lienzo, capa)
        d = ImageDraw.Draw(lienzo)
        ANCHO = 620
    else:
        # Sin foto: motivo tipografico. Pauta de filetes finos que se desvanece,
        # como la trama de una lamina tecnica.
        capa = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        cd = ImageDraw.Draw(capa)
        for i, yy in enumerate(range(150, H - 60, 26)):
            alpha = int(38 * (1 - i / 20.0))
            if alpha > 0:
                cd.line([(770, yy), (W - 60, yy)], fill=CELESTE + (alpha,), width=1)
        rombo(cd, 1010, 400, 120, borde=LIMA + (46,), grosor=2)
        rombo(cd, 1010, 400, 78, borde=CELESTE + (34,), grosor=2)
        lienzo = Image.alpha_composite(lienzo.convert("RGBA"), capa).convert("RGB")
        d = ImageDraw.Draw(lienzo)
        ANCHO = 700

    # ------------------------------------------------------- adornos lima
    d.rectangle([0, 0, 7, H], fill=LIMA)
    d.line([(0, 0), (W, 0)], fill=LIMA, width=3)

    X0 = 62

    # ------------------------------------------------------------ cabecera
    logo = Image.open(LOGO).convert("RGBA")
    logo_w = 152
    logo = logo.resize((logo_w, int(logo.height * logo_w / float(logo.width))), Image.LANCZOS)
    lienzo.paste(logo, (X0, 46), logo)
    d = ImageDraw.Draw(lienzo)

    xt = X0 + logo_w + 26
    d.line([(xt - 14, 54), (xt - 14, 46 + logo.height - 8)], fill=LIMA, width=2)
    letterspace(d, (xt, 56), u"APUNTES TÉCNICOS", sans_bold(15), CELESTE, 2.6)
    d.text((xt, 84), subseccion, font=sans(14), fill=GRIS)
    x_cod = letterspace(d, (xt, 112), cabecera_fecha, sans_bold(12), (132, 162, 192), 1.2)
    rombo(d, x_cod + 12, 118, 4, fill=LIMA)

    d.line([(X0, 176), (W - 46, 176)], fill=(58, 92, 130), width=1)
    d.line([(X0, 180), (X0 + 120, 180)], fill=LIMA, width=3)

    # ------------------------------------------------------------- titulo
    tam = 40
    while tam > 24:
        ft = serif_bold(tam)
        lineas_t = envolver(d, titulo, ft, ANCHO)
        if len(lineas_t) <= 3:
            break
        tam -= 1

    y = 224
    for ln in lineas_t:
        d.text((X0, y), ln, font=ft, fill=BLANCO)
        y += int(tam * 1.26)

    # --------------------------------------------------------- fragmentos
    y += 26
    d.line([(X0, y), (X0 + 82, y)], fill=LIMA, width=4)
    y += 30

    ff = serif_ital(19)
    for frag in fragmentos:
        lineas_f = envolver(d, u"“%s”" % frag, ff, ANCHO - 30)
        alto = len(lineas_f) * 28
        d.line([(X0 + 2, y + 3), (X0 + 2, y + alto - 5)], fill=CELESTE, width=3)
        yy = y
        for ln in lineas_f:
            d.text((X0 + 24, yy), ln, font=ff, fill=GRIS)
            yy += 28
        y += alto + 22

    if y >= H - 70:
        raise SystemExit("Los fragmentos invaden el pie (y=%d). Acortarlos." % y)

    # ---------------------------------------------------------------- pie
    d.line([(X0, H - 52), (W - 46, H - 52)], fill=(52, 84, 120), width=1)
    rombo(d, X0 + 4, H - 30, 4, fill=LIMA)
    d.text((X0 + 18, H - 40), u"metalurgicabotomariani.com.ar", font=sans(13), fill=(140, 170, 200))

    salida = os.path.join(carpeta, "portada.jpg")
    lienzo.save(salida, "JPEG", quality=92, optimize=True)
    print("Portada: %s" % salida)
    print("  %s  |  titulo en %d lineas a %dpx  |  figura: %s"
          % (codigo, len(lineas_t), tam, os.path.basename(fondo) if fondo else "sin foto (tipografica)"))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Uso: python scripts/portada/generar.py <carpeta de _programadas>")
    generar(sys.argv[1])

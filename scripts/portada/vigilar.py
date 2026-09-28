# -*- coding: utf-8 -*-
"""Vigilante de la cola: portadas y vista previa automaticas.

Uso:  python scripts/portada/vigilar.py        (queda corriendo; Ctrl+C para cortar)
      python scripts/portada/vigilar.py --una  (una sola pasada)

Cada 3 segundos revisa _programadas/<fecha>/:
  1. Si en _fuentes/ aparece una imagen nueva que no empieza con "fondo" ni con
     "apoyo", la toma como fondo de portada: la renombra a fondo.<ext> (el fondo
     anterior, si habia, queda como fondo-anterior-<hora>.<ext>).
  2. Si el fondo, el .md o el generador son mas nuevos que portada.jpg, regenera
     la portada con generar.py.
  3. Si cambio cualquier cosa, regenera ../vista-previa-semana.html.

Las imagenes que empiezan con "apoyo" son auxiliares del cuerpo: no se tocan.
"""
import os
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
COLA = RAIZ / "_programadas"
GEN = RAIZ / "scripts" / "portada" / "generar.py"
PREVIA = RAIZ / "scripts" / "portada" / "vista_previa.py"
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp")
ENV = dict(os.environ, PYTHONIOENCODING="utf-8")


def log(msg):
    print("[%s] %s" % (datetime.now().strftime("%H:%M:%S"), msg), flush=True)


def carpetas():
    return [c for c in sorted(COLA.iterdir())
            if c.is_dir() and re.match(r"^\d{4}-\d{2}-\d{2}(_\d{4})?$", c.name)]


def adoptar_fondo(c):
    f = c / "_fuentes"
    if not f.is_dir():
        return False
    nuevas = [x for x in f.iterdir() if x.is_file() and x.suffix.lower() in IMG_EXT
              and not x.name.lower().startswith(("fondo", "apoyo"))]
    if not nuevas:
        return False
    nueva = max(nuevas, key=lambda x: x.stat().st_mtime)
    # esperar a que termine de copiarse
    t = nueva.stat().st_size
    time.sleep(1)
    if nueva.stat().st_size != t:
        return False
    for viejo in f.glob("fondo.*"):
        viejo.rename(f / ("fondo-anterior-%s%s" % (datetime.now().strftime("%H%M%S"), viejo.suffix.lower())))
    destino = f / ("fondo" + nueva.suffix.lower())
    nueva.rename(destino)
    log("%s: %s adoptada como fondo de portada" % (c.name, nueva.name))
    return True


def mtime(p):
    return p.stat().st_mtime if p.exists() else 0


FALLIDAS = {}


def huella_fuentes(c):
    fondos = list((c / "_fuentes").glob("fondo.*")) if (c / "_fuentes").is_dir() else []
    return max([mtime(GEN)] + [mtime(x) for x in fondos + list(c.glob("*.md"))])


def portada_vieja(c):
    h = huella_fuentes(c)
    if FALLIDAS.get(c.name) == h:
        return False
    return not (c / "portada.jpg").exists() or h > mtime(c / "portada.jpg")


def firma():
    """Huella de todo lo que afecta la vista previa."""
    h = []
    for c in carpetas():
        for x in c.rglob("*"):
            if x.is_file():
                h.append((str(x), x.stat().st_mtime))
    return tuple(h)


def pasada():
    cambio = False
    for c in carpetas():
        cambio |= adoptar_fondo(c)
        if portada_vieja(c):
            r = subprocess.run([sys.executable, str(GEN), str(c)], capture_output=True, text=True, encoding="utf-8", env=ENV)
            if r.returncode == 0:
                log("%s: portada regenerada (%s)" % (c.name, r.stdout.strip().splitlines()[-1].strip()))
            else:
                log("%s: NO se pudo generar la portada -> %s" % (c.name, (r.stderr or r.stdout).strip().splitlines()[-1]))
                FALLIDAS[c.name] = huella_fuentes(c)  # no reintentar hasta que algo cambie
            cambio = True
    return cambio


def previa():
    r = subprocess.run([sys.executable, str(PREVIA)], capture_output=True, text=True, encoding="utf-8", env=ENV)
    log(r.stdout.strip() or r.stderr.strip())


def main():
    pasada()
    previa()
    if "--una" in sys.argv:
        return
    ultima = firma()
    log("Vigilando %s ... (Ctrl+C para cortar)" % COLA)
    while True:
        time.sleep(3)
        pasada()
        f = firma()
        if f != ultima:
            previa()
            ultima = firma()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass

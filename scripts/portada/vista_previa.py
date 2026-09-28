# -*- coding: utf-8 -*-
"""Vista previa de la cola: cada articulo como se veria publicado + su post de LinkedIn.

Uso:  python scripts/portada/vista_previa.py
Salida: ../vista-previa-semana.html (fuera del repo, no se commitea).

Imita la pagina real del blog (src/pages/blog/[...slug].astro): cabecera con la
portada recortada a 21:9, categoria, fecha, autor, titulo, bajada y cuerpo con
los estilos .prose de src/styles/global.css. Debajo, la tarjeta de LinkedIn con
la portada completa 1200x630 y el texto de linkedin.txt.
"""
import html
import json
import os
import re
from datetime import date
from pathlib import Path

import markdown

RAIZ = Path(__file__).resolve().parents[2]
COLA = RAIZ / "_programadas"
SALIDA = RAIZ.parent / "vista-previa-semana.html"
SITIO = "https://www.metalurgicabotomariani.com.ar"
IMG_EXT = (".jpg", ".jpeg", ".png", ".webp")
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
         "septiembre", "octubre", "noviembre", "diciembre"]
DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]


def frontmatter(texto):
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?(.*)$", texto, re.S)
    if not m:
        return {}, texto
    fm = {}
    for linea in m.group(1).splitlines():
        kv = re.match(r"^(\w+):\s*(.*)$", linea)
        if not kv:
            continue
        clave, valor = kv.group(1), kv.group(2).strip()
        if valor.startswith("["):
            try:
                valor = json.loads(valor)
            except ValueError:
                valor = [v.strip().strip('"') for v in valor.strip("[]").split(",")]
        else:
            valor = valor.strip('"')
        fm[clave] = valor
    return fm, m.group(2)


def uri(p):
    return Path(p).resolve().as_uri()


def cuerpo_html(md, carpeta, slug):
    h = markdown.markdown(md, extensions=["tables"])
    # imagenes de la carpeta: /blog/{slug}/x.jpg -> archivo local
    h = re.sub(r'src="/blog/%s/([^"]+)"' % re.escape(slug),
               lambda m: 'src="%s"' % uri(carpeta / m.group(1)), h)
    # links internos: al sitio real (los de la cola todavia dan 404)
    h = re.sub(r'href="/', 'href="%s/' % SITIO, h)
    h = h.replace("<a href=", '<a target="_blank" href=')
    return h


def fondo_de(carpeta):
    f = carpeta / "_fuentes"
    if f.is_dir():
        for x in sorted(f.iterdir()):
            if x.name.lower().startswith("fondo") and x.suffix.lower() in IMG_EXT:
                return x
    return None


def articulos():
    salida = []
    for c in sorted(COLA.iterdir()):
        if not (c.is_dir() and re.match(r"^\d{4}-\d{2}-\d{2}(_\d{4})?$", c.name)):
            continue
        mds = [x for x in c.iterdir() if x.suffix == ".md"]
        if len(mds) != 1:
            continue
        slug = mds[0].stem
        fm, md = frontmatter(mds[0].read_text(encoding="utf-8"))
        y, m, d = map(int, c.name[:10].split("-"))
        dia = date(y, m, d)
        hora = c.name[11:13] + ":" + c.name[13:15] if "_" in c.name else "08:00"
        li = c / "linkedin.txt"
        portada = c / "portada.jpg"
        salida.append({
            "carpeta": c, "slug": slug, "fm": fm, "md": md, "dia": dia, "hora": hora,
            "portada": portada if portada.exists() else None,
            "fondo": fondo_de(c),
            "linkedin": li.read_text(encoding="utf-8") if li.exists() else None,
        })
    return salida


def fecha_larga(d):
    return "%d de %s de %d" % (d.day, MESES[d.month - 1], d.year)


def seccion(a, i):
    fm = a["fm"]
    e = html.escape
    img = uri(a["portada"]) + "?v=%d" % int(a["portada"].stat().st_mtime) if a["portada"] else ""
    estado_portada = ("con imagen" if a["fondo"] else "tipográfica provisoria") if a["portada"] else "SIN PORTADA"
    clase_estado = "ok" if a["fondo"] else "pend"
    tags = "".join('<span class="tag">%s</span>' % e(t) for t in (fm.get("tags") or []))
    li = e(a["linkedin"]).replace("\n", "<br>") if a["linkedin"] else '<em class="falta">Falta linkedin.txt</em>'
    li = re.sub(r"(https://\S+)", r'<a href="\1" target="_blank">\1</a>', li)
    li = re.sub(r"(#\w+)", r'<span class="hash">\1</span>', li)
    nchar = len(a["linkedin"]) if a["linkedin"] else 0
    desc = fm.get("description", "")
    return f"""
<section class="art" id="a{i}">
  <div class="meta-cola">
    <b>{DIAS[a['dia'].weekday()]} {a['dia'].strftime('%d/%m')} · {a['hora']} ART</b>
    <span class="{clase_estado}">Portada: {estado_portada}</span>
    <span>Slug: /blog/{e(a['slug'])}/</span>
    <span class="{'ok' if len(desc) <= 160 else 'pend'}">Descripción: {len(desc)} caracteres</span>
  </div>

  <div class="hero">{'<img src="%s">' % img if img else ''}<div class="grad"></div></div>
  <article class="contenedor">
    <a class="volver">&larr; Volver al blog</a>
    <div class="linea-meta">
      <span class="cat">{e(fm.get('category', ''))}</span>
      <span class="gris">{fecha_larga(a['dia'])}</span><span class="gris2">|</span>
      <span class="gris">{e(fm.get('author', ''))}</span>
    </div>
    <h1>{e(fm.get('title', ''))}</h1>
    <p class="bajada">{e(desc)}</p>
    <hr>
    <div class="prose">{cuerpo_html(a['md'], a['carpeta'], a['slug'])}</div>
    <div class="tags">{tags}</div>
  </article>

  <div class="linkedin">
    <div class="li-cab"><div class="avatar">FB</div><div><b>Facundo Boto Mariani</b><br><span class="gris">Publicación automática · {a['hora']} · {nchar} caracteres</span></div></div>
    <div class="li-texto">{li}</div>
    <div class="li-card">{'<img src="%s">' % img if img else ''}<div class="li-card-t"><b>{e(fm.get('title', ''))}</b><br><span class="gris">metalurgicabotomariani.com.ar</span></div></div>
  </div>
</section>"""


CSS = """
:root{--p:#1a4d6d;--pd:#0f3347;--pl:#2a6d8d;--acc:#9acd32;--g50:#f9fafb;--g100:#f3f4f6;--g200:#e5e7eb;--g400:#9ca3af;--g500:#6b7280;--g600:#4b5563;--g700:#374151;--g800:#1f2937;--g900:#111827}
*{box-sizing:border-box}body{margin:0;font-family:'Montserrat',system-ui,sans-serif;color:var(--g800);background:#e9eef2;-webkit-font-smoothing:antialiased}
nav{position:sticky;top:0;z-index:9;background:var(--pd);display:flex;gap:4px;padding:10px 16px;flex-wrap:wrap}
nav a{color:#fff;text-decoration:none;font-size:13px;padding:6px 12px;border-radius:20px;background:rgba(255,255,255,.08)}
nav a:hover{background:var(--pl)}nav .t{color:var(--acc);font-weight:700;margin-right:8px;align-self:center;font-size:13px}
.art{background:#fff;max-width:1100px;margin:28px auto;box-shadow:0 2px 14px rgba(0,0,0,.08);border-radius:8px;overflow:hidden}
.meta-cola{display:flex;gap:18px;flex-wrap:wrap;padding:10px 20px;background:var(--g100);font-size:12px;color:var(--g600)}
.meta-cola .ok{color:#3d7a12;font-weight:600}.meta-cola .pend{color:#b45309;font-weight:600}
.hero{position:relative;aspect-ratio:21/9;max-height:400px;overflow:hidden;background:var(--pd)}
.hero img{width:100%;height:100%;object-fit:cover;display:block}
.hero .grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(17,24,39,.8),rgba(17,24,39,.3),transparent)}
.contenedor{max-width:48rem;margin:0 auto;padding:40px 20px 30px}
.volver{color:var(--p);font-size:14px;font-weight:600;display:inline-block;margin-bottom:16px}
.linea-meta{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:16px}
.cat{background:var(--acc);color:var(--g900);font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:.03em}
.gris{color:var(--g500);font-size:14px}.gris2{color:var(--g400)}
h1{font-size:2.25rem;font-weight:700;color:var(--g900);margin:0 0 16px;line-height:1.2}
.bajada{font-size:1.125rem;color:var(--g600);margin:0 0 32px}
hr{border:none;border-top:1px solid var(--g200);margin:0 0 32px}
.prose h2{font-size:1.5rem;font-weight:700;color:var(--p);margin:2.5rem 0 1rem}
.prose h3{font-size:1.25rem;font-weight:600;color:var(--g800);margin:2rem 0 .75rem}
.prose p{margin:0 0 1.25rem;color:var(--g700);line-height:1.8}
.prose ul,.prose ol{margin:0 0 1.25rem;padding-left:1.5rem;color:var(--g700)}.prose li{margin-bottom:.5rem;line-height:1.7}
.prose strong{font-weight:700;color:var(--g900)}.prose a{color:var(--p);text-underline-offset:2px}
.prose blockquote{border-left:4px solid var(--acc);padding:1rem 1.5rem;margin:1.5rem 0;background:var(--g50)}
.prose table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.9rem}
.prose th{background:var(--p);color:#fff;padding:.75rem 1rem;text-align:left}.prose td{padding:.75rem 1rem;border-bottom:1px solid var(--g200)}
.prose tr:hover{background:var(--g50)}.prose hr{border-top:1px solid var(--g200);margin:2rem 0}
.prose img{border-radius:.5rem;margin:1.5rem 0;max-width:100%}
.tags{margin-top:40px;padding-top:24px;border-top:1px solid var(--g200);display:flex;gap:8px;flex-wrap:wrap}
.tag{background:var(--g100);color:var(--g600);font-size:12px;padding:4px 12px;border-radius:20px}
.linkedin{max-width:555px;margin:10px auto 40px;border:1px solid #dcdcdc;border-radius:8px;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;background:#fff}
.li-cab{display:flex;gap:10px;padding:12px 16px;align-items:center}.avatar{width:44px;height:44px;border-radius:50%;background:var(--p);color:#fff;display:grid;place-items:center;font-weight:700}
.li-texto{padding:0 16px 12px;line-height:1.45;color:rgba(0,0,0,.9)}.li-texto a{color:#0a66c2}.hash{color:#0a66c2;font-weight:600}
.li-card img{width:100%;display:block}.li-card-t{padding:10px 14px;background:#eef3f8;font-size:13px}
.falta{color:#b45309}
"""


def main():
    arts = articulos()
    nav = "".join('<a href="#a%d">%s %s</a>' % (i, DIAS[a["dia"].weekday()][:3], a["dia"].strftime("%d/%m"))
                  for i, a in enumerate(arts))
    cuerpo = "".join(seccion(a, i) for i, a in enumerate(arts))
    doc = f"""<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vista previa de la cola MBM</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<nav><span class="t">COLA MBM</span>{nav}</nav>{cuerpo}</body></html>"""
    SALIDA.write_text(doc, encoding="utf-8")
    print("Vista previa: %s (%d articulos)" % (SALIDA, len(arts)))


if __name__ == "__main__":
    main()

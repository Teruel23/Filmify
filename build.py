#!/usr/bin/env python3
"""Ensambla las páginas del sitio a partir de las partes compartidas.

A diferencia del prototipo de una sola página, aquí los assets son archivos
reales: el CSS, el JS y las imágenes se comparten entre todas las páginas y
el navegador los cachea una vez.
"""
import os, re, shutil

BASE = os.path.dirname(os.path.abspath(__file__))
P = lambda *a: os.path.join(BASE, *a)

CATS = ['camaras', 'objetivos', 'luces', 'audio', 'drones', 'gimbals', 'tripodes', 'arte', 'otros']
NOMBRES = {'camaras': 'Cámaras', 'objetivos': 'Objetivos', 'luces': 'Luces', 'audio': 'Audio',
           'drones': 'Drones', 'gimbals': 'Gimbals', 'tripodes': 'Trípodes', 'arte': 'Arte',
           'otros': 'Otros'}

header = open(P('partes/header.html'), encoding='utf-8').read()
footer = open(P('partes/footer.html'), encoding='utf-8').read()


def chips(activa=None, destino='buscar.html?cat='):
    out = []
    for k in CATS:
        act = ' is-active' if k == activa else ''
        cur = ' aria-current="true"' if k == activa else ''
        out.append(
            f'<a class="cat-chip{act}" href="{destino}{k}"{cur}>'
            f'<i style="-webkit-mask-image:url(assets/icons/{k}.png);'
            f'mask-image:url(assets/icons/{k}.png)"></i>{NOMBRES[k]}</a>')
    return '\n        '.join(out)


ESQUELETO = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo} · Filmify</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0B0A09">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="assets/icon-192.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<meta property="og:title" content="{titulo} · Filmify">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Shrikhand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="filmify.css">
</head>
<body{bodycls}>
<div class="filmgrain" aria-hidden="true"></div>
<a class="skip" href="#contenido">Saltar al contenido</a>

{header}

{cuerpo}

{footer}

<script src="data.js"></script>
<script src="filmify.js"></script>
{script}
</body>
</html>
"""


def extrae(txt, etiqueta):
    m = re.search(r'\{\{' + etiqueta + r'\}\}(.*?)\{\{/' + etiqueta + r'\}\}', txt, re.S)
    return m.group(1).strip() if m else ''


def limpia(txt):
    return re.sub(r'\{\{/?\w+\}\}.*?(?=\n)|\{\{\w+\}\}.*?\{\{/\w+\}\}', '', txt, flags=re.S)


def construye(nombre, activa=None, solido=True, desnudo=False):
    src = open(P('paginas', nombre), encoding='utf-8').read()
    titulo = extrae(src, 'TITULO') or 'Filmify'
    desc = extrae(src, 'DESC')
    script = extrae(src, 'SCRIPT')

    cuerpo = src
    for et in ('TITULO', 'DESC', 'SCRIPT'):
        cuerpo = re.sub(r'\{\{' + et + r'\}\}.*?\{\{/' + et + r'\}\}', '', cuerpo, flags=re.S)
    cuerpo = cuerpo.strip()

    # Las páginas «desnudas» (p. ej. el acceso) no llevan cabecera ni footer:
    # son pantallas a pantalla completa antes de entrar al marketplace.
    if desnudo:
        head = ''
        foot = ''
        bodycls = ' class="desnudo"'
    else:
        head = header.replace('{{HEADER_SOLID}}', ' solid' if solido else '')
        head = head.replace('{{CHIPS}}', chips(activa))
        foot = footer
        bodycls = ' class="interior"' if solido else ''

    html = ESQUELETO.format(
        titulo=titulo, desc=desc,
        bodycls=bodycls,
        header=head, cuerpo=cuerpo, footer=foot,
        script='<script>\n' + script + '\n</script>' if script else '')

    salida = P(nombre)
    open(salida, 'w', encoding='utf-8').write(html)
    return salida, len(html)


if __name__ == '__main__':
    paginas = [('index.html', None, False, False), ('buscar.html', None, True, False),
               ('equipo.html', None, True, False), ('reservar.html', None, True, False),
               ('reservas.html', None, True, False), ('publicar.html', None, True, False),
               ('favoritos.html', None, True, False), ('checkin.html', None, True, False),
               ('perfil.html', None, True, False), ('chat.html', None, True, False),
               ('entrar.html', None, False, True)]
    total = 0
    for p, activa, solido, desnudo in paginas:
        if not os.path.exists(P('paginas', p)):
            print(f'  (falta {p}, se salta)')
            continue
        ruta, n = construye(p, activa, solido, desnudo)
        total += n
        print(f'  {os.path.basename(ruta):18} {n/1024:6.1f} KB')
    print(f'\n  total HTML: {total/1024:.1f} KB')
    print(f'  css: {os.path.getsize(P("filmify.css"))/1024:.1f} KB · '
          f'js: {os.path.getsize(P("filmify.js"))/1024:.1f} KB · '
          f'data: {os.path.getsize(P("data.js"))/1024:.1f} KB')

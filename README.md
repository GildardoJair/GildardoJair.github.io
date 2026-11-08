# Parámetro Z · sitio personal (Quarto + GitHub Pages)

Portafolio y blog de ciencia de datos hecho con [Quarto](https://quarto.org). Publicado en https://gildardojair.github.io

## Estructura

```
mi-sitio/
├── _quarto.yml          # Título, menú, redes, temario lateral y opciones generales
├── styles.scss          # Colores, tipografía, barra superior, mesa de madera, tarjetas de papel
├── portada.css          # Estilos solo de la portada (foto, volcanes, carrusel, acerca de mí)
├── assets/site.js       # Estrellas, escenas ilustradas, dibujo por defecto y carrusel
├── assets/*.svg         # Texturas de papel y madera
├── _includes/           # Lienzo de estrellas y dibujo por defecto (se incluye en todas las páginas)
├── index.qmd            # Portada
├── proyectos.qmd        # Listado de proyectos (tarjetas)   ← proyectos/<nombre>/index.qmd
├── investigaciones.qmd  # Lista de papers desde referencias.bib
├── temas.qmd            # Listado de temas con filtro por área  ← temas/<area>/NN-nombre/index.qmd
├── blog.qmd             # Listado del blog                    ← posts/<nombre>/index.qmd
├── contacto.qmd         # Contacto
├── referencias.bib      # Tus papers (una entrada por paper)
└── .github/workflows/publish.yml   # Publicación automática en GitHub Pages
```

## Cómo agregar contenido

Cada sección tiene una carpeta `_plantilla` (las carpetas que empiezan con `_` no se publican). Cópiala con otro nombre y edita el encabezado.

| Quiero publicar... | Qué hago |
|---|---|
| Una nota de blog | Copia `posts/_plantilla` a `posts/mi-nota/` |
| Un tema | Copia `temas/_plantilla` a `temas/<area>/NN-nombre/` (el número define el orden del temario) |
| Un proyecto | Copia `proyectos/_plantilla` a `proyectos/mi-proyecto/` |
| Un paper | Pega la entrada BibTeX en `referencias.bib` |

- **Imagen de la tarjeta:** pon `image: figura.png` en el encabezado (la imagen va en la misma carpeta). Si no hay imagen, la tarjeta muestra un dibujo por defecto.
- **Áreas de Temas:** machine-learning, ia, fisica, matematicas, probabilidad. Para que una área nueva aparezca en el temario lateral, quita el `#` de su bloque en `_quarto.yml`.
- **Novedades de la portada:** se llenan solas con las 8 publicaciones más recientes de `posts/` y `temas/`.

## Probarlo en tu computadora

```bash
quarto preview
```

Se abre el sitio en el navegador y se actualiza al guardar. Nadie más lo ve.

## Publicar

```bash
git add .
git commit -m "Describe tu cambio"
git push
```

Cada `git push` a `main` ejecuta `.github/workflows/publish.yml`, que construye y publica el sitio en unos minutos.

> El sitio y el repositorio son **públicos**. No subas contraseñas, claves ni datos que no puedas compartir.

## Pendientes y detalles

- Foto de perfil: guarda `images/foto.jpg` y sigue la nota `EDITA` en `index.qmd`.
- URLs de Instagram y YouTube: líneas `EDITA` en `_quarto.yml`.
- Comentarios (Giscus): están apagados; las instrucciones están al final de `_quarto.yml`.

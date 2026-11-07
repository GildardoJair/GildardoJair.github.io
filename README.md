# Mi sitio web (Quarto + GitHub Pages)

Portafolio de ciencia de datos hecho con [Quarto](https://quarto.org).

## Estructura

```
mi-sitio/
├── _quarto.yml          # Configuración: título, menú, tema
├── index.qmd            # Página de inicio
├── proyectos.qmd        # Tus proyectos
├── blog.qmd             # Lista automática de las notas en posts/
├── contacto.qmd         # Enlaces de contacto
├── styles.scss          # Colores, tipografía y fondo (todo el sitio)
├── portada.css          # Estilos solo de la portada (aurora, foto, tarjetas)
├── investigaciones.qmd  # Lista de papers generada desde referencias.bib
├── referencias.bib      # Tus papers (una entrada por paper)
├── posts/
│   └── primera-nota/
│       └── index.qmd    # Cada carpeta con un index.qmd es una entrada del blog
└── .github/workflows/
    └── publish.yml      # Publicación automática en GitHub Pages
```

## 1. Probarlo en tu computadora

1. Instala Quarto desde <https://quarto.org/docs/get-started/>.
2. En la carpeta del sitio, ejecuta:

   ```bash
   quarto preview
   ```

   Se abre el sitio en tu navegador y se actualiza solo al guardar cambios. Nadie más lo ve.

## 2. Personalizarlo

Busca `TU-USUARIO`, `TU-PERFIL`, `tu-correo` y los comentarios `EDITA` en los archivos y reemplázalos con tus datos. Para encontrarlos todos de una vez:

```bash
grep -rn "TU-\|EDITA\|tu-correo" --include="*.qmd" --include="*.yml" .
```

## 3. Publicarlo en GitHub Pages

1. En GitHub, crea un repositorio nuevo (por ejemplo `mi-sitio`; si lo llamas `TU-USUARIO.github.io` tu sitio quedará en la raíz de esa dirección).
2. Sube el proyecto:

   ```bash
   git init
   git add .
   git commit -m "Primer commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/mi-sitio.git
   git push -u origin main
   ```

3. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
4. Cada `git push` a `main` ejecuta `.github/workflows/publish.yml`, que construye y publica el sitio. Puedes ver el progreso en la pestaña **Actions**.

> Recuerda: el sitio publicado y el repositorio (con la cuenta gratuita) son **públicos**. No subas contraseñas, claves ni datos que no puedas compartir.

## 4. Ejecutar código en tus notas

Si en una nota escribes un bloque con `{python}` en lugar de `python`, Quarto ejecuta el código y muestra el resultado. Para que funcione:

1. Renderiza **en tu computadora** (necesitas Python y `jupyter` instalados): `quarto render`.
2. Haz commit de la carpeta `_freeze/` que se genera. Ahí quedan guardados los resultados.
3. Al hacer push, GitHub usa esos resultados guardados y no necesita reejecutar tu código.

Si cambias el código de una nota, vuelve a renderizar localmente antes de hacer push.

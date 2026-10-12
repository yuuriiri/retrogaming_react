# RetroGaming — Tienda de videojuegos

Sitio web de una tienda online de videojuegos, desarrollado como **Evaluación Final Transversal (EFT)** del curso **Desarrollo Frontend I (PFY2201)**, DUOC UC.

La página principal muestra el catálogo de videojuegos, permite filtrarlos por categoría, agregarlos o eliminarlos de la lista, armar un carrito de compras y contactar al administrador mediante un formulario con validación.

- **Repositorio:** https://github.com/yuuriiri/retrogaming_react
- **Sitio publicado:** https://yuuriiri.github.io/retrogaming_react/
- **Autor/a:** Emilia Acevedo Steinmetz

## Tecnologías utilizadas

- **HTML5** con etiquetas semánticas (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** (estilos personalizados con una paleta propia)
- **Bootstrap 5.3** (navbar, tarjetas, grilla responsiva, formularios y alertas), cargado por CDN
- **JavaScript (ES6+)**
- **React 19** (componentes funcionales y hooks)
- **Vite** como herramienta de desarrollo y empaquetado
- **gh-pages** para publicar en GitHub Pages

## Funcionalidades

- **Catálogo dinámico:** los videojuegos se cargan desde `public/productos.json` con `fetch` y `useEffect`. Si la carga falla, se muestra un mensaje de error con un botón para reintentar.
- **Tarjetas de producto:** cada juego muestra imagen, nombre, categoría, precio (con precio de oferta cuando corresponde) y descripción.
- **Filtro por categoría:** botones generados automáticamente a partir de las categorías existentes, más la opción "Todas".
- **Agregar y eliminar videojuegos:** un formulario permite añadir juegos nuevos a la lista, y cada tarjeta tiene un botón para eliminarla.
- **Carrito de compras:** agregar y quitar productos, contador en el navbar y total calculado.
- **Formulario de contacto:** campos nombre, correo y mensaje, con validación y mensajes de error antes de enviar.
- **Diseño responsivo:** se adapta a celular, tablet y escritorio con Bootstrap 5 (menú hamburguesa incluido).

## Estructura del proyecto

```
retrogaming_react/
├── index.html                 # Página base (carga Bootstrap y la fuente)
├── package.json
├── vite.config.js             # Configuración de Vite (base para GitHub Pages)
├── public/
│   ├── favicon.svg
│   └── productos.json         # Datos de los videojuegos
└── src/
    ├── main.jsx               # Punto de entrada de React
    ├── App.jsx                # Componente raíz: estado y conexión entre componentes
    ├── App.css                # Estilos personalizados
    ├── index.css              # Estilos globales mínimos
    └── components/
        ├── Navbar.jsx             # Barra de navegación
        ├── FiltroCategorias.jsx   # Botones de filtro
        ├── ListaVideojuegos.jsx   # Grilla de tarjetas
        ├── ProductCard.jsx        # Tarjeta de un videojuego
        ├── FormularioAgregar.jsx  # Formulario para agregar juegos
        ├── Cart.jsx               # Carrito de compras
        ├── FormularioContacto.jsx # Formulario de contacto con validación
        └── Footer.jsx             # Pie de página
```

## Cómo funcionan los componentes

`App` guarda el estado principal (lista de juegos, carrito y categoría seleccionada) y lo reparte a los demás componentes mediante **props**. Los componentes hijos avisan los cambios al padre con funciones recibidas por props. Por ejemplo, al elegir una categoría en `FiltroCategorias`, `App` actualiza su estado y `ListaVideojuegos` muestra solo los juegos de esa categoría.

## Instalación y uso

### Probar sin instalar nada

El sitio ya está publicado y se puede abrir directamente en el navegador: https://yuuriiri.github.io/retrogaming_react/

### Requisitos

- [Node.js](https://nodejs.org/) **20.19 o superior** (o 22.12 o superior). Con versiones anteriores, como Node 18, Vite no funciona. Para revisar tu versión: `node -v`
- [Git](https://git-scm.com/) (solo si vas a clonar el repositorio)
- Conexión a internet (Bootstrap, la fuente y las imágenes de los juegos se cargan desde internet)

### Opción A: clonar desde GitHub

1. Clonar el repositorio y entrar a la carpeta:

```bash
   git clone https://github.com/yuuriiri/retrogaming_react.git
   cd retrogaming_react
```

2. Instalar las dependencias:

```bash
   npm install
```

3. Iniciar el servidor de desarrollo:

```bash
   npm run dev
```

4. Abrir en el navegador la dirección que aparece en la terminal (normalmente `http://localhost:5173/retrogaming_react/`).

### Opción B: desde el archivo ZIP

1. Descomprimir el archivo ZIP.
2. Abrir una terminal dentro de la carpeta que contiene el archivo `package.json`.
3. Instalar las dependencias:

```bash
   npm install
```

4. Iniciar el servidor de desarrollo:

```bash
   npm run dev
```

5. Abrir en el navegador la dirección que aparece en la terminal (normalmente `http://localhost:5173/retrogaming_react/`).

### Otros comandos

| Comando | Descripción |
| --- | --- |
| `npm run build` | Genera la versión de producción en la carpeta `dist` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |
| `npm run deploy` | Compila y publica en GitHub Pages (rama `gh-pages`) |

## Cómo probar las funcionalidades

1. **Filtro:** presiona los botones de categoría sobre el catálogo; la lista se actualiza al instante.
2. **Agregar juego:** completa el formulario "Agregar un videojuego". Si usas una categoría nueva, aparece un botón nuevo en el filtro.
3. **Eliminar juego:** presiona "Eliminar" en una tarjeta.
4. **Carrito:** presiona "Agregar al carrito" y revisa el contador y el total.
5. **Contacto:** envía el formulario vacío o con un correo inválido para ver los errores; con datos válidos aparece un mensaje de confirmación (el envío es simulado).

## Notas

- Los juegos agregados o eliminados solo cambian en la sesión actual: al recargar la página vuelve a cargarse la lista original de `productos.json`.
- El formulario de contacto no envía correos reales; simula el envío.
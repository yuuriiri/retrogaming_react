// Botones para filtrar el catálogo por categoría.
// Props:
//   categorias       -> arreglo de strings, ej: ['Aventura', 'Acción']
//   categoriaActiva  -> la categoría seleccionada ('Todas' = sin filtro)
//   onSeleccionar    -> función que se llama con la categoría elegida
function FiltroCategorias(props) {
  // Siempre ofrecemos la opción "Todas" al principio.
  const opciones = ['Todas', ...props.categorias];

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4" role="group" aria-label="Filtrar por categoría">
      {opciones.map(function (categoria) {
        const activa = categoria === props.categoriaActiva;
        return (
          <button
            key={categoria}
            type="button"
            className={activa ? 'btn btn-retro' : 'btn btn-outline-retro'}
            onClick={function () { props.onSeleccionar(categoria); }}
          >
            {categoria}
          </button>
        );
      })}
    </div>
  );
}

export default FiltroCategorias;
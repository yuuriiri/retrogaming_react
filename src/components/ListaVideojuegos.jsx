import ProductCard from './ProductCard';

// Lista de videojuegos en una grilla responsiva de Bootstrap
// (1 columna en móvil, 2 en tablet, 3-4 en escritorio).
// Props:
//   productos     -> arreglo de videojuegos YA filtrados
//   carrito       -> arreglo con los productos del carrito (para saber cuáles están dentro)
//   onAgregar     -> función(producto) para agregar al carrito
//   onEliminar    -> función(id) para eliminar del catálogo
function ListaVideojuegos(props) {
  // Renderizado condicional: si no hay productos, avisamos al usuario.
  if (props.productos.length === 0) {
    return <p className="text-center mensaje-vacio">No hay videojuegos en esta categoría.</p>;
  }

  return (
    <div className="row g-4">
      {props.productos.map(function (producto) {
        const enCarrito = props.carrito.some(function (item) {
          return item.id === producto.id;
        });
        return (
          <div key={producto.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <ProductCard
              producto={producto}
              enCarrito={enCarrito}
              onAgregar={props.onAgregar}
              onEliminar={props.onEliminar}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListaVideojuegos;
import { useState } from 'react';

// Tarjeta de un videojuego (componente "card" de Bootstrap 5).
// Props:
//   producto    -> objeto con nombre, categoria, precio, precioOferta, descripcion, imagen, stock
//   enCarrito   -> true si el producto ya está en el carrito
//   onAgregar   -> función(producto) para agregarlo al carrito
//   onEliminar  -> función(id) para eliminarlo del catálogo
function ProductCard(props) {
  const producto = props.producto;
  const tieneOferta = producto.precioOferta !== null;

  // Estado local: cada tarjeta recuerda si es favorita.
  const [esFavorito, setEsFavorito] = useState(false);

  return (
    <div className="card h-100 card-retro">
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={'Portada de ' + producto.nombre}
          className="card-img-top product-img"
        />
      )}

      <div className="card-body d-flex flex-column">
        <span className="badge badge-categoria align-self-start mb-2">{producto.categoria}</span>
        <h3 className="card-title h5">{producto.nombre}</h3>
        <p className="card-text product-desc">{producto.descripcion}</p>

        {/* Precio: con oferta se muestra el normal tachado + el de oferta */}
        {tieneOferta ? (
          <p className="product-price mt-auto">
            <span className="precio-tachado">${producto.precio.toLocaleString('es-CL')}</span>{' '}
            <span className="precio-oferta">${producto.precioOferta.toLocaleString('es-CL')}</span>
          </p>
        ) : (
          <p className="product-price mt-auto">${producto.precio.toLocaleString('es-CL')}</p>
        )}

        {/* Botón de carrito: sin stock / en el carrito / agregar */}
        {producto.stock === 0 ? (
          <p className="sin-stock mb-2">Sin stock</p>
        ) : props.enCarrito ? (
          <button className="btn btn-secondary w-100 mb-2" disabled>
            En el carrito
          </button>
        ) : (
          <button
            className="btn btn-retro w-100 mb-2"
            onClick={function () { props.onAgregar(producto); }}
          >
            Agregar al carrito
          </button>
        )}

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-light flex-fill"
            onClick={function () { setEsFavorito(!esFavorito); }}
          >
            {esFavorito ? '❤️ Favorito' : '🤍 Favorito'}
          </button>
          <button
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={function () { props.onEliminar(producto.id); }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
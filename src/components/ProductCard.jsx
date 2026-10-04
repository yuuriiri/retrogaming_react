import { useState } from 'react';

function ProductCard(props) {
  const producto = props.producto;
  const tieneOferta = producto.precioOferta !== null;

  // Estado local de ESTE componente: cada card tiene su propio favorito,
  // independiente de las demás.
  const [esFavorito, setEsFavorito] = useState(false);

  return (
    <div className="product-card">
      <button
        className="btn-favorito"
        onClick={function () { setEsFavorito(!esFavorito); }}
      >
        {esFavorito ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}
      </button>

      {producto.imagen && (
        <img src={producto.imagen} alt={producto.nombre} className="product-img" />
      )}

      <h3>{producto.nombre}</h3>
      <p className="product-desc">{producto.descripcion}</p>

      {tieneOferta ? (
        <p className="product-price">
          <span className="precio-tachado">${producto.precio.toLocaleString('es-CL')}</span>
          {" "}
          <span className="precio-oferta">${producto.precioOferta.toLocaleString('es-CL')}</span>
        </p>
      ) : (
        <p className="product-price">${producto.precio.toLocaleString('es-CL')}</p>
      )}

      {producto.stock === 0 ? (
        <p className="sin-stock">Sin stock</p>
      ) : props.enCarrito ? (
        <button className="btn-en-carrito" disabled>
          En el carrito
        </button>
      ) : (
        <button onClick={function () { props.onAgregar(producto); }}>
          Agregar al carrito
        </button>
      )}
    </div>
  );
}

export default ProductCard;
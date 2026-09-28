function ProductCard(props) {
  const producto = props.producto;
  const tieneOferta = producto.precioOferta !== null;

  return (
    <div className="product-card">
      {producto.imagen && (
        <img src={producto.imagen} alt={producto.nombre} className="product-img" />
      )}

      <h3>{producto.nombre}</h3>
      <p className="product-desc">{producto.descripcion}</p>

      {/* Renderizado condicional: precio normal vs precio en oferta */}
      {tieneOferta ? (
        <p className="product-price">
          <span className="precio-tachado">${producto.precio.toLocaleString('es-CL')}</span>
          {" "}
          <span className="precio-oferta">${producto.precioOferta.toLocaleString('es-CL')}</span>
        </p>
      ) : (
        <p className="product-price">${producto.precio.toLocaleString('es-CL')}</p>
      )}

      {/* Renderizado condicional: sin stock deshabilita el botón */}
      {producto.stock > 0 ? (
        <button onClick={function () { props.onAgregar(producto); }}>
          Agregar al carrito
        </button>
      ) : (
        <p className="sin-stock">Sin stock</p>
      )}
    </div>
  );
}

export default ProductCard;
function Cart(props) {
  const carrito = props.carrito;

  const total = carrito.reduce(function (suma, item) {
    const precio = item.precioOferta !== null ? item.precioOferta : item.precio;
    return suma + precio;
  }, 0);

  return (
    <div className="cart">
      <h2>Tu Carrito ({carrito.length})</h2>

      {/* Renderizado condicional: carrito vacío vs con productos */}
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="cart-list">
          {carrito.map(function (item, index) {
            const precio = item.precioOferta !== null ? item.precioOferta : item.precio;
            return (
              <li key={index}>
                {item.nombre} — ${precio.toLocaleString('es-CL')}
                <button onClick={function () { props.onQuitar(index); }}>
                  Quitar
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="cart-total">
        <strong>Total: ${total.toLocaleString('es-CL')}</strong>
      </p>
    </div>
  );
}

export default Cart;
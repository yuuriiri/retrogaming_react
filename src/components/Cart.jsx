// Carrito de compras.
// Props:
//   carrito    -> arreglo de productos agregados
//   onQuitar   -> función(index) para quitar un producto del carrito
function Cart(props) {
  const carrito = props.carrito;

  // Precio efectivo: si tiene oferta se usa ese, si no el normal.
  function precioFinal(item) {
    return item.precioOferta !== null ? item.precioOferta : item.precio;
  }

  const total = carrito.reduce(function (suma, item) {
    return suma + precioFinal(item);
  }, 0);

  return (
    <div className="cart">
      <h2 className="h4 text-white">Tu Carrito ({carrito.length})</h2>

      {/* Renderizado condicional: carrito vacío vs con productos */}
      {carrito.length === 0 ? (
        <p className="mb-0">Tu carrito está vacío.</p>
      ) : (
        <ul className="list-group list-group-flush cart-list">
          {carrito.map(function (item, index) {
            return (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.nombre} — ${precioFinal(item).toLocaleString('es-CL')}</span>
                <button
                  className="btn btn-sm btn-coral"
                  onClick={function () { props.onQuitar(index); }}
                >
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
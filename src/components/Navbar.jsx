// Barra de navegación (Bootstrap 5).
// Props:
//   cantidadCarrito -> número de productos en el carrito (se muestra en un badge)
function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-retro sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">
          🎮 RetroGaming
        </a>

        {/* Botón hamburguesa: aparece en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#catalogo">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#carrito">
                Carrito{' '}
                <span className="badge rounded-pill badge-retro">
                  {props.cantidadCarrito}
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
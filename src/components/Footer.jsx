// Pie de página (etiqueta semántica <footer>) con datos de contacto.
function Footer() {
  return (
    <footer className="footer-retro mt-5 py-4">
      <div className="container">
        <div className="row gy-3">
          <div className="col-md-4">
            <h2 className="h5 text-white">RetroGaming</h2>
            <p className="mb-0">Tu tienda online de videojuegos.</p>
          </div>
          <div className="col-md-4">
            <h2 className="h5 text-white">Contacto</h2>
            <p className="mb-0">contacto@retrogaming.cl</p>
            <p className="mb-0">+56 9 1234 5678</p>
          </div>
          <div className="col-md-4">
            <h2 className="h5 text-white">Síguenos</h2>
            <p className="mb-0">Instagram: @retrogaming</p>
            <p className="mb-0">Discord: RetroGaming Club</p>
          </div>
        </div>
        <hr />
        <p className="text-center small mb-0">
          © 2026 RetroGaming — Proyecto EFT Desarrollo Frontend I
        </p>
      </div>
    </footer>
  );
}

export default Footer;
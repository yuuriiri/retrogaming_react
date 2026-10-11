import { useState } from 'react';

// Formulario para AGREGAR un videojuego nuevo al catálogo.
// Props:
//   categorias  -> categorías existentes (se sugieren en el campo categoría)
//   onAgregar   -> función(nuevoJuego) que el padre (App) usa para actualizar su estado
function FormularioAgregar(props) {
  const vacio = { nombre: '', categoria: '', descripcion: '', precio: '', imagen: '' };
  const [datos, setDatos] = useState(vacio);
  const [error, setError] = useState('');

  function manejarCambio(evento) {
    const campo = evento.target.name;
    const valor = evento.target.value;
    setDatos(function (actuales) {
      return { ...actuales, [campo]: valor };
    });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const precio = Number(datos.precio);

    // Validaciones básicas
    if (datos.nombre.trim() === '' || datos.categoria.trim() === '' || datos.descripcion.trim() === '') {
      setError('Nombre, categoría y descripción son obligatorios.');
      return;
    }
    if (!Number.isFinite(precio) || precio <= 0) {
      setError('El precio debe ser un número mayor que 0.');
      return;
    }

    // Avisamos al padre con el nuevo juego (sin id: el padre se lo asigna).
    props.onAgregar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria.trim(),
      descripcion: datos.descripcion.trim(),
      precio: precio,
      precioOferta: null,
      stock: 1,
      imagen: datos.imagen.trim()
    });

    setDatos(vacio);
    setError('');
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="form-retro">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nuevo-nombre" className="form-label">Nombre</label>
          <input id="nuevo-nombre" name="nombre" type="text" className="form-control"
            value={datos.nombre} onChange={manejarCambio} />
        </div>
        <div className="col-md-6">
          <label htmlFor="nuevo-categoria" className="form-label">Categoría</label>
          <input id="nuevo-categoria" name="categoria" type="text" className="form-control"
            list="lista-categorias" value={datos.categoria} onChange={manejarCambio} />
          <datalist id="lista-categorias">
            {props.categorias.map(function (c) {
              return <option key={c} value={c} />;
            })}
          </datalist>
        </div>
        <div className="col-12">
          <label htmlFor="nuevo-descripcion" className="form-label">Descripción</label>
          <input id="nuevo-descripcion" name="descripcion" type="text" className="form-control"
            value={datos.descripcion} onChange={manejarCambio} />
        </div>
        <div className="col-md-4">
          <label htmlFor="nuevo-precio" className="form-label">Precio (CLP)</label>
          <input id="nuevo-precio" name="precio" type="number" min="1" className="form-control"
            value={datos.precio} onChange={manejarCambio} />
        </div>
        <div className="col-md-8">
          <label htmlFor="nuevo-imagen" className="form-label">URL de la imagen (opcional)</label>
          <input id="nuevo-imagen" name="imagen" type="url" className="form-control"
            value={datos.imagen} onChange={manejarCambio} />
        </div>
      </div>

      <button type="submit" className="btn btn-retro mt-3">Agregar videojuego</button>
    </form>
  );
}

export default FormularioAgregar;
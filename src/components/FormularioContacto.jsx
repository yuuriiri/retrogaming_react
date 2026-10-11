import { useState } from 'react';

// Formulario de contacto con validación (nombre, email y mensaje).
// Es un "formulario controlado": React guarda lo que escribe el usuario en el estado.
function FormularioContacto() {
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Revisa los datos y devuelve un objeto con un mensaje por cada campo inválido.
  function validar(valores) {
    const nuevosErrores = {};

    if (valores.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    // Expresión regular simple: algo@algo.algo
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valores.email.trim() === '') {
      nuevosErrores.email = 'El correo es obligatorio.';
    } else if (!patronEmail.test(valores.email.trim())) {
      nuevosErrores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.com.';
    }

    if (valores.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return nuevosErrores;
  }

  // Se ejecuta cada vez que el usuario escribe en un campo.
  function manejarCambio(evento) {
    const campo = evento.target.name;
    const valor = evento.target.value;
    setDatos(function (actuales) {
      return { ...actuales, [campo]: valor };
    });
    setEnviado(false);
  }

  // Se ejecuta al presionar "Enviar".
  function manejarEnvio(evento) {
    evento.preventDefault(); // evita que la página se recargue

    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    // Si no hay errores, "enviamos" (simulado) y limpiamos el formulario.
    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
      setDatos({ nombre: '', email: '', mensaje: '' });
    } else {
      setEnviado(false);
    }
  }

  // Devuelve la clase de Bootstrap según si el campo tiene error.
  function claseCampo(campo) {
    return errores[campo] ? 'form-control is-invalid' : 'form-control';
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="form-retro">
      {enviado && (
        <div className="alert alert-success" role="alert">
          ¡Mensaje enviado! Te responderemos pronto.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={claseCampo('nombre')}
          value={datos.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          className={claseCampo('email')}
          value={datos.email}
          onChange={manejarCambio}
        />
        {errores.email && <div className="invalid-feedback">{errores.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          className={claseCampo('mensaje')}
          value={datos.mensaje}
          onChange={manejarCambio}
        ></textarea>
        {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
      </div>

      <button type="submit" className="btn btn-retro">Enviar mensaje</button>
    </form>
  );
}

export default FormularioContacto;
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FiltroCategorias from './components/FiltroCategorias';
import ListaVideojuegos from './components/ListaVideojuegos';
import FormularioAgregar from './components/FormularioAgregar';
import Cart from './components/Cart';
import FormularioContacto from './components/FormularioContacto';
import Footer from './components/Footer';
import './App.css';

// Componente raíz. Aquí vive el ESTADO principal y se reparte a los hijos mediante props.
function App() {
  // Catálogo de videojuegos (empieza vacío hasta que useEffect lo llene).
  const [productos, setProductos] = useState([]);
  // Mensaje de carga y de error para el fetch.
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  // Carrito de compras.
  const [carrito, setCarrito] = useState([]);
  // Categoría seleccionada en el filtro ('Todas' = mostrar todo).
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  // Pide los datos a public/productos.json y actualiza el estado cuando llegan.
  // Valida response.ok antes de leer el JSON y muestra un error si algo falla.
  function pedirProductos() {
    fetch(`${import.meta.env.BASE_URL}productos.json`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error al cargar productos: ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        setProductos(data);
        setCargando(false);
      })
      .catch(function (err) {
        console.error(err);
        setError('No pudimos cargar los videojuegos. Intenta nuevamente.');
        setCargando(false);
      });
  }

  // Botón "Reintentar": reinicia los mensajes y vuelve a pedir los datos.
  function reintentar() {
    setCargando(true);
    setError('');
    pedirProductos();
  }

  // useEffect con [] : se ejecuta UNA sola vez, cuando App aparece en pantalla.
  // (cargando ya parte en true, por eso no hace falta cambiarlo aquí).
  useEffect(function () {
    pedirProductos();
  }, []);

  // ---- Carrito ----
  function agregarAlCarrito(producto) {
    setCarrito(function (actual) {
      return [...actual, producto];
    });
  }

  function quitarDelCarrito(index) {
    setCarrito(function (actual) {
      return actual.filter(function (_, i) {
        return i !== index;
      });
    });
  }

  // ---- Lista de videojuegos: agregar y eliminar ----
  function agregarJuego(nuevoJuego) {
    // Id único: el mayor id existente + 1.
    const nuevoId = productos.reduce(function (max, p) {
      return p.id > max ? p.id : max;
    }, 0) + 1;

    setProductos(function (actual) {
      return [...actual, { ...nuevoJuego, id: nuevoId }];
    });
  }

  function eliminarJuego(id) {
    setProductos(function (actual) {
      return actual.filter(function (p) {
        return p.id !== id;
      });
    });
    // Si estaba en el carrito, también lo sacamos.
    setCarrito(function (actual) {
      return actual.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  // ---- Datos derivados (se calculan a partir del estado) ----
  // Categorías únicas presentes en el catálogo.
  const categorias = [...new Set(productos.map(function (p) { return p.categoria; }))];

  // Si la categoría activa desaparece (por eliminar su último juego), volvemos a 'Todas'.
  const categoriaValida = categoriaActiva === 'Todas' || categorias.includes(categoriaActiva)
    ? categoriaActiva
    : 'Todas';

  // Productos visibles según el filtro.
  const productosFiltrados = categoriaValida === 'Todas'
    ? productos
    : productos.filter(function (p) { return p.categoria === categoriaValida; });

  return (
    <>
      <Navbar cantidadCarrito={carrito.length} />

      <header id="inicio" className="hero text-center">
        <div className="container">
          <h1>Bienvenido a RetroGaming</h1>
          <p className="lead">Explora nuestra colección de videojuegos.</p>
          <a href="#catalogo" className="btn btn-retro btn-lg">Ver catálogo</a>
        </div>
      </header>

      <main className="container">
        <section id="catalogo" className="seccion">
          <h2 className="text-center titulo-seccion">Catálogo</h2>

          {cargando && <p className="text-center mensaje-vacio">Cargando productos...</p>}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}{' '}
              <button className="btn btn-sm btn-outline-danger ms-2" onClick={reintentar}>
                Reintentar
              </button>
            </div>
          )}

          {!cargando && !error && (
            <>
              <FiltroCategorias
                categorias={categorias}
                categoriaActiva={categoriaValida}
                onSeleccionar={setCategoriaActiva}
              />
              <ListaVideojuegos
                productos={productosFiltrados}
                carrito={carrito}
                onAgregar={agregarAlCarrito}
                onEliminar={eliminarJuego}
              />
            </>
          )}
        </section>

        <section id="agregar" className="seccion">
          <h2 className="text-center titulo-seccion">Agregar un videojuego</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <FormularioAgregar categorias={categorias} onAgregar={agregarJuego} />
            </div>
          </div>
        </section>

        <section id="carrito" className="seccion">
          <Cart carrito={carrito} onQuitar={quitarDelCarrito} />
        </section>

        <section id="contacto" className="seccion">
          <h2 className="text-center titulo-seccion">Contacto</h2>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <FormularioContacto />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
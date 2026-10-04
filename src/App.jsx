import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import './App.css';

function App() {
  // Estado del catálogo: empieza vacío hasta que useEffect lo llene.
  const [productos, setProductos] = useState([]);

  // Estado de carga: permite mostrar "Cargando..." mientras llega el fetch.
  const [cargando, setCargando] = useState(true);

  // Estado del carrito, igual que la semana pasada.
  const [carrito, setCarrito] = useState([]);

  // useEffect con dependencias vacías [] : se ejecuta UNA SOLA VEZ,
  // justo cuando el componente App aparece en pantalla por primera vez.
  // Aquí simulamos la carga de datos desde una fuente externa.
  useEffect(function () {
    fetch(`${import.meta.env.BASE_URL}productos.json`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error al cargar productos: ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        setProductos(data);   // actualiza el catálogo con los datos recibidos
        setCargando(false);   // avisa que la carga terminó
      })
      .catch(function (error) {
        console.error(error);
        setCargando(false);
      });
  }, []); // <- array de dependencias vacío: correr solo al montar el componente

  function agregarAlCarrito(producto) {
    setCarrito(function (carritoActual) {
      return [...carritoActual, producto];
    });
  }

  function quitarDelCarrito(index) {
    setCarrito(function (carritoActual) {
      return carritoActual.filter(function (_, i) {
        return i !== index;
      });
    });
  }

  // Función auxiliar: revisa si un producto ya está en el carrito,
  // comparando por id. La usa ProductCard para decidir qué texto mostrar.
  function estaEnCarrito(id) {
    return carrito.some(function (item) {
      return item.id === id;
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bienvenido a RetroGaming</h1>
        <p>Explora nuestra colección de consolas y videojuegos.</p>
      </header>

      <main className="product-grid">
        {/* Renderizado condicional: mensaje de carga mientras llega el fetch */}
        {cargando ? (
          <p className="cargando-msg">Cargando productos...</p>
        ) : (
          productos.map(function (producto) {
            return (
              <ProductCard
                key={producto.id}
                producto={producto}
                enCarrito={estaEnCarrito(producto.id)}
                onAgregar={agregarAlCarrito}
              />
            );
          })
        )}
      </main>

      <Cart carrito={carrito} onQuitar={quitarDelCarrito} />
    </div>
  );
}

export default App;
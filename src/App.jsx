import { useState } from 'react';
import productos from './data/productos';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import './App.css';

function App() {
  // useState: React "recuerda" el carrito entre renderizados.
  // carrito es el valor actual; setCarrito es la única forma permitida de cambiarlo.
  const [carrito, setCarrito] = useState([]);

  // Se llama cuando ProductCard avisa que se hizo click en "Agregar al carrito".
  function agregarAlCarrito(producto) {
    setCarrito(function (carritoActual) {
      return [...carritoActual, producto];
    });
  }

  // Se llama cuando Cart avisa que se hizo click en "Quitar", pasando la posición.
  function quitarDelCarrito(index) {
    setCarrito(function (carritoActual) {
      return carritoActual.filter(function (_, i) {
        return i !== index;
      });
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bienvenido a RetroGaming</h1>
        <p>Explora nuestra colección de consolas y videojuegos.</p>
      </header>

      <main className="product-grid">
        {productos.map(function (producto) {
          return (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          );
        })}
      </main>

      <Cart carrito={carrito} onQuitar={quitarDelCarrito} />
    </div>
  );
}

export default App;
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Navegador } from './components/NavBar'
import { Saludo } from './components/ItemListContainer'
import { Inicio } from './views/home'
import { ProductoDetalle } from './views/ItemDetailContainer'
import { Error404 } from './views/Error404'
import { CartProvider } from './context/CartProvider'
import { Carro } from './views/Cart.Jsx'

import './App.css'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navegador />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/categoria/:categoriaId" element={<Inicio />} />
          <Route path="/products/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carro />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
)
}

export default App

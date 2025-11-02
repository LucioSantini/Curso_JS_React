import { createContext, useState, useContext } from "react";

export const CartContext = createContext([]);

export const useCart = () => useContext(CartContext);

export const CartProvider =  ({ children }) => {

    const [contador, setcontador] = useState (0)
    const [ProductosAgregados, SetProductosAgregados] = useState([])

    const addItem = (producto) => {
        setcontador(prev => prev + 1)
        SetProductosAgregados(prev => [...prev, producto])

    }

    return (
        <CartContext.Provider value={{ contador, ProductosAgregados, addItem}}>
        {children}
        </CartContext.Provider>
    );
}
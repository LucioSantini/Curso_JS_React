import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom"


export const Carrito = () =>{

    const { contador } = useCart();

    return(
        <>
         <Link
            to="/carrito"
            style={{
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "inherit"
            }}
        ><img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
        alt="carro"
        height={20} />
        <span>{contador}</span></Link>
        </>
    );
}
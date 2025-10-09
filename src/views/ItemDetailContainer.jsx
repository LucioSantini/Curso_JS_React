import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import products from "../data/products.json"

export const ProductoDetalle = () => {

    const [productId, setProductId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
		setProductId(products.find(product => product.id === Number(id)))
	}, [id])

    if (!productId) {
        return <main><h1>Detalle del producto</h1><p>Producto no encontrado. volver a la pagina principal. </p><Link to={`/`}>Click aqui</Link></main>;
    }

    return (
		<main>
			<h1>Detalle del producto:</h1>
			<h2>{productId.nombre}</h2>
			<img width={300} src={productId.img} alt={productId.nombre} />
            <h3>Modelo: {productId.modelo}</h3>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum cupiditate tempore velit nemo possimus molestias placeat. Possimus, omnis ratione dolores aspernatur illum perferendis eius, commodi officia obcaecati, tenetur magni harum! <br/>Precio: {productId.precio}</p>
		</main>
	)


}
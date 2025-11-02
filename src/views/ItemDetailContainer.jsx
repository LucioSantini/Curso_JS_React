import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getFirestore, getDoc, collection, doc} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import { useCart } from "../context/CartProvider";

export const ProductoDetalle = () => {

    const [productId, setProductId] = useState(null)
    const { id } = useParams()
	const { addItem } = useCart();

	const db = getFirestore();
	
	const ordenesColl = collection (db, "ordenes")

    useEffect(() => {

		const refDoc = doc(db, "productos", id)

		getDoc(refDoc).then((snapshot) => {
			setProductId({ id: snapshot.id, ...snapshot.data() });
		})
		
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
			<Button variant="primary" onClick={() => addItem(productId)}>Agregar al carrito</Button>
		</main>
	)


}
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getFirestore, getDocs, collection, addDoc} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

export const ProductoDetalle = () => {

    const [productId, setProductId] = useState(null)
    const { id } = useParams()

	const db = getFirestore();
	
	const refColl = collection(db, "productos")
	const ordenesColl = collection (db, "ordenes")

    useEffect(() => {

		getDocs(refColl).then((snapshot) => {
			const productos = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			
			setProductId(productos.find(product => product.id === Number(id)))
		})
		
	}, [id])

    if (!productId) {
        return <main><h1>Detalle del producto</h1><p>Producto no encontrado. volver a la pagina principal. </p><Link to={`/`}>Click aqui</Link></main>;
    }

	const Compra_alerta=()=>{
		Swal.fire({
			imageUrl: `${productId.img}`,
  			title: `Comprar ${productId.nombre}`,
  			text: `El precio es de ${productId.precio}, Desea continuar?`,
			confirmButtonText: "Comprar",
			showCancelButton: true,
			html: `
				<p>El precio es de <b>${productId.precio}</b></p>
				<input id="swal-nombre" class="swal2-input" placeholder="Nombre completo" />
				<input id="swal-mail" type="email" class="swal2-input" placeholder="Correo electrónico" />
				<input id="swal-telefono" type="tel" class="swal2-input" placeholder="Teléfono" />
    		`,
			preConfirm: () => {
				const nombre = document.getElementById("swal-nombre").value;
      			const mail = document.getElementById("swal-mail").value;
      			const telefono = document.getElementById("swal-telefono").value;

      			if (!nombre || !mail || !telefono) {
        			Swal.showValidationMessage("Por favor completa todos los campos");
        			return false;
      			}

      			return { nombre, mail, telefono };
			}
		}).then((result) => {
			if (result.isConfirmed) {
      			const { nombre, mail, telefono } = result.value
				const orden = {
					Comprador:{
						Nombre : nombre,
						Mail : mail,
						Telefono : telefono 
					},
					Articulo: [productId]
				}

				addDoc(ordenesColl, orden).then((snapshot) => {
					if (snapshot.id) {
						Swal.fire({
							icon: "success",
							title: "¡Compra realizada!",
							html: `
							<p>Gracias <b>${nombre}</b> por tu compra.</p>
							<p>Te contactaremos al correo <b>${mail}</b> o al teléfono <b>${telefono}</b>.<br> tu ID de compra es <b>${snapshot.id}</b></p>
							`,
							confirmButtonText: "OK",
      					});
					}
				})
			};
		})
	}

    return (
		<main>
			<h1>Detalle del producto:</h1>
			<h2>{productId.nombre}</h2>
			<img width={300} src={productId.img} alt={productId.nombre} />
            <h3>Modelo: {productId.modelo}</h3>
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum cupiditate tempore velit nemo possimus molestias placeat. Possimus, omnis ratione dolores aspernatur illum perferendis eius, commodi officia obcaecati, tenetur magni harum! <br/>Precio: {productId.precio}</p>
			<Button variant="primary" onClick={Compra_alerta}>Comprar</Button>
		</main>
	)


}
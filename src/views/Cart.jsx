import { useCart } from "../context/CartProvider"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2'
import { getFirestore, collection, addDoc} from "firebase/firestore";

import { Container } from "react-bootstrap";




export const Carro = () => {
    const { ProductosAgregados } = useCart();

    const total_carrito = () =>{
        let total = 0;
        ProductosAgregados.forEach(element => {
            total += element.precio
        });
        return (total)
    }

    const db = getFirestore();
    const ordenesColl = collection (db, "ordenes")

    const Compra_alerta=()=>{
		Swal.fire({
  			title: `Formulario de Compra`,
			confirmButtonText: "Comprar",
			showCancelButton: true,
			html: `
				<p>El precio a pagar total es de ${total_carrito()}, Desea continuar?</p>
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

				if (!ProductosAgregados || ProductosAgregados.length === 0) {
					Swal.fire({
						icon: "warning",
						title: "Carrito vacío",
						text: "No hay productos agregados al carrito.",
						confirmButtonText: "OK",
					});
					return; // cortamos la ejecución si no hay productos
				}

      			const { nombre, mail, telefono } = result.value
				const orden = {
					Comprador:{
						Nombre : nombre,
						Mail : mail,
						Telefono : telefono 
					},
					Articulo: ProductosAgregados
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
        <>
		<h1>Carrito</h1>

        {ProductosAgregados.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <Container className="d-flex flex-wrap gap-3 align-items-stretch">
                    {ProductosAgregados.map((product, index) => (
                        <Card key={`${product.id}-${index}`} style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={product.img} />
                            <Card.Body>
                                <Card.Title>{product.nombre}</Card.Title>
                                <Card.Text>
                                    Modelo: {product.modelo}
                                    <br />
                                    Precio: {product.precio}$
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            )
        }
        <h2>Total a pagar= {total_carrito()}</h2>
        <Button variant="primary" onClick={Compra_alerta}>Comprar</Button>
        </>



	)
}
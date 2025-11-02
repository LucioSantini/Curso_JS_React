import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, getDocs, collection} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Container } from "react-bootstrap";

export const Inicio = () =>{
    const [products, setProducts] = useState([])
    const { categoriaId } = useParams()

    const db = getFirestore();

    const refColl = collection(db, "productos")

    useEffect(() =>{

        getDocs(refColl).then((snapshot) => {
            const productos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            return productos;
        }).then(response =>{
            if (!categoriaId){
                setProducts(response)
            }else{
                const ProductosFiltrados = response.filter(product => product.categoria === categoriaId)
                setProducts(ProductosFiltrados)
            }
        })
    }, [categoriaId])

    return (
        <Container className="d-flex flex-wrap gap-3 align-items-stretch">
            {products.map((product) => (
                <Card key={product.id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.img} />
                    <Card.Body>
                        <Card.Title>{product.nombre}</Card.Title>
                        <Card.Text>
                        Modelo: {product.modelo}<br />
                        precio: {product.precio}$<br />
                        si quieres saber mas de este vehiculo haz click aqui
                        </Card.Text>
                        <Link to={`/products/${product.id}`}>
                            <Button variant="primary">Mas informacion</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    )

}
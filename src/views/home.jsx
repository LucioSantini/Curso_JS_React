import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import data from "../data/products.json"
import { Container } from "react-bootstrap";

export const Inicio = () =>{
    const [products, setProducts] = useState([])
    const { categoriaId } = useParams()

    useEffect(() =>{

        new Promise((resolve, reject) =>{
            setTimeout(() => resolve(data), 2000)
        }).then(response => {
            if (!categoriaId){
                setProducts(data)
            }else{
                const ProductosFiltrados = data.filter(product => product.categoria === categoriaId)
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
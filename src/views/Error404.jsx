import { Link } from "react-router-dom"

export const Error404 = () => {
	return (
		<h1>Dónde estoy?, parece que la pagina que intentas buscar no se encuentra disponible, volver a la pagina principal. <Link to={`/`}>Click aqui</Link></h1>
	)
}
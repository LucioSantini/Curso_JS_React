import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import logo from '../assets/azulada_logo.png';
import { Carrito } from './CartWidget'


export const Navegador = () => (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary nav">
      <Container fluid>
        <Navbar.Brand href="#home" className='Navbar_Brand'>
          <img 
          src={logo}
          alt="Logo"
          className="logo me-2"
          />
          la azulada</Navbar.Brand>

          <Carrito />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="#link">Contactos</Nav.Link>
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/categoria/moto">Motos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/auto">Autos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/camioneta">Camionetas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categoria/sahumerio">sahumerios</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);

// saque el navegador de esta pagina de boostrap: https://react-bootstrap.netlify.app/docs/components/navbar
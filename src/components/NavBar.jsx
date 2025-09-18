import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/react.svg';
import { Carrito } from './CartWidget'


export const Navegador = () => (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img 
          src={logo}
          alt="Logo"
          className="logo me-2"
          height={20} 
          />
          Tienda React</Navbar.Brand>

          <Carrito />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#link">Contactos</Nav.Link>
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Perfumes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Ropa
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Calzado</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);

// saque el navegador de esta pagina de boostrap: https://react-bootstrap.netlify.app/docs/components/navbar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, Outlet} from "react-router-dom";
const NavBar = () => {
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={'/'}>Shop</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={'/cart'}>Shop</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet/>
        </>
    );
};

export default NavBar;
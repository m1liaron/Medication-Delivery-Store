import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink
                                to={'/'}
                                className="nav-link me-3 border-right"
                                activeclassname="active-link"
                            >
                                Shop
                            </NavLink>
                            <NavLink to={'/cart'} className="nav-link" activeclassname="active-link">
                                Shopping cart
                            </NavLink>
                            <NavLink to={'/history'} className="nav-link" activeclassname="active-link">
                                History
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};

export default NavBar;

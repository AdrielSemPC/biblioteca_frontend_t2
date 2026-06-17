import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet } from 'react-router-dom';

function MenuPublico(){
    return(
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/">Biblioteca PWA</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/">Home</NavLink>
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <NavLink className="nav-link active" exact="true" to="/login">Login</NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>
    );
}

export default MenuPublico;
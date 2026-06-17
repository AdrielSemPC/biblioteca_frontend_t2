import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, isAdmin, logout } from '../seguranca/Autenticacao';

function MenuPrivado() {
    const usuario = getUsuario();

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/privado">Biblioteca PWA</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="">Home</NavLink>
                            {usuario &&
                                <NavDropdown title="Itens" id="basic-nav-dropdown">
                                    <NavLink className="dropdown-item" exact="true" to="bibliotecarios">Bibliotecários</NavLink>
                                    <NavLink className="dropdown-item" exact="true" to="clientes">Clientes</NavLink>
                                    <NavLink className="dropdown-item" exact="true" to="livros">Livros</NavLink>
                                    <NavLink className="dropdown-item" exact="true" to="emprestimos">Emprestimos</NavLink>
                                    <NavLink className="dropdown-item" exact="true" to="usuarios">
                                        {isAdmin() ? "Usuários" : "Meu cadastro"}
                                    </NavLink>
                                </NavDropdown>
                            }
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={usuario ? "Usuário: " + usuario.nome : "Usuário"} id="basic-nav-dropdown">
                            {usuario ?
                                <NavLink className="dropdown-item" exact="true" to="/" onClick={() => logout()}>Logout</NavLink>
                                :
                                <NavLink className="dropdown-item" exact="true" to="/login">login</NavLink>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default MenuPrivado;

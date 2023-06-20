import {Navbar, Container, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

export const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <NavLink className="nav-brand" to="/js-fun/">Home</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/js-fun/sudoku">Sudoku</NavLink>
            <NavLink className="nav-link" to="/js-fun/happy-ball">
                HappyBall
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

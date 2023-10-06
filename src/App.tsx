import {Route, Routes} from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Sudoku from './pages/sudoku';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HappyBall from './pages/happyBall';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <NavLink className="nav-brand" to="/">Home</NavLink>
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


function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Sudoku />}/>
        <Route path="/js-fun" element={<Sudoku />}/>
        <Route path="/js-fun/sudoku" element={<Sudoku/>}/>
        <Route path="/js-fun/happy-ball" element={<HappyBall/>}/>
      </Routes>
    </div>
  );
}

export default App;

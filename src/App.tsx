import {Route, Routes} from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Spacing} from './components/spacing';
import Sudoku from './features/sudoku/pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <NavLink className="nav-brand" to="/">Home</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/js-fun/sudoku">Sudoku</NavLink>
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
      <div>
        <Spacing marginTop='1rem' />
        <Routes>
          <Route path="/js-fun" element={<Sudoku />}/>
          <Route path="/js-fun/sudoku" element={<Sudoku/>}/>
          <Route path="*" element={<Sudoku/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

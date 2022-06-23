import {Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Spacing} from './components/spacing';
import './App.css';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <NavLink className="nav-brand" to="/">Home</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
      <div className="app-container container">
        <Spacing marginTop='1rem' />
        <Routes>
          <Route path="/" element={(<>hi</>)}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

import {Route, Routes} from 'react-router-dom';
import Sudoku from './pages/sudoku';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HappyBall from './pages/happyBall';
import Home from './pages/home';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/js-fun" element={<Home/>}/>
        <Route path="/js-fun/sudoku" element={<Sudoku/>}/>
        <Route path="/js-fun/happy-ball" element={<HappyBall/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    </div>
  );
}

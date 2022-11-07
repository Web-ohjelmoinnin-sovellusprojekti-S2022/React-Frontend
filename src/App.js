import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Chart from './pages/Chart';
import Menu from './components/Menu';
import Emission from './pages/Emission';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
    <NavBar />
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/chart' element={<Chart />} />
      <Route path='/emission' element={<Emission />} />
    </Routes>
    </div>
    </>
  );
}

export default App;

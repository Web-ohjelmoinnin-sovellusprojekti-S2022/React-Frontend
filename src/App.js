import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Temperature from './pages/Temperature';
import Menu from './components/Menu';
import Emission from './pages/Emission';
import Customview from './pages/Customview';
import {Routes, Route} from 'react-router-dom';
import setAuthToken from './components/setAuthToken';


function App() {
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  return (
    <>
    <NavBar />
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/temperature' element={<Temperature />} />
      <Route path='/emission' element={<Emission />} />
      <Route path='/customview' element={<Customview />} />
    </Routes>
    </div>
    </>
  );
}

export default App;

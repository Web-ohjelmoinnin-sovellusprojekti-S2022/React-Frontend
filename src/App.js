import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Temperature from './pages/V1-2';
import Menu from './components/Menu';
import Emission from './pages/Emission';
import Customview from './pages/Customview';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import RouteGuard from "./components/RouteGuard"
import setAuthToken from './components/setAuthToken';
import Logout from './pages/Logout';
import Register from './pages/Register';


function App() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/globaltemp' element={<Temperature />} />
          <Route path='/emission' element={<Emission />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/customview' element={<Customview />} />
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;

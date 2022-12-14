import './App.css';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Temperature from './pages/V1-2';
import Menu from './components/Menu';
import Emission from './pages/Emission';
import Customview from './pages/Customview';
import Customviews from './pages/Customviews';
import { Routes, Route, Navigate, Redirect, Router } from 'react-router-dom';
import Logout from './pages/Logout';
import Register from './pages/Register';
import DeleteAccount from './pages/DeleteAccount';
import NavBar from './components/NavBar';
import NotAuthNavBar from './components/NotAuthNavBar';
import useAuth from './components/useAuth';
import { auth } from './components/useAuth';


function App() {
  const auth = useAuth()

  return (
    <> 
    {auth ? <NavBar/> : <NotAuthNavBar/> }
      <div>
         
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/globaltemp' element={<Temperature />} />
            <Route path='/emission' element={<Emission />} />
            <Route path='/login' element={<Login />} />
            <Route path='/customview' element={<Customview />} />
            <Route path='/customviews' element={<Customviews />} />
            <Route path='/logout' element={<Logout />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/deleteuser' element={<DeleteAccount />} />
          </Routes>
      </div>
    </>
  );
}

export default App;

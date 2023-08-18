import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </div>
  );
}

export default App;

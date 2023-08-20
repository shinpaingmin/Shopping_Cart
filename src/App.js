import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

const Home = lazy(()=>import('./pages/Home'));
const Cart = lazy(()=>import('./pages/Cart'));

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path='/' element={<Navigate to="/home"/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
            </Routes>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;

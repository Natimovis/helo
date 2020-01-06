import React from 'react';
import Nav from './components/nav/Nav';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Nav />
    </div>
    {routes}
    </BrowserRouter>
  )
}

export default App;
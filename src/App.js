import './App.css';
import React from 'react';
import { createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { AppContextProvider } from './AppContext';

const routes = createRoutesFromElements(  
  <>
    <Route path="/" element={<Home />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
  </>
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
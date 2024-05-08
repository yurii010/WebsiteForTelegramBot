import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import AboutProduct from './components/AboutProduct';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Profile from './components/Profile';
import Header from './components/Header';
import Login from './components/Login';
import Form from './components/Form';
import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  })

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={'/'} element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
        <Route path={`about/:id`} element={<AboutProduct />} />
        <Route path={`/auth/login`} element={<Login />} />
        <Route path={`/auth/register`} element={<Register />} />
        <Route path={`/profile`} element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;

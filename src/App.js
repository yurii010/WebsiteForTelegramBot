import { useEffect, useState } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import AboutProduct from './components/AboutProduct/AboutProduct';

function App() {
  const { tg, products, onAdd } = useTelegram();

  useEffect(() => {
    tg.ready();
  })

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
        <Route path={`about/:id`} element={<AboutProduct onAdd={onAdd} products={products} />} />
      </Routes>
      <Header />
    </div>
  );
};

export default App;

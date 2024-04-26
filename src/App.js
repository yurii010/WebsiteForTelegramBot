import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Form from './components/Form';
import AboutProduct from './components/AboutProduct';

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
      </Routes>
    </div>
  );
};

export default App;

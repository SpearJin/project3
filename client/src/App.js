import { useState } from 'react';
import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  const [page, setPage] = useState('list');
  const [accessToken, setAccessToken] = useState(null);

  const renderPage =
    page === 'list' ? <ProductList accessToken={accessToken} /> : <Cart />;
  return (
    <>
      <Header setAccessToken={setAccessToken} />
      {renderPage}
      <Footer setPage={setPage} />
    </>
  );
}

export default App;

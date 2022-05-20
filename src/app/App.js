import '../css/App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ProductList from './layout/ProductList';
import ProductAdd from './layout/ProductAdd';
import { Routes, Route } from 'react-router-dom';
import { requestProducts, updateProducts } from './services/ConnectionDb';
import { useState, useEffect } from 'react';
const App = () => {

  const [data, setData] = useState([]),
    [upd, setUpd] = useState(true),

    getResources = async () => {
      if (!upd) return;
      try {
        const result = await requestProducts();
        setData(result);
        setUpd(false);
        return true;
      }
      catch (e) {
        alert('Products not found');
        return false;
      }
    },
    onAddItem = async (item) => {
      const newArray = [...data, item];
      await updateProducts(newArray);
      setUpd(true);
      if (getResources()) window.location.href = "/";
    },

    onToggleDelete = (sku) => {
      const newArray = data.map(item => {
        if (item.sku === sku) {
          item.forDelete = !item.forDelete;
          return item;
        }
        else return item;
      })
      setData(newArray)
    },

    onDelete = async () => {
      const newArray = data.filter(item => !item.forDelete);
      await updateProducts(newArray);
      setUpd(true);
    };

  useEffect(() => {
    getResources();
  }, [upd]);

  const visibleData = data.sort((a, b) => (a.sku > b.sku) ? 1 : -1);

  return (
    < div className="App" >
      <Header onDelete={onDelete} />
      <Routes>
        <Route path="/" element={<ProductList data={visibleData} onToggleDelete={onToggleDelete} />} />
        <Route path="/add-product" element={<ProductAdd onAddItem={onAddItem} data={data} />} />
      </Routes>
      <Footer />
    </ div>

  );
}

export default App;
import '../css/App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ProductList from './layout/ProductList';
import ProductAdd from './layout/ProductAdd';
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({ data: [] });
  }


  componentDidMount() {
    fetch('http://localhost:3000/data')
      .then(data => data.json())
      .then(res => this.setState(() => {
        return { data: res }

      }));
  };



  onAddItem = async (item) => {
    const addItem = item;
    this.setState(({ data }) => {
      const newArray = [...data, addItem];
      return { data: newArray }
    })
    try {
      const response = await fetch('http://localhost:3000/data', {
        method: 'PUT', // или 'PUT'
        body: JSON.stringify(addItem), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }

  }

  onToggleDelete = (sku) => {
    const newArray = this.state.data.map(item => {
      if (item.sku === sku) {
        item.forDelete = !item.forDelete;
        return item;
      }
      else return item;
    })
    this.setState(() => { return { data: newArray } })
  }

  onDelete = () => {
    const newArray = this.state.data.filter(item => !item.forDelete);
    this.setState(() => { return { data: newArray } })


  }



  render() {
    const visibleData = this.state.data.sort((a, b) => (a.sku > b.sku) ? 1 : -1)
    return (
      <div className="App">
        <Header onDelete={this.onDelete} />
        <Routes>
          <Route path="/" element={<ProductList data={visibleData} onToggleDelete={this.onToggleDelete} />} />
          <Route path="/add-product" element={<ProductAdd onAddItem={this.onAddItem} />} />
        </Routes>
        <Footer />
      </div>

    );
  }
}
export default App;
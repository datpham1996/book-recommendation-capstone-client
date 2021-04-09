import React from 'react';
import './App.css';
import MainPage from './Component/MainPage/MainPage';
import Book from './Component/Book/Book';
import Footer from './Component/Footer/Footer';

class App extends React.Component{
  render(){
    return(
      <div className='app'>
        <MainPage/>
        <Book/>
        <Footer/>
      </div>
    )
  }
}
export default App;

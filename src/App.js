import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './Component/Landing/Landing'
import Book from './Component/Book/Book';
import Footer from './Component/Footer/Footer';
import FormLogin from './Component/FormLogin/FormLogin';
import FormSignUp from './Component/FormSignUp/FormSignUp';
import NavBar from './Component/NavBar/NavBar'
import UserFavorite from './Component/MyFavorite/MyFavorite';
import MyFavorite from './Component/MyFavorite/MyFavorite';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <NavBar />
          <Book/>
          <Switch>
            <Route exact path='/' component={Landing} />

            {/* <Route path='/how-it-works' component={HowItWorks} /> */}

            <Route path='/login' component={FormLogin} />

            <Route path='/signup' component={FormSignUp} />

            <Route path='/favorite' component={MyFavorite}/>

            {/* <Route path='/main' component={Landing} /> */}

            {/* <Route path='/book' component={Book} /> */}


          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
export default App;

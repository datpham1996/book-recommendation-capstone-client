import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MainPage from './Component/MainPage/MainPage';
import Book from './Component/Book/Book';
import Footer from './Component/Footer/Footer';
import FormLogin from './Component/FormLogin/FormLogin';
import FormSignUp from './Component/FormSignUp/FormSignUp';
import NavBar from './Component/NavBar/NavBar'

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <NavBar />
          <Book/>
          <Switch>
            {/* <Route exact path='/' component={Landing} /> */}

            {/* <Route path='/how-it-works' component={HowItWorks} /> */}

            <Route path='/login' component={FormLogin} />

            <Route path='/signup' component={FormSignUp} />

            <Route path='/main' component={MainPage} />

            {/* <Route path='/book' component={Book} /> */}


          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
export default App;

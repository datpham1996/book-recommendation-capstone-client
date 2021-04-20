import React, { Component } from 'react'
import TokenService from "../services/token-service.js"
import { Link } from 'react-router-dom'


class NavBar extends Component {

    logOutClick = () => {
        //console.log('Logging out')
        TokenService.clearAuthToken()
        TokenService.getUserId = (id) => {
            //console.log(id)
        }

        window.location = '/'
    }

    render() {

        return (
            <header className='clearfix'>
                <h2>Bookly</h2>
                {TokenService.hasAuthToken() ?
                    <nav className="nav">
                        <ul className='link'>
                            <li>
                                <Link to="/">
                                    <i className="fa fa-home"></i>
                                    <span className='navlink-text'>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/main">
                                    <i className="fa fa-list"></i>
                                    <span className='navlink-text'>Daily Book recommendation</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" onClick={this.logOutClick}>
                                    <i className="fa fa-sign-out"></i>
                                    <span className='navlink-text'>Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    : 
                    <nav className="nav">
                        <ul className='link'>
                            <li>
                                <Link to="/login">
                                    <i className="fa fa-home"></i>
                                    <span className='navlink-text'>Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    <i className="fa fa-list"></i>
                                    <span className='navlink-text'>Signup</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/" onClick={this.logOutClick}>
                                    <i className="fa fa-sign-out"></i>
                                    <span className='navlink-text'>Log Out</span>
                                </Link>
                            </li> */}
                        </ul>
                    </nav>
                    }
            </header>
        )
    }
}

export default NavBar 
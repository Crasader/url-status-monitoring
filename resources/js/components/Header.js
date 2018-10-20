import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './Home';
import Url from './url/Index';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

export default class Header extends Component {
    constructor()
    {
        super();
        var loggedIn = localStorage.getItem('token') == null ? false : true;
        //initialize states
        this.state = {
            logged : loggedIn
        }
    }

    render() {
        return (
                 <div>

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>

                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/"> Home </Link>
                          </li>
                          <li className="nav-item auth-item" hidden={!this.state.logged}>
                            <Link className="nav-link" to="/url"> Urls</Link>
                          </li>
                          <li className="nav-item auth-item" hidden={!this.state.logged}>
                            <Link className="nav-link" to="/logout"> Logout</Link>
                          </li>
                          <li className="nav-item unauth-item" hidden={this.state.logged}>
                            <Link className="nav-link" to="/login"> Login</Link>
                          </li>
                          <li className="nav-item unauth-item" hidden={this.state.logged}>
                            <Link className="nav-link" to="/register"> Register</Link>
                          </li>
                        </ul>
                      </div>
                    </nav>

                    <Route exact path='/' component={Home} />
                    <Route exact path='/url' component={Url} />
                    <Route exact path='/url/add' component={Url} />
                    <Route exact path='/url/edit/:id' component={Url} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/logout' component={Logout} />

                 </div>
        );
    }
}

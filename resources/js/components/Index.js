import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Header />
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}

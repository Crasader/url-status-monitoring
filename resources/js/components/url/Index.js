import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Add from './Add';
import Edit from './Edit';
import Listing from './Listing';
import Home from '../Home';

export default class Index extends Component {

    render() {
        return (
        	    localStorage.getItem('token')!==null?
        		(
	            	<div>
	                	<div>
	                		<br/>
	                		URLS
	                		<hr/>
	                		<Link to="/url" className='btn btn-primary'>Listing</Link> &nbsp;
	                		<Link to="/url/add" className='btn btn-primary'>Add</Link>
							<hr/>
	                		<Route exact path="/url" component={Listing} />
	                    	<Route exact path="/url/add" component={Add} />
	                    	<Route exact path="/url/edit/:id" component={Edit} />
	                	</div>
	            	</div>
            ):<Home/>
        );
    }
}
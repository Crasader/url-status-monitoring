import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';

export default class Logout extends Component {

	constructor()
	{
		super();
		localStorage.removeItem('token');
		[].forEach.call(document.querySelectorAll('.auth-item'), function (el) {
			  el.setAttribute("hidden", true);
			});
	  	[].forEach.call(document.querySelectorAll('.unauth-item'), function (el) {
			  el.removeAttribute("hidden");
			});
	}

	render() {
		return (
			<Home/>
		);

    }
}

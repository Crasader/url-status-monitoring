import React, { Component } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import Index from './url/Index';

export default class Login extends Component {

	constructor()
	{
		super();

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		//initialize states
		this.state = {
			username : '',
			password : '',
			isLogged: false,
			message : '',
			errors : ''
		}
	}

	onChangeUsername(e)
	{
		this.setState({
			username: e.target.value
		});

	}

	onChangePassword(e)
	{
		this.setState({
			password: e.target.value
		});

	}

	onSubmit(e)
	{
		e.preventDefault();
		if(!this.state.isLogged && localStorage.getItem('token')===null)
		{
			const user_data = {
				username : this.state.username,
				password : this.state.password
			}

			//send login request to server
			return axios({
					 method: 'post', url: 'http://localhost/icons_task/public/api/v1/login',
					 params: user_data
					}).then(response => {
						  	localStorage.setItem('token',response.data.success.token);
						  	this.setState({isLogged: true});
							[].forEach.call(document.querySelectorAll('.auth-item'), function (el) {
								  el.removeAttribute("hidden");
								});
						  	[].forEach.call(document.querySelectorAll('.unauth-item'), function (el) {
								  el.setAttribute("hidden", true);
								});

					}).catch(error=>{
							var errors_string='Error(s) Occured';
							if(error.response.data.error =='Unauthorised')
							{
								errors_string = 'Wrong username or password' ;
							}
							//update states
							this.setState({message: 'error'});
							this.setState({errors: errors_string});
					});
		}

	}

    render() {
        return (
        		!this.state.isLogged && localStorage.getItem('token')===null?
        		(
		            <div>
		            <br/>
		            <h3>Login</h3>
		            <hr/>
		            	{this.state.message=="error"?<ErrorMessage errors={this.state.errors}/>:null}
		                <form onSubmit={this.onSubmit}>
						  <div className="form-group">
						    <label htmlFor="username">Username</label>
						    <input type="text" className="form-control" id="username" 
						    	value={this.state.username} onChange={this.onChangeUsername}  placeholder="Enter username"/><br/>
						    <label htmlFor="status">Password</label>
						    <input type="password" className="form-control" id="password" 
						    	value={this.state.password} onChange={this.onChangePassword}  placeholder="Enter password"/>
						  </div>
						  <button type="submit" className="btn btn-primary">Login</button>
						</form>
		            </div>
		        )
		        :<Index/>
        );
    }
}
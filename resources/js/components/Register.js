import React, { Component } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import Index from './url/Index';

export default class Register extends Component {

	constructor()
	{
		super();

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeCPassword = this.onChangeCPassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		//initialize states
		this.state = {
			username : '',
			email : '',
			password : '',
			c_password : '',
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

	onChangeEmail(e)
	{
		this.setState({
			email: e.target.value
		});

	}

	onChangePassword(e)
	{
		this.setState({
			password: e.target.value
		});

	}

	onChangeCPassword(e)
	{
		this.setState({
			c_password: e.target.value
		});

	}

	onSubmit(e)
	{
		e.preventDefault();
		if(!this.state.isLogged && localStorage.getItem('token')===null)
		{
			const user_data = {
				username : this.state.username,
				email : this.state.email,
				password : this.state.password,
				c_password : this.state.c_password,
			}

			//send login request to server
			return axios({
					 method: 'post', url: 'http://localhost/icons_task/public/api/v1/register',
					 params: user_data
					}).then(response => {
						  	this.setState({message: 'success'});
					}).catch(error=>{
							var errors_string='Error(s) Occured';
							//get validation errors
							if(error.response.data.error !=='undefined')
							{
								var error_object = error.response.data.error;
								for (var key in error_object) {
								    if (error_object.hasOwnProperty(key)) {           
								        for (var key2 in error_object[key]) {
								        	if (error_object[key].hasOwnProperty(key2)) {  
									        	//console.log(key, error_object[key][key2]);
									        	errors_string += ' | ' + error_object[key][key2] ;
									        }
								        }
								    }
								}
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
		            <h3>Register</h3>
		            <hr/>
		            	{this.state.message=="success"?<SuccessMessage message="Registered Successfully"/>:null}
		            	{this.state.message=="error"?<ErrorMessage errors={this.state.errors}/>:null}
		                <form onSubmit={this.onSubmit}>
						  <div className="form-group">
						    <label htmlFor="username">Username</label>
						    <input type="text" className="form-control" id="username" 
						    	value={this.state.username} onChange={this.onChangeUsername}  placeholder="Enter username"/>
						    </div>
						    <div className="form-group">
						    <label htmlFor="email">Email</label>
						    <input type="email" className="form-control" id="email" 
						    	value={this.state.email} onChange={this.onChangeEmail}  placeholder="Enter email"/>
						    </div>
						    <div className="form-group">
						    <label htmlFor="status">Password</label>
						    <input type="password" className="form-control" id="password" 
						    	value={this.state.password} onChange={this.onChangePassword}  placeholder="Enter password"/>
						    </div>
						    <div className="form-group">
						    <label htmlFor="c_password">Password Confirmation</label>
						    <input type="password" className="form-control" id="c_password" 
						    	value={this.state.c_password} onChange={this.onChangeCPassword}  placeholder="Enter password confirmation"/>
						    </div>
						  <button type="submit" className="btn btn-primary">Register</button>
						</form>
		            </div>
		        )
		        :<Index/>
        );
    }
}
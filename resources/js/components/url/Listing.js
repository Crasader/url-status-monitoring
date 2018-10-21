import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';
import SuccessMessage from '../SuccessMessage';
import ErrorMessage from '../ErrorMessage';
import * as constants from '../../constants';

export default class Listing extends Component {

	constructor()
	{
		super();
		this.state = {
			urls : [],
			authenticated : false,
			message : '',
			toggleMessage : false
		}
	}

	componentDidMount()
	{
		if(localStorage.getItem('token') !== null)
		{
			var accessToken = localStorage.getItem('token');
			//get result the first time
			axios({
					method: 'get', url: constants.API_END_POINT+'urls',
					headers: { 'Authorization': 'Bearer ' + accessToken }
						}).then(response => {
							//console.log(response.data.success.data);
						this.setState({urls:response.data.success.data});
			});

			var _this = this;
			//refresh result evey 10 seconds
			this.interval=setInterval(function () {
				_this.setState({toggleMessage:true}); 
				setTimeout(function(){ 
								_this.setState({toggleMessage:false}); 
							},2000);
				return axios({
						 method: 'get', url: constants.API_END_POINT+'urls',
						 headers: { 'Authorization': 'Bearer ' + accessToken }
						}).then(response => {
							//console.log(response.data.success.data);
							_this.setState({urls:response.data.success.data});
						});
			}, 10000); 
		}
	}

	componentWillUnmount() 
	{
		if(localStorage.getItem('token') !== null)
		{
			clearInterval(this.interval);
		}
	}

	onDelete(url_id)
	{
		var accessToken = localStorage.getItem('token');
		return axios({
				 method: 'delete', url: constants.API_END_POINT+'urls/'+url_id,
				 headers: { 'Authorization': 'Bearer ' + accessToken }
				}).then(response => {
					  	this.setState({message: 'success'});
					  	//delete from ui too
					  	var urls = this.state.urls;
					  	for(var i=0; i<urls.length; i++)
					  	{
					  		if(urls[i].id == url_id)
					  		{
					  			urls.splice(i,1);
					  			//update with new urls
					  			this.setState({urls:urls});
					  		}
					  	}
				}).catch(error=>{
						var errors_string='Error Occured';
						this.setState({message: 'error'});
						this.setState({errors: errors_string});
				});
	}

    render() {
        return (
        	    localStorage.getItem('token')!=null?
        		(
		            <div>
		            {this.state.message=="success"?<SuccessMessage message="Url Deleted Successfully"/>:null}
		            {this.state.message=="error"?<ErrorMessage errors={this.state.errors}/>:null}
		            {this.state.toggleMessage?(<h4> Refreshing.. </h4>):null}
		                <table className="table">
						  <thead>
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Url</th>
						      <th scope="col">Status</th>
						      <th scope="col">Created At</th>
						      <th scope="col">Updated At</th>
						      <th scope="col">Action</th>
						    </tr>
						  </thead>
						  <tbody>
						  {
						  	this.state.urls.map(url=>{
						  		return (
								    <tr key={url.id}>
								      <th scope="row">{url.id}</th>
								      <td>{url.url}</td>
								      <td>{url.status}</td>
								      <td>{url.created_at}</td>
								      <td>{url.updated_at}</td>
								      <td>
								      	<Link className="btn btn-primary" to={`/url/edit/${url.id}`}>Edit</Link> &nbsp;
								      	<a className="btn btn-danger" href="#" onClick={this.onDelete.bind(this,url.id)}>Delete</a>
								      </td>
							    </tr>
							    )
							})
						  }
						  </tbody>
						</table>
		            </div>
		        )
		        :<Home/>

        );
    }
}
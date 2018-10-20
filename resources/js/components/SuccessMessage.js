import React, { Component } from 'react';

export default class SuccessMessage extends Component {
	constructor(props)
	{
		super(props);
	}

    render() {
        return (
        	<div className="alert alert-success" role="alert">
        		{ this.props.message}
        	</div>
        );
    }
}
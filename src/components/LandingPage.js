import React, { Component } from 'react';
import base from '../base';
import '../assets/css/app.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: null,
			addCity: ''
		};
	}

	componentDidMount() {
		this.ref = base.syncState('/cities', {
			context: this,
			state: 'cities'
		});
	}

	handleInputChange = (event) => {
		this.setState({
			addCity: event.target.value
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		console.log('submitting form');
	};

	render() {
		let cities = null;
		if (this.state.cities) {
			cities = Object.keys(this.state.cities).map((currentCity, index) => {
				return <button key={index}>{this.state.cities[currentCity]}</button>;
			});
		}
		return (
			<div>
				<h2>BrainyActz Wallboard</h2>
				{cities}
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="add-city"
						value={this.state.addCity}
						placeholder="Add New City"
						onChange={this.handleInputChange}
					/>
					<button>Add City</button>
				</form>
			</div>
		);
	}
}

export default LandingPage;

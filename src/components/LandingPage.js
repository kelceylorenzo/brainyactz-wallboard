import React, { Component } from 'react';
import base from '../base';
import '../assets/css/app.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: null,
			cityToAdd: ''
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
			cityToAdd: event.target.value
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { cities, cityToAdd } = this.state;

		if (cityToAdd.trim() === '') {
			this.setState({
				cityToAdd: ''
			});
			return;
		}

		cities[cityToAdd] = {};

		this.setState({
			cities,
			cityToAdd: ''
		});
	};

	redirectToCityPage = (event) => {
		let selectedCity = event.target.value
			.toLowerCase()
			.slice(0, -4)
			.replace(' ', '-');

		this.props.history.push(`/${selectedCity}`);
	};

	render() {
		let citiesToRender = null;
		if (this.state.cities) {
			citiesToRender = Object.keys(this.state.cities).map((currentCity, index) => {
				return (
					<button key={index} value={currentCity} onClick={this.redirectToCityPage}>
						{currentCity}
					</button>
				);
			});
		}
		return (
			<div>
				<h2>BrainyActz Wallboard</h2>
				{citiesToRender}
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="add-city"
						value={this.state.cityToAdd}
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

import React, { Component } from 'react';
import base from '../base';
import sampleData from '../data';
import '../assets/css/app.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: {},
			locationToAdd: ''
		};
	}

	componentDidMount() {
		this.ref = base.syncState('/locations', {
			context: this,
			state: 'locations'
		});
	}

	loadLocations = () => {
		this.setState({
			locations: sampleData
		});
	};

	handleInputChange = (event) => {
		this.setState({
			locationToAdd: event.target.value
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { locations, locationToAdd } = this.state;

		if (locationToAdd.trim() === '') {
			this.setState({
				locationToAdd: ''
			});
			return;
		}

		let newLocation = locationToAdd
			.toLowerCase()
			.slice(0, -4)
			.replace(' ', '-');

		locations[newLocation] = { name: locationToAdd };

		this.setState({
			locations,
			locationToAdd: ''
		});
	};

	redirectToCityPage = (event) => {
		let selectedLocation = event.target.value
			.toLowerCase()
			.slice(0, -4)
			.replace(' ', '-');

		this.props.history.push(`/${selectedLocation}`);
	};

	render() {
		let locationsToRender = Object.keys(this.state.locations).map((currentLocation, index) => {
			return (
				<button
					key={index}
					value={this.state.locations[currentLocation].name}
					onClick={this.redirectToCityPage}
				>
					{this.state.locations[currentLocation].name}
				</button>
			);
		});

		return (
			<div>
				<h2>BrainyActz Wallboards</h2>
				{locationsToRender}
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="add-location"
						value={this.state.locationToAdd}
						placeholder="Add New Location"
						onChange={this.handleInputChange}
					/>
					<button>Add Location</button>
				</form>

				<button onClick={this.loadLocations}>Load Locations</button>
			</div>
		);
	}
}

export default LandingPage;

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

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

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

	removeLocation = (currentLocation) => {
		base
			.remove(`/locations/${currentLocation}`)
			.then(() => {
				console.log('location was removed');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	render() {
		let locationsToRender = Object.keys(this.state.locations).map((currentLocation, index) => {
			return (
				<div key={index}>
					<button onClick={() => this.removeLocation(currentLocation)}>X</button>
					<button
						value={this.state.locations[currentLocation].name}
						onClick={this.redirectToCityPage}
						className="selection"
					>
						{this.state.locations[currentLocation].name}
					</button>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="heading">BrainyActz Wallboard Manager</div>
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="add-location"
						value={this.state.locationToAdd}
						placeholder="City, ST"
						onChange={this.handleInputChange}
						className="input"
					/>
					<button className="confirm">Add Location</button>
				</form>
				<div className="body">{locationsToRender}</div>
			</div>
		);
	}
}

export default LandingPage;

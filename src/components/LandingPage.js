import React, { Component } from 'react';
import base from '../base';
import '../assets/css/app.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dbInfo: null,
			cityToAdd: ''
		};
	}

	componentDidMount() {
		base.syncState('/cities', {
			context: this,
			state: 'dbInfo'
		});
	}

	handleInputChange = (event) => {
		this.setState({
			cityToAdd: event.target.value
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { dbInfo, cityToAdd } = this.state;

		if (cityToAdd.trim() === '') {
			this.setState({
				cityToAdd: ''
			});
			return;
		}

		let newTableRoot = cityToAdd
			.toLowerCase()
			.slice(0, -4)
			.replace(' ', '-');

		let newTable = {};
		newTable[newTableRoot] = { name: cityToAdd, rooms: { default: 'default' } };

		base.update('/', {
			data: newTable
		});

		dbInfo[Date.now()] = cityToAdd;

		this.setState({
			dbInfo,
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
		let citiesToRender = 'Loading...';
		if (this.state.dbInfo) {
			citiesToRender = Object.keys(this.state.dbInfo).map((currentCity, index) => {
				return (
					<button key={index} value={this.state.dbInfo[currentCity]} onClick={this.redirectToCityPage}>
						{this.state.dbInfo[currentCity]}
					</button>
				);
			});
		}
		return (
			<div>
				<h2>BrainyActz Wallboards</h2>
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

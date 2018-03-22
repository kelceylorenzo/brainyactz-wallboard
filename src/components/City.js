import React, { Component } from 'react';
import base from '../base';

class City extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dbInfo: null,
			roomToAdd: '',
			location: this.props.location.pathname
		};
	}

	componentDidMount() {
		this.ref = base.syncState(this.state.location, {
			context: this,
			state: 'dbInfo'
		});
	}

	handleInputChange = (event) => {
		this.setState({
			roomToAdd: event.target.value
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();

		console.log('handle for submit called');
		const { dbInfo, roomToAdd } = this.state;

		if (roomToAdd.trim() === '') {
			this.setState({
				roomToAdd: ''
			});
			return;
		}

		// let newTableRoot = cityToAdd
		// 	.toLowerCase()
		// 	.slice(0, -4)
		// 	.replace(' ', '-');

		// let newTable = {};
		// newTable[newTableRoot] = { name: cityToAdd, rooms: { default: 'default' } };

		// base.update('/', {
		// 	data: newTable
		// });

		dbInfo.rooms[Date.now()] = roomToAdd;

		this.setState({
			dbInfo,
			roomToAdd: ''
		});
	};

	redirectToWallPage = (event) => {
		console.log('redirect to wall page called: ', this.props.history);
		// let selectedCity = event.target.value
		// 	.toLowerCase()
		// 	.slice(0, -4)
		// 	.replace(' ', '-');

		// this.props.history.push(`/${selectedCity}`);
	};

	render() {
		let title = 'Loading ... ';
		let roomsToRender = 'Loading ...';
		if (this.state.dbInfo) {
			const { name, rooms } = this.state.dbInfo;
			title = `Rooms - ${name}`;
			roomsToRender = Object.keys(rooms).map((currentRoom, index) => {
				if (currentRoom === 'default') {
					return;
				}
				return (
					<button key={index} value={rooms[currentRoom]} onClick={this.redirectToWallPage}>
						{rooms[currentRoom]}
					</button>
				);
			});
		}

		return (
			<div>
				<h2>{title}</h2>
				{roomsToRender}
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="add-city"
						value={this.state.roomToAdd}
						placeholder="Add New Room"
						onChange={this.handleInputChange}
					/>
					<button>Add Room</button>
				</form>
			</div>
		);
	}
}

export default City;

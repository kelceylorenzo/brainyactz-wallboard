import React, { Component } from 'react';
import Wall from './Wall';
import base from '../base';

class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			walls: {},
			wallToAdd: ''
		};
	}

	componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.location.pathname}/walls`, {
			context: this,
			state: 'walls'
		});
	}

	handleWallInputChange = (event) => {
		this.setState({
			wallToAdd: event.target.value
		});
	};

	handleWallFormSubmit = (event) => {
		event.preventDefault();

		const { walls, wallToAdd } = this.state;

		if (wallToAdd.trim() === '') {
			this.setState({
				wallToAdd: ''
			});
			return;
		}

		walls[Date.now()] = { name: wallToAdd };

		this.setState({
			walls,
			wallToAdd: ''
		});
	};

	render() {
		let wallsToRender = Object.keys(this.state.walls).map((currentWall, index) => {
			return (
				<Wall
					key={index}
					index={currentWall}
					name={this.state.walls[currentWall].name}
					pathname={this.props.location.pathname}
				/>
			);
		});

		return (
			<div>
				<h2>Title Placeholder</h2>
				<form onSubmit={this.handleWallFormSubmit}>
					<input
						type="text"
						name="add-wall"
						value={this.state.wallToAdd}
						placeholder="Add New Wall"
						onChange={this.handleWallInputChange}
					/>
					<button>Add Wall</button>
				</form>
				{wallsToRender}
			</div>
		);
	}
}

export default Location;

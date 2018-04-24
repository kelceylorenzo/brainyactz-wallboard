import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wall from './Wall';
import base from '../base';

class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			walls: {},
			wallToAdd: ''
		};

		this.location = '';
	}

	componentDidMount() {
		const { location } = this.props.match.params;

		base.fetch(`/locations/${location}/name`, { context: this }).then((locationName) => {
			this.location = locationName;
		});

		this.ref = base.syncState(`/locations/${location}/walls`, {
			context: this,
			state: 'walls'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
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

	removeWall = (wallToRemove) => {
		const { location } = this.props.match.params;
		base
			.remove(`/locations/${location}/walls/${wallToRemove}`)
			.then(() => {
				console.log('wall was removed');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	render() {
		let wallsToRender = Object.keys(this.state.walls).map((currentWall, index) => {
			return (
				<div key={index}>
					<button className="delete cancel" onClick={() => this.removeWall(currentWall)}>
						X
					</button>
					<Link className="selection" to={`${this.props.match.params.location}/${currentWall}`}>
						{this.state.walls[currentWall].name}
					</Link>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="heading">
					<Link className="header-link" to="/">
						BrainyActz Wallboard Manager
					</Link>
					> {this.location}
				</div>
				<form onSubmit={this.handleWallFormSubmit}>
					<input
						type="text"
						name="add-wall"
						value={this.state.wallToAdd}
						placeholder="Wall Title"
						onChange={this.handleWallInputChange}
					/>
					<button className="confirm">Add Wall</button>
				</form>
				<div className="body">{wallsToRender}</div>
			</div>
		);
	}
}

export default Location;

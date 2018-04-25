import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from '../base';

class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeBoards: {}
		};

		this.location = '';
		this.wall = '';
	}

	componentDidMount() {
		const { location, wallId } = this.props.match.params;

		base.fetch(`/locations/${location}/name`, { context: this }).then((locationName) => {
			this.location = locationName;
		});

		base.fetch(`/locations/${location}/walls/${wallId}/name`, { context: this }).then((wallName) => {
			this.wall = wallName;
		});

		this.ref = base.syncState(`/locations/${location}/walls/${wallId}/active`, {
			context: this,
			state: 'activeBoards'
		});
	}

	removeActiveBoard = (event) => {
		const { location, wallId } = this.props.match.params;

		base
			.remove(`/locations/${location}/walls/${wallId}/active/${event.target.name}`)
			.then(() => {
				console.log('board was removed from active');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	clearAllActive = () => {
		const { location, wallId } = this.props.match.params;

		base
			.remove(`/locations/${location}/walls/${wallId}/active/`)
			.then(() => {
				console.log('all boards removed from active');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	render() {
		const { location, wallId } = this.props.match.params;
		let activeBoardsToRender = Object.keys(this.state.activeBoards).map((currentActive, index) => {
			return (
				<div key={index}>
					<button className="delete cancel" name={currentActive} onClick={this.removeActiveBoard}>
						X
					</button>
					<Link to={`/${location}/${wallId}/`} className="selection">
						{this.state.activeBoards[currentActive].title}
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
					>
					<Link className="header-link" to={`/${location}`}>
						{this.location}
					</Link>
					>
					<Link className="header-link" to={`/${location}/${wallId}`}>
						{this.wall}
					</Link>
					> Display Info
				</div>
				<div className="subheading">
					<button className="cancel" onClick={this.clearAllActive}>
						Clear All Active Boards
					</button>
					<Link className="selection active" to={`/${location}/${wallId}`}>
						Add Boards
					</Link>
					<Link className="selection active" to={`/${location}/${wallId}/live`}>
						Live Display
					</Link>
				</div>
				<h3>Current Active Boards</h3>
				<div className="body">
					{activeBoardsToRender[0] ? activeBoardsToRender : 'No boards currently active'}
				</div>
			</div>
		);
	}
}

export default Display;

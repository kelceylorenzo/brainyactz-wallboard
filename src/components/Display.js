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
				console.log('success');
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
				console.log('success');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	changeDuration = (event) => {
		const { value, name } = event.target;
		let newActiveBoards = this.state.activeBoards;

		newActiveBoards[name].fileLocation.duration = value * 60000;

		this.setState(newActiveBoards);
	};

	saveDuration = (event, activeBoard) => {
		event.preventDefault();
		const { location, wallId } = this.props.match.params;
		base.update(`locations/${location}/walls/${wallId}/active/${activeBoard}/fileLocation`, {
			data: this.state.activeBoards[activeBoard].fileLocation
		});
	};

	render() {
		const { location, wallId } = this.props.match.params;
		let activeBoardsToRender = Object.keys(this.state.activeBoards).map((currentActive, index) => {
			const { collection, board } = this.state.activeBoards[currentActive].fileLocation;
			const duration = this.state.activeBoards[currentActive].fileLocation.duration / 60000;
			return (
				<div key={index}>
					<div className="display-listing">
						<div>{this.state.activeBoards[currentActive].title}</div>
						<form
							className="duration-form"
							onSubmit={(event) => this.saveDuration(event, currentActive)}
						>
							<input
								name={currentActive}
								className="duration-input"
								type="number"
								value={duration}
								onChange={this.changeDuration}
							/>{' '}
							min(s).
							<button className="active">✓</button>
						</form>
						<Link to={`/${location}/${wallId}/${collection}/${board}/edit`} className="selection edit">
							Edit Board
						</Link>
						<button
							key={`delete-${currentActive}`}
							className="cancel"
							name={currentActive}
							onClick={this.removeActiveBoard}
						>
							Remove From Live
						</button>
					</div>
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
					<div style={{ width: '100%' }}>
						{activeBoardsToRender[0] ? activeBoardsToRender : 'No boards currently active'}
					</div>
				</div>
			</div>
		);
	}
}

export default Display;

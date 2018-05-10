import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import base from '../base';

class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: {},
			boardToAdd: ''
		};

		this.collection = '';
		this.location = '';
		this.wall = '';
	}

	componentDidMount() {
		const { location, wallId, collectionId } = this.props.match.params;

		base.fetch(`/locations/${location}/name`, { context: this }).then((locationName) => {
			this.location = locationName;
		});

		base.fetch(`/locations/${location}/walls/${wallId}/name`, { context: this }).then((wallName) => {
			this.wall = wallName;
		});

		base
			.fetch(`/locations/${location}/collections/${collectionId}/name`, { context: this })
			.then((collectionName) => {
				this.collection = collectionName;
			});

		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards`, {
			context: this,
			state: 'boards'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	setActiveBoard = (event) => {
		const { location, wallId, collectionId } = this.props.match.params;
		let boardToSet = {};

		base.push(`/locations/${location}/walls/${wallId}/active`, {
			data: {
				fileLocation: {
					location: location,
					collection: collectionId,
					board: event.target.name,
					duration: 60000
				},
				title: event.target.title
			}
		});
	};

	deleteBoard = (event) => {
		const { location, collectionId } = this.props.match.params;

		base
			.remove(`/locations/${location}/collections/${collectionId}/boards/${event.target.name}`)
			.then(() => {
				console.log('board was removed');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	render() {
		const { collectionId, location, wallId } = this.props.match.params;
		const { boards } = this.state;
		let boardsToRender = Object.keys(boards).map((currentBoard, index) => {
			return (
				<div className="board-listing" key={index}>
					{boards[currentBoard].title}
					<Link className="selection" to={`/${location}/${wallId}/${collectionId}/${currentBoard}`}>
						Preview
					</Link>
					<Link
						className="selection edit"
						to={`/${location}/${wallId}/${collectionId}/${currentBoard}/edit`}
					>
						Edit Board
					</Link>
					<button
						className="selection active"
						onClick={this.setActiveBoard}
						name={currentBoard}
						title={boards[currentBoard].title}
					>
						Make Active
					</button>
					<button className="selection cancel" onClick={this.deleteBoard} name={currentBoard}>
						Delete Board
					</button>
				</div>
			);
		});

		return (
			<div>
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
					> {this.collection}
				</div>
				<div className="subheading">
					<Link className="button confirm" to={`/${location}/${wallId}/${collectionId}/form`}>
						Add New Board
					</Link>
				</div>
				<div className="boards">{boardsToRender}</div>
			</div>
		);
	}
}

export default Collection;

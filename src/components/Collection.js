import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import base from '../base';

class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: {},
			boardToAdd: '',
			collectionTitle: ''
		};
	}

	componentDidMount() {
		const { collectionId, location } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards`, {
			context: this,
			state: 'boards'
		});

		base.syncState(`/locations/${location}/collections/${collectionId}/name`, {
			context: this,
			state: 'collectionTitle'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	setActiveBoard = (event) => {
		const { location, wallId } = this.props.match.params;

		base.post(`/locations/${location}/walls/${wallId}/active`, {
			data: this.state.boards[event.target.name]
		});
	};

	render() {
		const { collectionId, location, wallId } = this.props.match.params;
		const { boards } = this.state;
		let boardsToRender = Object.keys(boards).map((currentBoard, index) => {
			return (
				<div key={index}>
					<Link to={`/${location}/${wallId}/${collectionId}/${currentBoard}`}>
						{boards[currentBoard].title}
					</Link>
					<Link to={`/${location}/${wallId}/${collectionId}/${currentBoard}/edit`}>Edit Board</Link>
					<button onClick={this.setActiveBoard} name={currentBoard}>
						Make Active
					</button>
				</div>
			);
		});

		return (
			<div>
				<h2>"{this.state.collectionTitle}" Collection</h2>
				<Link to={`/${location}/${wallId}/${collectionId}/form`}>Add New Board</Link>
				<div>{boardsToRender}</div>
			</div>
		);
	}
}

export default Collection;

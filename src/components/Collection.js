import React, { Component } from 'react';
import Board from './Board';
import base from '../base';

class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: {},
			boardToAdd: '',
			collectionTitle: '',
			location: ''
		};
	}

	componentDidMount() {
		const { collectionId, location, wallId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/walls/${wallId}/collections/${collectionId}/boards`, {
			context: this,
			state: 'boards'
		});

		base.syncState(`/locations/${location}/walls/${wallId}/collections/${collectionId}/name`, {
			context: this,
			state: 'collectionTitle'
		});

		base.syncState(`/locations/${location}/name`, {
			context: this,
			state: 'location'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	handleBoardInputChange = (event) => {
		this.setState({
			boardToAdd: event.target.value
		});
	};

	handleBoardFormSubmit = (event) => {
		event.preventDefault();

		const { boards, boardToAdd } = this.state;

		if (boardToAdd.trim() === '') {
			this.setState({
				boardToAdd: ''
			});
			return;
		}

		boards[Date.now()] = { name: boardToAdd };

		this.setState({
			boards,
			boardToAdd: ''
		});
	};

	render() {
		let boardsToRender = Object.keys(this.state.boards).map((currentBoard, index) => {
			return (
				<Board
					key={index}
					index={currentBoard}
					name={this.state.boards[currentBoard].name}
					pathname={this.props.location.pathname}
				/>
			);
		});

		return (
			<div>
				<h2>
					{this.state.location} - "{this.state.collectionTitle}" Collection
				</h2>
				<form onSubmit={this.handleBoardFormSubmit}>
					<input
						type="text"
						value={this.state.boardToAdd}
						placeholder="Add New Board"
						onChange={this.handleBoardInputChange}
					/>
					<button>Add Board</button>
				</form>
				{boardsToRender}
			</div>
		);
	}
}

export default Collection;

import React, { Component } from 'react';
import base from '../base';

class Wall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: {},
			boardToAdd: ''
		};
	}

	componentDidMount() {
		console.log(this.props);
		this.ref = base.syncState(`/locations/${this.props.pathname}/walls/${this.props.index}/boards`, {
			context: this,
			state: 'boards'
		});
	}

	handleBoardInputChange = (event) => {
		this.setState({
			boardToAdd: event.target.value
		});
	};

	handleBoardFormSubmit = (event) => {
		event.preventDefault();

		console.log('handleBoardFormSubmit called');

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
				<div key={index} index={currentBoard} name={this.state.boards[currentBoard].name}>
					{this.state.boards[currentBoard].name}
				</div>
			);
		});

		return (
			<div>
				<h3>{this.props.name}</h3>
				<form onSubmit={this.handleBoardFormSubmit}>
					<input
						type="text"
						name="add-board"
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

export default Wall;

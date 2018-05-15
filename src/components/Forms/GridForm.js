import React, { Component } from 'react';
import base from '../../base';

class GridForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gridToAdd: {
				title: '',
				boards: {}
			},
			boardOptions: {},
			feedback: ''
		};
		this.locationCollections = {};
	}

	componentDidMount() {
		base
			.fetch(`/locations/${this.props.location}/collections`, { context: this })
			.then((collections) => {
				this.locationCollections = collections;
			})
			.then(() => {
				const boardOptions = {};
				const collections = Object.keys(this.locationCollections).map((currentCollection) => {
					return Object.keys(this.locationCollections[currentCollection].boards).map((currentBoard) => {
						if (
							this.locationCollections[currentCollection].boards[currentBoard].type === 'escape-room'
						) {
							boardOptions[currentBoard] = this.locationCollections[currentCollection].boards[
								currentBoard
							];
						}
					});
				});

				this.setState({
					boardOptions
				});
			});
	}

	handleInputChange = (event) => {
		let { title } = this.state.gridToAdd;

		title = event.target.value;

		this.setState({
			gridToAdd: {
				...this.state.gridToAdd,
				title
			}
		});
	};

	toggleBoardToGrid = (event) => {
		if (Object.keys(this.state.gridToAdd.boards).length === 4) {
			this.setState({
				feedback: 'You may only select 4 boards'
			});
		} else {
			const selectedBoard = this.state.boardOptions[event.target.value];
			const { boards } = this.state.gridToAdd;
			boards[event.target.value] = selectedBoard;
			this.setState({
				gridToAdd: {
					...this.state.gridToAdd,
					boards
				}
			});
		}
	};

	saveGrid = (event) => {
		event.preventDefault();
		if (Object.keys(this.state.gridToAdd.boards).length !== 4) {
			this.setState({
				feedback: 'Please select 4 boards to display'
			});
		} else {
			this.props.submitForm(this.state.gridToAdd);
			this.setState({
				feedback: ''
			});
		}
	};

	render() {
		let currentlySelectedBoards = [];
		if (this.state.gridToAdd.boards) {
			currentlySelectedBoards = Object.keys(this.state.gridToAdd.boards);
		}

		const boardOptions = Object.keys(this.state.boardOptions).map((currentBoard, index) => {
			return (
				<div key={index}>
					<button
						type="button"
						value={currentBoard}
						className={
							currentlySelectedBoards.indexOf(currentBoard) !== -1
								? 'selection selected'
								: 'selection'
						}
						onClick={this.toggleBoardToGrid}
					>
						{this.state.boardOptions[currentBoard].title}
					</button>
				</div>
			);
		});

		const boardNotification = (
			<div>
				You need to have at least 4 escape room boards created to create a grid; please create{' '}
				{4 - this.state.boardOptions.length} more board(s)
			</div>
		);

		return this.state.boardOptions.length < 4 ? (
			boardNotification
		) : (
			<div>
				<form className="new-board" onSubmit={this.saveGrid}>
					<input
						type="text"
						name="title"
						value={this.state.gridToAdd.title}
						className="form-input"
						onChange={this.handleInputChange}
					/>
					<label>Title/Name</label>
					<div>Select four boards to display: </div>
					{boardOptions}
					<button className="confirm" key="create" type="submit">
						Save Board
					</button>
					{this.state.feedback}
				</form>
			</div>
		);
	}
}

export default GridForm;

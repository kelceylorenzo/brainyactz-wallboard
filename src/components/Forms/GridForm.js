import React, { Component } from 'react';
import base from '../../base';

class GridForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gridToAdd: {},
			boardOptions: []
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
				const collections = Object.keys(this.locationCollections).map((currentCollection) => {
					return Object.keys(this.locationCollections[currentCollection].boards).map((currentBoard) => {
						return this.locationCollections[currentCollection].boards[currentBoard];
					});
				});

				const boards = [];
				const boardOptions = [];
				boards.push(...collections);
				boards.map((currentCollection) => {
					currentCollection.map((currentBoard) => {
						if (currentBoard.type === 'escape-room') {
							boardOptions.push(currentBoard);
						}
					});
				});

				this.setState({
					boardOptions
				});
			});
	}

	render() {
		const boardOptions = this.state.boardOptions.map((currentBoard, index) => {
			return <div key={index}>{currentBoard.title}</div>;
		});
		return <div>{boardOptions}</div>;
	}
}

export default GridForm;

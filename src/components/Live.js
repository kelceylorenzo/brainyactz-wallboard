import React, { Component } from 'react';
import base from '../base';
import TextBoard from './Wallboards/TextBoard';
import EscapeRoom from './Wallboards/EscapeRoom';

class Live extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeBoards: {},
			currentBoard: {}
		};
		this.currentActiveIndex = 0;
		this.boardChange = null;
	}

	componentDidMount() {
		const { location, wallId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/walls/${wallId}/active`, {
			context: this,
			state: 'activeBoards',
			then: () => {
				const keys = Object.keys(this.state.activeBoards);
				const { board, collection, duration } = this.state.activeBoards[keys[0]].fileLocation;
				base
					.fetch(`/locations/${location}/collections/${collection}/boards/${board}`, {
						context: this
					})
					.then((board) => {
						this.setState(
							{
								currentBoard: board
							},
							() => {
								if (keys.length > 1) {
									this.boardChange = setTimeout(this.changeBoard, duration);
								}
							}
						);
					});
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
		clearTimeout(boardChange);
	}

	changeBoard = () => {
		const keys = Object.keys(this.state.activeBoards);

		if (this.currentActiveIndex + 1 > keys.length - 1) {
			this.currentActiveIndex = 0;
		} else {
			this.currentActiveIndex++;
		}

		const { location, collection, board, duration } = this.state.activeBoards[
			keys[this.currentActiveIndex]
		].fileLocation;

		base
			.fetch(`/locations/${location}/collections/${collection}/boards/${board}`, {
				context: this
			})
			.then((board) => {
				this.setState(
					{
						currentBoard: board
					},
					() => {
						this.boardChange = setTimeout(this.changeBoard, duration);
					}
				);
			});
	};

	render() {
		switch (this.state.currentBoard.type) {
			case 'text-board':
				return (
					<TextBoard
						title={this.state.currentBoard.title}
						subtitle={this.state.currentBoard.subtitle}
						message={this.state.currentBoard.message}
					/>
				);
			case 'escape-room':
				return (
					<EscapeRoom
						title={this.state.currentBoard.title}
						subtitle={this.state.currentBoard.subtitle}
						backgroundImage={this.state.currentBoard.backgroundImage}
						videoId={this.state.currentBoard.video}
						leaderBoard={this.state.currentBoard.leaderBoard}
					/>
				);
			default:
				return <div>loading</div>;
		}
	}
}

export default Live;

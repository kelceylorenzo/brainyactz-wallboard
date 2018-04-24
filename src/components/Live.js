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
	}

	componentDidMount() {
		const { location, wallId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/walls/${wallId}/active`, {
			context: this,
			state: 'activeBoards',
			then: () => {
				const keys = Object.keys(this.state.activeBoards);
				this.setState(
					{
						currentBoard: this.state.activeBoards[keys[0]]
					},
					() => {
						if (keys.length > 1) {
							setTimeout(this.changeBoard, 10000);
						}
					}
				);
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	changeBoard = () => {
		const keys = Object.keys(this.state.activeBoards);

		if (this.currentActiveIndex + 1 > keys.length - 1) {
			this.currentActiveIndex = 0;
		} else {
			this.currentActiveIndex++;
		}

		this.setState(
			{
				currentBoard: this.state.activeBoards[keys[this.currentActiveIndex]]
			},
			() => {
				setTimeout(this.changeBoard, 10000);
			}
		);
	};

	pullNewBoard = () => {
		this.currentBoard = this.state.boardLocation;
		base.syncState(this.state.boardLocation, {
			context: this,
			state: 'boardInfo'
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

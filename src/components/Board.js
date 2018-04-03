import React, { Component } from 'react';
import base from '../base';
import TextBoard from './Wallboards/TextBoard';
import EscapeRoom from './Wallboards/EscapeRoom';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardInfo: {}
		};
	}

	componentDidMount() {
		const { location, collectionId, boardId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards/${boardId}`, {
			context: this,
			state: 'boardInfo'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		switch (this.state.boardInfo.type) {
			case 'text-board':
				return (
					<TextBoard
						title={this.state.boardInfo.title}
						subtitle={this.state.boardInfo.subtitle}
						message={this.state.boardInfo.message}
					/>
				);
			case 'escape-room':
				return (
					<EscapeRoom
						title={this.state.boardInfo.title}
						subtitle={this.state.boardInfo.subtitle}
						backgroundImage={this.state.boardInfo.backgroundImage}
						videoId={this.state.boardInfo.video}
					/>
				);
			default:
				return <div>loading</div>;
		}
	}
}

export default Board;

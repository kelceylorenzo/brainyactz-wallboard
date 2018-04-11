import React, { Component } from 'react';
import base from '../base';
import TextBoard from './Wallboards/TextBoard';
import EscapeRoom from './Wallboards/EscapeRoom';

class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardLocation: '',
			boardInfo: {}
		};
	}

	componentDidMount() {
		const { location, wallId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/walls/${wallId}/active`, {
			context: this,
			state: 'boardLocation',
			then: () => {
				base.syncState(this.state.boardLocation, {
					context: this,
					state: 'boardInfo'
				});
			}
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
						leaderBoard={this.state.boardInfo.leaderBoard}
					/>
				);
			default:
				return <div>loading</div>;
		}
	}
}

export default Display;

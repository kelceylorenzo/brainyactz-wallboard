import React, { Component } from 'react';
import AddLeaderBoardTeam from './LeaderBoardTeam';

class LeaderBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	saveLeaderBoard = () => {
		this.props.updateLeaderBoard(this.state);
	};

	addTeam = () => {
		const newState = {};
		newState[Date.now()] = { team: '', time: '', date: '', rank: '' };
		this.setState(newState);
	};

	render() {
		console.log(this.state);

		return (
			<div>
				<button type="button" onClick={this.addTeam}>
					Add Team
				</button>
				<button type="button">Cancel</button>
				<button key="save" className="confirm" style={{ width: '100%' }}>
					Save Board
				</button>
			</div>
		);
	}
}

export default LeaderBoardForm;

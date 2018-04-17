import React, { Component } from 'react';

class LeaderBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first: {
				team: '',
				time: '',
				date: ''
			},
			second: {
				team: '',
				time: '',
				date: ''
			},
			third: {
				team: '',
				time: '',
				date: ''
			},
			fourth: {
				team: '',
				time: '',
				date: ''
			},
			fifth: {
				team: '',
				time: '',
				date: ''
			}
		};
	}

	handleFirstInputChange = (event) => {
		const { name, value } = event.target;
		const { first } = this.state;

		first[name] = value;

		this.setState({
			first
		});
	};

	handleSecondInputChange = (event) => {
		const { name, value } = event.target;
		const { second } = this.state;

		second[name] = value;

		this.setState({
			second
		});
	};

	handleThirdInputChange = (event) => {
		const { name, value } = event.target;
		const { third } = this.state;

		third[name] = value;

		this.setState({
			third
		});
	};

	handleFourthInputChange = (event) => {
		const { name, value } = event.target;
		const { fourth } = this.state;

		fourth[name] = value;

		this.setState({
			fourth
		});
	};

	handleFifthInputChange = (event) => {
		const { name, value } = event.target;
		const { fifth } = this.state;

		fifth[name] = value;

		this.setState({
			fifth
		});
	};
	saveLeaderBoard = () => {
		this.props.updateLeaderBoard(this.state);
	};

	render() {
		return (
			<div>
				<h4>First Place Team</h4>
				<input
					type="text"
					placeholder="Team Name"
					value={this.state.first.team}
					name="team"
					onChange={this.handleFirstInputChange}
				/>
				<input
					type="text"
					placeholder="Time Completed In"
					value={this.state.first.time}
					name="time"
					onChange={this.handleFirstInputChange}
				/>
				<input
					type="text"
					placeholder="Date Completed"
					value={this.state.first.date}
					name="date"
					onChange={this.handleFirstInputChange}
				/>
				<h4>Second Place Team</h4>
				<input
					type="text"
					placeholder="Team Name"
					value={this.state.second.team}
					name="team"
					onChange={this.handleSecondInputChange}
				/>
				<input
					type="text"
					placeholder="Time Completed In"
					value={this.state.second.time}
					name="time"
					onChange={this.handleSecondInputChange}
				/>
				<input
					type="text"
					type="text"
					placeholder="Date Completed"
					value={this.state.second.date}
					name="date"
					onChange={this.handleSecondInputChange}
				/>
				<h4>Third Place Team</h4>
				<input
					type="text"
					placeholder="Team Name"
					value={this.state.third.team}
					name="team"
					onChange={this.handleThirdInputChange}
				/>
				<input
					type="text"
					placeholder="Time Completed In"
					value={this.state.third.time}
					name="time"
					onChange={this.handleThirdInputChange}
				/>
				<input
					type="text"
					type="text"
					placeholder="Date Completed"
					value={this.state.third.date}
					name="date"
					onChange={this.handleThirdInputChange}
				/>
				<h4>Fourth Place Team</h4>
				<input
					type="text"
					placeholder="Team Name"
					value={this.state.fourth.team}
					name="team"
					onChange={this.handleFourthInputChange}
				/>
				<input
					type="text"
					placeholder="Time Completed In"
					value={this.state.fourth.time}
					name="time"
					onChange={this.handleFourthInputChange}
				/>
				<input
					type="text"
					type="text"
					placeholder="Date Completed"
					value={this.state.fourth.date}
					name="date"
					onChange={this.handleFourthInputChange}
				/>
				<h4>Fifth Place Team</h4>
				<input
					type="text"
					placeholder="Team Name"
					value={this.state.fifth.team}
					name="team"
					onChange={this.handleFifthInputChange}
				/>
				<input
					type="text"
					placeholder="Time Completed In"
					value={this.state.fifth.time}
					name="time"
					onChange={this.handleFifthInputChange}
				/>
				<input
					type="text"
					type="text"
					placeholder="Date Completed"
					value={this.state.fifth.date}
					name="date"
					onChange={this.handleFifthInputChange}
				/>
				<button className="form confirm" onClick={this.saveLeaderBoard}>
					Create Board
				</button>
			</div>
		);
	}
}

export default LeaderBoardForm;

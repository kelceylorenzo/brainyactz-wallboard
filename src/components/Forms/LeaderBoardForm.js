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
				<label>Team Name</label>
				<input
					type="text"
					placeholder="Enter Name"
					value={this.state.first.team}
					name="team"
					onChange={this.handleFirstInputChange}
				/>
				<label>Time Completed In</label>
				<input
					type="text"
					placeholder="Enter Time"
					value={this.state.first.time}
					name="time"
					onChange={this.handleFirstInputChange}
				/>
				<label>Date Completed</label>
				<input
					type="text"
					placeholder="Enter Date"
					value={this.state.first.date}
					name="date"
					onChange={this.handleFirstInputChange}
				/>
				<h4>Second Place Team</h4>
				<label>Team Name</label>
				<input
					type="text"
					placeholder="Enter Name"
					value={this.state.second.team}
					name="team"
					onChange={this.handleSecondInputChange}
				/>
				<label>Time Completed In</label>
				<input
					type="text"
					placeholder="Enter Time"
					value={this.state.second.time}
					name="time"
					onChange={this.handleSecondInputChange}
				/>
				<label>Date Completed</label>
				<input
					type="text"
					type="text"
					placeholder="Enter Date"
					value={this.state.second.date}
					name="date"
					onChange={this.handleSecondInputChange}
				/>
				<h4>Third Place Team</h4>
				<label>Team Name</label>
				<input
					type="text"
					placeholder="Enter Name"
					value={this.state.third.team}
					name="team"
					onChange={this.handleThirdInputChange}
				/>
				<label>Time Completed In</label>
				<input
					type="text"
					placeholder="Enter Time"
					value={this.state.third.time}
					name="time"
					onChange={this.handleThirdInputChange}
				/>
				<label>Date Completed</label>
				<input
					type="text"
					type="text"
					placeholder="Enter Date"
					value={this.state.third.date}
					name="date"
					onChange={this.handleThirdInputChange}
				/>
				<h4>Fourth Place Team</h4>
				<label>Team Name</label>
				<input
					type="text"
					placeholder="Enter Name"
					value={this.state.fourth.team}
					name="team"
					onChange={this.handleFourthInputChange}
				/>
				<label>Time Completed In</label>
				<input
					type="text"
					placeholder="Enter Time"
					value={this.state.fourth.time}
					name="time"
					onChange={this.handleFourthInputChange}
				/>
				<label>Date Completed</label>
				<input
					type="text"
					type="text"
					placeholder="Enter Date"
					value={this.state.fourth.date}
					name="date"
					onChange={this.handleFourthInputChange}
				/>
				<h4>Fifth Place Team</h4>
				<label>Team Name</label>
				<input
					type="text"
					placeholder="Enter Name"
					value={this.state.fifth.team}
					name="team"
					onChange={this.handleFifthInputChange}
				/>
				<label>Time Completed In</label>
				<input
					type="text"
					placeholder="Enter Time"
					value={this.state.fifth.time}
					name="time"
					onChange={this.handleFifthInputChange}
				/>
				<label>Date Completed</label>
				<input
					type="text"
					type="text"
					placeholder="Enter Date"
					value={this.state.fifth.date}
					name="date"
					onChange={this.handleFifthInputChange}
				/>
				<button onClick={this.saveLeaderBoard}>Create Board</button>
			</div>
		);
	}
}

export default LeaderBoardForm;

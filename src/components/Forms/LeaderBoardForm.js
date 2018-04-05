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
	render() {
		return (
			<div>
				<h4>First Place Team</h4>
				<label>Team Name</label>
				<input type="text" placeholder="Enter Name" value={this.state.first.team} name="first-team" />
				<label>Time Completed In</label>
				<input type="text" placeholder="Enter Time" value={this.state.first.time} name="first-time" />
				<label>Date Completed</label>
				<input type="text" placeholder="Enter Date" value={this.state.first.date} name="first-date" />
				<h4>Second Place Team</h4>
				<label>Team Name</label>
				<input type="text" />
				<label>Time Completed In</label>
				<input type="text" />
				<label>Date Completed</label>
				<input type="text" />
				<h4>Third Place Team</h4>
				<label>Team Name</label>
				<input type="text" />
				<label>Time Completed In</label>
				<input type="text" />
				<label>Date Completed</label>
				<input type="text" />
				<h4>Fourth Place Team</h4>
				<label>Team Name</label>
				<input type="text" />
				<label>Time Completed In</label>
				<input type="text" />
				<label>Date Completed</label>
				<input type="text" />
				<h4>Fifth Place Team</h4>
				<label>Team Name</label>
				<input type="text" />
				<label>Time Completed In</label>
				<input type="text" />
				<label>Date Completed</label>
				<input type="text" />
			</div>
		);
	}
}

export default LeaderBoardForm;

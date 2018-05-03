import React from 'react';

export default (props) => {
	return (
		<div>
			<input
				type="text"
				name="rank"
				value={props.rank}
				placeholder="Team Rank"
				// onChange={this.handleInputChange}
				className="input"
			/>
			<input
				type="text"
				name="team"
				value={props.team}
				placeholder="Team Name"
				// onChange={this.handleInputChange}
				className="input"
			/>
			<input
				type="text"
				name="time"
				value={props.time}
				placeholder="Time Completed"
				// onChange={this.handleInputChange}
				className="input"
			/>
			<input
				type="text"
				name="date"
				value={props.date}
				placeholder="Date Completed"
				// onChange={this.handleInputChange}
				className="input"
			/>
		</div>
	);
};

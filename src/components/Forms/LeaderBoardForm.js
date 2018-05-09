import React from 'react';

export default (props) => {
	return (
		<div className="leaderboard-group">
			<input
				type="text"
				name="rank"
				index={props.leaderID}
				value={props.data.rank}
				placeholder="Team Rank"
				className="form-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Team Rank</label>
			<input
				type="text"
				name="team"
				index={props.leaderID}
				value={props.data.team}
				placeholder="Team Name"
				className="form-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Team Name</label>
			<input
				type="text"
				name="time"
				index={props.leaderID}
				value={props.data.time}
				placeholder="Time Completed"
				className="form-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Time Completed</label>
			<input
				type="text"
				name="date"
				index={props.leaderID}
				value={props.data.date}
				placeholder="Date Completed"
				className="form-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Date Completed</label>
			<button className="cancel delete" type="button" onClick={() => props.removeTeam(props.leaderID)}>
				X
			</button>
		</div>
	);
};

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
				className="leaderboard-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Team Rank</label>
			<input
				type="text"
				name="team"
				index={props.leaderID}
				value={props.data.team}
				placeholder="Team Name"
				className="leaderboard-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Team Name</label>
			<input
				type="text"
				name="time"
				index={props.leaderID}
				value={props.data.time}
				placeholder="Time Completed"
				className="leaderboard-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Time Completed</label>
			<input
				type="text"
				name="date"
				index={props.leaderID}
				value={props.data.date}
				placeholder="Date Completed"
				className="leaderboard-input"
				onChange={props.handleLeaderBoardInputChange}
			/>
			<label>Date Completed</label>
			<button className="cancel delete" type="button" onClick={props.removeTeam}>
				X
			</button>
		</div>
	);
	// return [
	// 	<input
	// 		type="text"
	// 		name="rank"
	// 		index={props.leaderID}
	// 		value={props.data.rank}
	// 		placeholder="Team Rank"
	// 		onChange={props.handleLeaderBoardInputChange}
	// 		className="input"
	// 		key={`rank-${props.leaderID}`}
	// 	/>,
	// 	<input
	// 		type="text"
	// 		name="team"
	// 		index={props.leaderID}
	// 		value={props.data.team}
	// 		placeholder="Team Name"
	// 		onChange={props.handleLeaderBoardInputChange}
	// 		className="input"
	// 		key={`team-${props.leaderID}`}
	// 	/>,
	// 	<input
	// 		type="text"
	// 		name="time"
	// 		index={props.leaderID}
	// 		value={props.data.time}
	// 		placeholder="Time Completed"
	// 		onChange={props.handleLeaderBoardInputChange}
	// 		className="input"
	// 		key={`time-${props.leaderID}`}
	// 	/>,
	// 	<input
	// 		type="text"
	// 		name="date"
	// 		index={props.leaderID}
	// 		value={props.data.date}
	// 		placeholder="Date Completed"
	// 		onChange={props.handleLeaderBoardInputChange}
	// 		className="input"
	// 		key={`date-${props.leaderID}`}
	// 	/>,
	// 	<button key="delete-team" className="cancel" type="button" onClick={props.removeTeam}>
	// 		Delete Team
	// 	</button>
	// ];
};

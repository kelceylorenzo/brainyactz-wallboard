import React from 'react';

export default (props) => {
	return [
		<input
			type="text"
			name="rank"
			index={props.leaderID}
			value={props.data.rank}
			placeholder="Team Rank"
			onChange={props.handleLeaderBoardInputChange}
			className="input"
			key={`rank-${props.leaderID}`}
		/>,
		<input
			type="text"
			name="team"
			index={props.leaderID}
			value={props.data.team}
			placeholder="Team Name"
			onChange={props.handleLeaderBoardInputChange}
			className="input"
			key={`team-${props.leaderID}`}
		/>,
		<input
			type="text"
			name="time"
			index={props.leaderID}
			value={props.data.time}
			placeholder="Time Completed"
			onChange={props.handleLeaderBoardInputChange}
			className="input"
			key={`time-${props.leaderID}`}
		/>,
		<input
			type="text"
			name="date"
			index={props.leaderID}
			value={props.data.date}
			placeholder="Date Completed"
			onChange={props.handleLeaderBoardInputChange}
			className="input"
			key={`date-${props.leaderID}`}
		/>
	];
};

import React from 'react';

export default (props) => {
	let rankings = [];
	for (let ranking in props.leaderBoard) {
		rankings.push(props.leaderBoard[ranking]);
	}

	rankings.sort(function(a, b) {
		return a.rank - b.rank;
	});

	const leaderBoardTeams = rankings.map((currentLeader, index) => {
		return (
			<div className="leaderboard-entry" key={index}>
				<div>{currentLeader.rank}.</div>
				<div>{currentLeader.team}</div>
				<div>{currentLeader.time}</div>
				<div>{currentLeader.date}</div>
			</div>
		);
	});

	return (
		<div className="leaderboard-container">
			<div className="leaderboard-title">Leader Board</div>
			{leaderBoardTeams}
		</div>
	);
};

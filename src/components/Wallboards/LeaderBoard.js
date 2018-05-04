import React from 'react';

export default (props) => {
	let rankings = [];
	for (let ranking in props.leaderBoard) {
		rankings.push(props.leaderBoard[ranking]);
	}

	rankings.sort(function(a, b) {
		return a.rank - b.rank;
	});

	console.log(rankings);

	return (
		<div className="leaderboard-container">
			<div className="leaderboard-title">Leader Board</div>
			<div className="leaderboard-entry">
				<div>1.</div>
				<div>{rankings[0].team}</div>
				<div>{rankings[0].time}</div>
				<div>{rankings[0].date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>2.</div>
				<div>{rankings[1].team}</div>
				<div>{rankings[1].time}</div>
				<div>{rankings[1].date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>3.</div>
				<div>{rankings[2].team}</div>
				<div>{rankings[2].time}</div>
				<div>{rankings[2].date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>4.</div>
				<div>{rankings[3].team}</div>
				<div>{rankings[3].time}</div>
				<div>{rankings[3].date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>5.</div>
				<div>{rankings[4].team}</div>
				<div>{rankings[4].time}</div>
				<div>{rankings[4].date}</div>
			</div>
		</div>
	);
};

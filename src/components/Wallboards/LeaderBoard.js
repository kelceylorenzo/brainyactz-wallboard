import React from 'react';

export default (props) => {
	return (
		<div className="leaderboard-container">
			<div className="leaderboard-title">Leader Board</div>
			<div className="leaderboard-entry">
				<div>1.</div>
				<div>{props.leaderBoard.first.team}</div>
				<div>{props.leaderBoard.first.time}</div>
				<div>{props.leaderBoard.first.date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>2.</div>
				<div>{props.leaderBoard.second.team}</div>
				<div>{props.leaderBoard.second.time}</div>
				<div>{props.leaderBoard.second.date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>3.</div>
				<div>{props.leaderBoard.third.team}</div>
				<div>{props.leaderBoard.third.time}</div>
				<div>{props.leaderBoard.third.date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>4.</div>
				<div>{props.leaderBoard.fourth.team}</div>
				<div>{props.leaderBoard.fourth.time}</div>
				<div>{props.leaderBoard.fourth.date}</div>
			</div>
			<div className="leaderboard-entry">
				<div>5.</div>
				<div>{props.leaderBoard.fifth.team}</div>
				<div>{props.leaderBoard.fifth.time}</div>
				<div>{props.leaderBoard.fifth.date}</div>
			</div>
		</div>
	);
};

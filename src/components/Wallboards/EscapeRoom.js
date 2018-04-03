import React from 'react';

export default (props) => {
	console.log(props);
	let style = {
		backgroundImage: `url(${props.backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	};

	return (
		<div className="page-container" style={style}>
			<div className="page-container escape-room">
				<div className="page-title escape-room">{props.title}</div>
				<div className="page-subtitle escape-room">{props.subtitle}</div>
				<div className="page-content escape-room">Optional Video</div>
				<div className="page-content escape-room">Leaderboard</div>
			</div>
		</div>
	);
};

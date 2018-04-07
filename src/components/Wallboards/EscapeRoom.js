import React from 'react';

export default (props) => {
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
				<div className="page-content escape-room">
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${
							props.videoId
						}?autoplay=1&loop=1&rel=0&showinfo=0&color=white&playlist=${props.videoId}`}
						frameborder="0"
						allowfullscreen
					/>
				</div>
				<div className="page-content escape-room">Leaderboard</div>
			</div>
		</div>
	);
};

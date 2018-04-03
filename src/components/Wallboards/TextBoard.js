import React from 'react';

export default (props) => {
	return (
		<div className="page-container">
			<div className="page-title">{props.title}</div>
			<div className="page-subtitle">{props.subtitle}</div>
			<div className="page-content">{props.message}</div>
		</div>
	);
};

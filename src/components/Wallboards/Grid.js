import React from 'react';

export default (props) => {
	const boardsToRender = Object.keys(props.boardData.boards).map((currentBoard, index) => {
		return (
			<div
				key={index}
				className="escape-grid-wrapper"
				style={{
					backgroundImage: `url(${props.boardData.boards[currentBoard].backgroundImage})`
				}}
			>
				<div className="escape-grid-item">
					<div className="escape-grid page-title">{props.boardData.boards[currentBoard].title}</div>
					<div className="escape-grid page-subtitle">
						{props.boardData.boards[currentBoard].subtitle}
					</div>
				</div>
			</div>
		);
	});
	return <div className="page-container escape-grid">{boardsToRender}</div>;
};

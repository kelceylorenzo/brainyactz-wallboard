import React, { Component } from 'react';
import LeaderBoardForm from './LeaderBoardForm';

class EscapeRoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				type: 'escape-room',
				title: '',
				subtitle: '',
				video: '',
				backgroundImage: '',
				leaderBoard: {}
			},
			leaderBoardStatus: false
		};
	}

	handleInputChange = (event) => {
		let { name, value } = event.target;
		let { form } = this.state;

		if (name === 'video') {
			value = value.trim().slice(-11);
		}

		form[name] = value;

		this.setState({ form });
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.props.submitForm(this.state.form);
	};

	toggleLeaderBoardForm = () => {
		this.setState({
			leaderBoardStatus: true
		});
	};

	updateLeaderBoard = (updatedLeaderBoard) => {
		const { form } = this.state;
		this.setState({
			form: {
				...form,
				leaderBoard: updatedLeaderBoard
			}
		});
	};

	render() {
		return (
			<form className="new-board" onSubmit={this.handleFormSubmit}>
				<label>Title/Name</label>
				<input
					type="text"
					name="title"
					value={this.state.title}
					placeholder="Title/Name"
					onChange={this.handleInputChange}
				/>
				<label>Subtitle</label>
				<input
					type="text"
					name="subtitle"
					value={this.state.subtitle}
					placeholder="Subtitle"
					onChange={this.handleInputChange}
				/>
				<label>Background Image</label>
				<input
					type="text"
					name="backgroundImage"
					value={this.state.backgroundImage}
					placeholder="Background Image URL"
					onChange={this.handleInputChange}
				/>
				<label>Video</label>
				<input
					type="text"
					name="video"
					value={this.state.video}
					placeholder="Video URL"
					onChange={this.handleInputChange}
				/>
				{this.state.leaderBoardStatus ? (
					<LeaderBoardForm updateLeaderBoard={this.updateLeaderBoard} />
				) : (
					[
						<button className="active" key="toggle" type="button" onClick={this.toggleLeaderBoardForm}>
							Add LeaderBoard
						</button>,
						<button className="confirm" key="create" type="submit">
							Create Board
						</button>
					]
				)}
			</form>
		);
	}
}

export default EscapeRoomForm;

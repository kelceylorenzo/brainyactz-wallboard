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

	handleLeaderBoardInputChange = (event) => {
		let { name, value, index } = event.target;
		let { leaderBoard } = this.state.form;
		const iD = event.target.attributes[2].nodeValue;

		leaderBoard[iD][name] = value;

		this.setState({
			form: {
				...this.state.form,
				leaderBoard
			}
		});
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

	addTeam = () => {
		const { leaderBoard } = this.state.form;
		leaderBoard[Date.now()] = { team: '', time: '', date: '', rank: '' };
		this.setState({
			form: {
				...this.state.form,
				leaderBoard
			}
		});
	};

	removeLeaderBoard = () => {
		console.log('remove entire leaderBoard');
	};

	removeTeam = () => {
		console.log('remove team');
	};

	render() {
		const leaderTeams = Object.keys(this.state.form.leaderBoard).map((currentLeader, index) => {
			return (
				<LeaderBoardForm
					handleLeaderBoardInputChange={this.handleLeaderBoardInputChange}
					data={this.state.form.leaderBoard[currentLeader]}
					leaderID={currentLeader}
					key={index}
				/>
			);
		});
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
					[
						<button key="add-team" type="button" className="active" onClick={this.addTeam}>
							Add Team
						</button>,
						<button key="cancel" type="button" onClick={this.removeLeaderBoard}>
							Remove Leader Board
						</button>
					]
				) : (
					<button className="active" type="button" onClick={this.toggleLeaderBoardForm}>
						Add Leader Board
					</button>
				)}

				{leaderTeams}

				<button className="confirm" key="create" type="submit">
					Save Board
				</button>
			</form>
		);
	}
}

export default EscapeRoomForm;

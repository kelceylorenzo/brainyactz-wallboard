import React, { Component } from 'react';
import LeaderBoardForm from './LeaderBoardForm';

class EscapeRoomEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: this.props.data,
			feedback: '',
			newLeaderBoard: false
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
		this.props.saveChanges(this.state.form);
	};

	toggleNewLeaderBoard = () => {
		this.setState({
			newLeaderBoard: true
		});
	};

	addTeam = () => {
		let leaderBoard = {};
		if (this.state.form.leaderBoard) {
			leaderBoard = this.state.form.leaderBoard;
		}

		leaderBoard[Date.now()] = { team: '', time: '', date: '', rank: '' };
		this.setState({
			form: {
				...this.state.form,
				leaderBoard
			}
		});
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

	render() {
		let leaderTeams = [];
		if (this.state.form.leaderBoard) {
			leaderTeams = Object.keys(this.state.form.leaderBoard).map((currentLeader, index) => {
				return (
					<LeaderBoardForm
						handleLeaderBoardInputChange={this.handleLeaderBoardInputChange}
						data={this.state.form.leaderBoard[currentLeader]}
						leaderID={currentLeader}
						key={index}
					/>
				);
			});
		}

		return (
			<div>
				<form className="edit-board" onSubmit={this.handleFormSubmit}>
					<label>Title/Name</label>
					<input
						type="text"
						name="title"
						value={this.state.form.title}
						placeholder="Title/Name"
						onChange={this.handleInputChange}
					/>
					<label>Subtitle</label>
					<input
						type="text"
						name="subtitle"
						value={this.state.form.subtitle}
						placeholder="Subtitle"
						onChange={this.handleInputChange}
					/>
					<label>Background Image</label>
					<input
						type="url"
						name="backgroundImage"
						value={this.state.form.backgroundImage}
						placeholder="Background Image URL"
						onChange={this.handleInputChange}
					/>
					<label>Video</label>
					<input
						type="text"
						name="video"
						value={`https://www.youtube.com/watch?v=${this.state.form.video}`}
						placeholder="Video URL"
						onChange={this.handleInputChange}
					/>
					{!this.state.newLeaderBoard && !this.state.form.leaderBoard ? (
						<button type="button" className="active" onClick={this.toggleNewLeaderBoard}>
							Add Leader Board
						</button>
					) : (
						[
							<button key="add-team" type="button" onClick={this.addTeam}>
								Add Team
							</button>,
							<button key="cancel-team" type="button" onClick={this.addTeam}>
								Cancel
							</button>
						]
					)}
					{leaderTeams}
					<button key="save" className="confirm">
						Save Board
					</button>
					<button className="cancel" onClick={this.props.goBack}>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}

export default EscapeRoomEditForm;

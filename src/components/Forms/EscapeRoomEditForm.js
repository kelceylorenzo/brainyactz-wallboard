import React, { Component } from 'react';
import LeaderBoardEditForm from './LeaderBoardEditForm';

class EscapeRoomEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: this.props.data,
			feedback: ''
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
			<div>
				<form onSubmit={this.handleFormSubmit}>
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
					{this.state.form.leaderBoard ? (
						<LeaderBoardEditForm
							data={this.state.form.leaderBoard}
							updateLeaderBoard={this.updateLeaderBoard}
							submitForm={this.handleFormSubmit}
						/>
					) : (
						// <div>leaderBoard edit form</div>
						<button>Save Changes</button>
					)}
				</form>
			</div>
		);
	}
}

export default EscapeRoomEditForm;

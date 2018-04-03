import React, { Component } from 'react';
import base from '../base';

class NewBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: ''
		};
	}

	changeFormInputs = (event) => {
		this.setState({
			formType: event.target.value
		});
	};

	render() {
		let textBoard = [
			<label key="textBoard1">Title/Name:</label>,
			<input type="text" name="title" placeholder="Title/Name" key="textBoard2" />,
			<label key="textBoard3">Subtitle:</label>,
			<input type="text" name="subtitle" placeholder="Subtitle" key="textBoard4" />,
			<label key="textBoard5">Message:</label>,
			<textarea name="message" placeholder="Enter Message Here" id="" cols="30" rows="5" key="textBoard6" />
		];

		let escapeRoom = [
			<label key="escapeRoom1">Title/Name</label>,
			<input type="text" name="title" placeholder="Title/Name" key="escapeRoom2" />,
			<label key="escapeRoom3">Subtitle</label>,
			<input type="text" name="subtitle" placeholder="Subtitle" key="escapeRoom4" />,
			<label key="escapeRoom5">Background Image</label>,
			<input type="url" name="background-image" placeholder="Background Image URL" key="escapeRoom6" />,
			<label key="escapeRoom7">Video</label>,
			<input type="url" name="video" placeholder="Video URL" key="escapeRoom8" />,
			<label key="escapeRoom9">Leader Board (Coming Soon)</label>
		];

		return (
			<div>
				<form>
					<select name="form-type" onChange={this.changeFormInputs}>
						<option>Select Wallboard Type</option>
						<option value="text-board">Text Board</option>
						<option value="escape-room">Escape Room</option>
						<option value="current-rooms">Current Rooms</option>
						<option value="room-teaser">Rooms Teaser</option>
						<option value="social-feeds">Social Feed</option>
					</select>
					{this.state.formType === 'text-board'
						? textBoard
						: this.state.formType === 'escape-room' ? escapeRoom : ''}
				</form>
			</div>
		);
	}
}

export default NewBoardForm;

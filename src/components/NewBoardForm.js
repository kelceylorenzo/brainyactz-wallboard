import React, { Component } from 'react';

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
		switch (this.state.formType) {
			case 'text-board':
				return (
					<div>
						<p>Add New Text Board</p>
						<form>
							<select name="board-type" onChange={this.changeFormInputs}>
								<option>Select Board Type</option>
								<option value="text-board">Text Board</option>
								<option value="escape-room">Escape Room</option>
								<option value="available-rooms">Available Rooms</option>
								<option value="room-teaser">Room Teaser</option>
								<option value="social">Social Media Feed</option>
							</select>
							<input type="text" />
						</form>
					</div>
				);
			default:
				return (
					<div>
						<p>Add New Board</p>
						<form>
							<select name="board-type" onChange={this.changeFormInputs}>
								<option>Select Board Type</option>
								<option value="text-board">Text Board</option>
								<option value="escape-room">Escape Room</option>
								<option value="available-rooms">Available Rooms</option>
								<option value="room-teaser">Room Teaser</option>
								<option value="social">Social Media Feed</option>
							</select>
						</form>
					</div>
				);
		}
	}
}

export default NewBoardForm;

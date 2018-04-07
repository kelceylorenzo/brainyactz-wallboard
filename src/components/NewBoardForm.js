import React, { Component } from 'react';
import TextBoardForm from './Forms/TextBoardForm';
import EscapeRoomForm from './Forms/EscapeRoomForm';
import base from '../base';

class NewBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: '',
			feedback: ''
		};
	}

	changeFormType = (event) => {
		this.setState({
			formType: event.target.value
		});
	};

	submitForm = (boardData) => {
		const { collectionId, location } = this.props.match.params;
		this.ref = base
			.push(`/locations/${location}/collections/${collectionId}/boards`, {
				data: boardData
			})
			.then(() => {
				this.setState({
					feedback: 'Board Created!'
				});
				return;
			})
			.catch(() => {
				this.setState({
					feedback: 'There was an issue creating your board; please try again.'
				});
				return;
			});
	};

	render() {
		return (
			<div>
				<button onClick={this.props.history.goBack}>Back</button>
				<form>
					<input type="radio" name="form-type" value="text-board" onChange={this.changeFormType} />
					<label>Text Board</label>
					<input type="radio" name="form-type" value="escape-room" onChange={this.changeFormType} />
					<label>Escape Room</label>
				</form>

				{this.state.formType === 'text-board' ? (
					<TextBoardForm submitForm={this.submitForm} />
				) : this.state.formType === 'escape-room' ? (
					<EscapeRoomForm submitForm={this.submitForm} />
				) : (
					''
				)}

				<div>{this.state.feedback}</div>
			</div>
		);
	}
}

export default NewBoardForm;

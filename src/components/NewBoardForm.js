import React, { Component } from 'react';
import TextBoardForm from './Forms/TextBoardForm';
import EscapeRoomForm from './Forms/EscapeRoomForm';
import GridForm from './Forms/GridForm';
import base from '../base';

class NewBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: '',
			feedback: '',
			boardData: {}
		};
	}

	componentDidMount() {
		const { location, collectionId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards/${Date.now()}`, {
			context: this,
			state: 'boardData'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	changeFormType = (event) => {
		event.preventDefault();
		this.setState({
			formType: event.target.value
		});
	};

	submitForm = (formData) => {
		this.setState({
			boardData: formData,
			feedback: 'Board Created!'
		});
	};

	render() {
		return (
			<div>
				<div className="subheading">
					<button onClick={this.props.history.goBack}>←</button>
				</div>

				<form className="new-board">
					<label>Select Board Type</label>
					<button
						className={
							this.state.formType === 'text-board' ? 'form selection selected' : 'form selection'
						}
						name="form-type"
						value="text-board"
						onClick={this.changeFormType}
					>
						Text Board
					</button>
					<button
						className={
							this.state.formType === 'escape-room' ? 'form selection selected' : 'form selection'
						}
						name="form-type"
						value="escape-room"
						onClick={this.changeFormType}
					>
						Escape Room
					</button>
					<button
						className={this.state.formType === 'grid' ? 'form selection selected' : 'form selection'}
						name="form-type"
						value="grid"
						onClick={this.changeFormType}
					>
						Escape Room Grid
					</button>
				</form>

				{this.state.formType === 'text-board' ? (
					<TextBoardForm submitForm={this.submitForm} />
				) : this.state.formType === 'escape-room' ? (
					<EscapeRoomForm submitForm={this.submitForm} />
				) : this.state.formType === 'grid' ? (
					<GridForm location={this.props.match.params.location} submitForm={this.submitForm} />
				) : (
					''
				)}

				<div>{this.state.feedback}</div>
			</div>
		);
	}
}

export default NewBoardForm;

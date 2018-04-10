import React, { Component } from 'react';
import base from '../base';

class EditBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalBoardData: {},
			editedBoardData: {},
			feedback: ''
		};
	}

	componentDidMount() {
		const { location, collectionId, boardId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards/${boardId}`, {
			context: this,
			state: 'originalBoardData',
			then: () => {
				this.setState({
					editedBoardData: this.state.originalBoardData
				});
			}
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		const { editedBoardData } = this.state;

		editedBoardData[name] = value;

		this.setState({ editedBoardData });
	};

	saveChanges = (event) => {
		event.preventDefault();
		this.setState({
			originalBoardData: this.state.editedBoardData,
			feedback: 'Changes Saved!'
		});
	};

	render() {
		switch (this.state.editedBoardData.type) {
			case 'text-board':
				return (
					<div>
						<form onSubmit={this.saveChanges}>
							<label>Title/Name:</label>
							<input
								type="text"
								name="title"
								value={this.state.editedBoardData.title}
								placeholder="Title/Name"
								onChange={this.handleInputChange}
								required
							/>
							<label>Subtitle:</label>
							<input
								type="text"
								name="subtitle"
								value={this.state.editedBoardData.subtitle}
								placeholder="Subtitle"
								onChange={this.handleInputChange}
								required
							/>
							<label>Message:</label>
							<textarea
								name="message"
								value={this.state.editedBoardData.message}
								placeholder="Enter Message Here"
								cols="30"
								rows="5"
								onChange={this.handleInputChange}
							/>
							<button>Save Changes</button>
						</form>
						<div>{this.state.feedback}</div>
					</div>
				);
			case 'escape-room':
				return <div>escape room edit form</div>;
			default:
				return <div>loading ... </div>;
		}
	}
}

export default EditBoardForm;

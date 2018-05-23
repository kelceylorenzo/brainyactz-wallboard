import React, { Component } from 'react';
import base from '../../base';
import LeaderBoardForm from './LeaderBoardForm';

class GridEditForm extends Component {
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

		form[name] = value;

		this.setState({ form });
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.props.saveChanges(this.state.form);
	};

	render() {
		return (
			<div>
				<form className="edit-board" onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="title"
						value={this.state.form.title}
						placeholder="Title/Name"
						className="form-input"
						onChange={this.handleInputChange}
					/>
					<label>Title/Name</label>

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

export default GridEditForm;

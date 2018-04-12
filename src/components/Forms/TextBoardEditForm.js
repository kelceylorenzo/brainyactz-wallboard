import React, { Component } from 'react';

class TextBoardEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: this.props.data
		};
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		const { form } = this.state;

		form[name] = value;

		this.setState({ form });
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.props.saveChanges(this.state.form);
	};

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<label>Title/Name:</label>
				<input
					type="text"
					name="title"
					value={this.state.form.title}
					placeholder="Title/Name"
					onChange={this.handleInputChange}
					required
				/>
				<label>Subtitle:</label>
				<input
					type="text"
					name="subtitle"
					value={this.state.form.subtitle}
					placeholder="Subtitle"
					onChange={this.handleInputChange}
					required
				/>
				<label>Message:</label>
				<textarea
					name="message"
					value={this.state.form.message}
					placeholder="Enter Message Here"
					cols="30"
					rows="5"
					onChange={this.handleInputChange}
				/>
				<button>Save Changes</button>
			</form>
		);
	}
}

export default TextBoardEditForm;

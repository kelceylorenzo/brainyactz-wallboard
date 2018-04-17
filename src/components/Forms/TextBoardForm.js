import React, { Component } from 'react';

class TextBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				type: 'text-board',
				title: '',
				subtitle: '',
				message: ''
			}
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
		this.props.submitForm(this.state.form);
	};

	render() {
		return (
			<form className="new-board" onSubmit={this.handleFormSubmit}>
				<label>Title/Name:</label>
				<input
					type="text"
					name="title"
					value={this.state.title}
					placeholder="Title/Name"
					onChange={this.handleInputChange}
				/>
				<label>Subtitle:</label>
				<input
					type="text"
					name="subtitle"
					value={this.state.subtitle}
					placeholder="Subtitle"
					onChange={this.handleInputChange}
				/>
				<label>Message:</label>
				<textarea
					name="message"
					value={this.state.message}
					placeholder="Enter Message Here"
					cols="30"
					rows="5"
					onChange={this.handleInputChange}
				/>
				<button>Create Board</button>
			</form>
		);
	}
}

export default TextBoardForm;

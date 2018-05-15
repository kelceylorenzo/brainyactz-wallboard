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
				<input
					className="form-input"
					type="text"
					name="title"
					value={this.state.title}
					onChange={this.handleInputChange}
				/>
				<label>Title/Name</label>

				<input
					className="form-input"
					type="text"
					name="subtitle"
					value={this.state.subtitle}
					onChange={this.handleInputChange}
				/>
				<label>Subtitle</label>

				<textarea
					className="form-input"
					name="message"
					value={this.state.message}
					cols="30"
					rows="5"
					onChange={this.handleInputChange}
				/>
				<label>Message</label>
				<button className="confirm">Save Board</button>
			</form>
		);
	}
}

export default TextBoardForm;

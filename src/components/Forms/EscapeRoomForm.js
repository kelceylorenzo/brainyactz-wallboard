import React, { Component } from 'react';

class EscapeRoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				type: 'escape-room',
				title: '',
				subtitle: '',
				video: '',
				backgroundImage: ''
			}
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
		this.props.submitForm(this.state.form);
	};

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<label>Title/Name</label>
				<input
					type="text"
					name="title"
					value={this.state.title}
					placeholder="Title/Name"
					onChange={this.handleInputChange}
				/>
				<label>Subtitle</label>
				<input
					type="text"
					name="subtitle"
					value={this.state.subtitle}
					placeholder="Subtitle"
					onChange={this.handleInputChange}
				/>
				<label>Background Image</label>
				<input
					type="url"
					name="backgroundImage"
					value={this.state.backgroundImage}
					placeholder="Background Image URL"
					onChange={this.handleInputChange}
				/>
				<label>Video</label>
				<input
					type="url"
					name="video"
					value={this.state.video}
					placeholder="Video URL"
					onChange={this.handleInputChange}
				/>
				<label>Leader Board (Coming Soon)</label>
				<button>Creat Board</button>
			</form>
		);
	}
}

export default EscapeRoomForm;

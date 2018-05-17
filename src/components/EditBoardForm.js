import React, { Component } from 'react';
import base from '../base';
import TextBoardEditForm from './Forms/TextBoardEditForm';
import EscapeRoomEditForm from './Forms/EscapeRoomEditForm';
import GridEditForm from './Forms/GridEditForm';

class EditBoardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalBoardData: {},
			feedback: ''
		};
	}

	componentDidMount() {
		const { location, collectionId, boardId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards/${boardId}`, {
			context: this,
			state: 'originalBoardData'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	saveChanges = (editedBoardData) => {
		this.setState({
			originalBoardData: editedBoardData,
			feedback: 'Changes Saved!'
		});
	};

	render() {
		switch (this.state.originalBoardData.type) {
			case 'text-board':
				return (
					<div>
						<div className="subheading">
							<button type="button" onClick={this.props.history.goBack}>
								←
							</button>
						</div>
						<TextBoardEditForm
							data={this.state.originalBoardData}
							saveChanges={this.saveChanges}
							goBack={this.props.history.goBack}
						/>
						<div>{this.state.feedback}</div>
					</div>
				);
			case 'escape-room':
				return (
					<div>
						<div className="subheading">
							<button type="button" onClick={this.props.history.goBack}>
								←
							</button>
						</div>
						<EscapeRoomEditForm
							data={this.state.originalBoardData}
							saveChanges={this.saveChanges}
							goBack={this.props.history.goBack}
							boardLocation={this.props.match.params}
						/>
						<div>{this.state.feedback}</div>
					</div>
				);
			case 'grid':
				return (
					<div>
						<div className="subheading">
							<button type="button" onClick={this.props.history.goBack}>
								←
							</button>
						</div>
						<GridEditForm
							data={this.state.originalBoardData}
							saveChanges={this.saveChanges}
							goBack={this.props.history.goBack}
							boardLocation={this.props.match.params}
						/>
						<div>{this.state.feedback}</div>
					</div>
				);
			default:
				return <div>loading ... </div>;
		}
	}
}

export default EditBoardForm;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from '../base';

class Wall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collections: {},
			collectionToAdd: ''
		};
	}

	componentDidMount() {
		this.ref = base.syncState(`/locations/${this.props.pathname}/walls/${this.props.index}/collections`, {
			context: this,
			state: 'collections'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	handleCollectionInputChange = (event) => {
		this.setState({
			collectionToAdd: event.target.value
		});
	};

	handleCollectionFormSubmit = (event) => {
		event.preventDefault();

		const { collections, collectionToAdd } = this.state;

		if (collectionToAdd.trim() === '') {
			this.setState({
				collectionToAdd: ''
			});
			return;
		}

		collections[Date.now()] = { name: collectionToAdd };

		this.setState({
			collections,
			collectionToAdd: ''
		});
	};

	render() {
		let collectionsToRender = Object.keys(this.state.collections).map((currentCollection, index) => {
			return (
				<button
					key={index}
					name={this.state.collections[currentCollection].name}
					onClick={() => this.props.redirectToCollectionPage(currentCollection, this.props.index)}
				>
					{this.state.collections[currentCollection].name}
				</button>
			);
		});

		return (
			<div>
				<h3>{this.props.name}</h3>
				<form onSubmit={this.handleCollectionFormSubmit}>
					<input
						type="text"
						name="add-collection"
						value={this.state.collectionToAdd}
						placeholder="Add New Collection"
						onChange={this.handleCollectionInputChange}
					/>
					<button>Add Collection</button>
				</form>
				{collectionsToRender}
			</div>
		);
	}
}

export default Wall;

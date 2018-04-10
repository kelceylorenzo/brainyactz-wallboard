import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from '../base';

class Wall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collections: {},
			collectionToAdd: '',
			title: '',
			location: ''
		};
	}

	componentDidMount() {
		const { location, wallId } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections`, {
			context: this,
			state: 'collections'
		});

		base.syncState(`/locations/${location}/walls/${wallId}/name`, {
			context: this,
			state: 'title'
		});

		base.syncState(`/locations/${location}/name`, {
			context: this,
			state: 'location'
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

	redirectToCollectionPage = (collectionId) => {
		const { location, wallId } = this.props.match.params;
		this.props.history.push(`/${location}/${wallId}/${collectionId}`);
	};

	render() {
		let collectionsToRender = Object.keys(this.state.collections).map((currentCollection, index) => {
			return (
				<button
					key={index}
					name={this.state.collections[currentCollection].name}
					onClick={() => this.redirectToCollectionPage(currentCollection)}
				>
					{this.state.collections[currentCollection].name}
				</button>
			);
		});

		return (
			<div>
				<h2>
					{this.state.location} - {this.state.title}
				</h2>
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

				<Link to={`${this.props.match.url}/display`}>Display</Link>
			</div>
		);
	}
}

export default Wall;

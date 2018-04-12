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

		this.location = '';
		this.wall = '';
	}

	componentDidMount() {
		const { location, wallId } = this.props.match.params;

		base.fetch(`/locations/${location}/name`, { context: this }).then((locationName) => {
			this.location = locationName;
		});

		base.fetch(`/locations/${location}/walls/${wallId}/name`, { context: this }).then((wallName) => {
			this.wall = wallName;
		});

		this.ref = base.syncState(`/locations/${location}/collections`, {
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
				<div className="heading">
					BrainyActz Wallboard Manager > {this.location} > {this.wall}
				</div>
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

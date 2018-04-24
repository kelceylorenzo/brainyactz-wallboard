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

	removeCollection = (collectionToRemove) => {
		const { location } = this.props.match.params;
		base
			.remove(`/locations/${location}/collections/${collectionToRemove}`)
			.then(() => {
				console.log('collection was removed');
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};

	render() {
		const { location, wallId } = this.props.match.params;
		let collectionsToRender = Object.keys(this.state.collections).map((currentCollection, index) => {
			return (
				<div key={index}>
					<button className="delete cancel" onClick={() => this.removeCollection(currentCollection)}>
						X
					</button>
					<Link to={`/${location}/${wallId}/${currentCollection}`} className="selection">
						{this.state.collections[currentCollection].name}
					</Link>
				</div>
			);
		});

		return (
			<div>
				<div className="heading">
					<Link className="header-link" to="/">
						BrainyActz Wallboard Manager
					</Link>
					>
					<Link className="header-link" to={`/${location}`}>
						{this.location}
					</Link>
					> {this.wall}
				</div>
				<form onSubmit={this.handleCollectionFormSubmit}>
					<input
						type="text"
						name="add-collection"
						value={this.state.collectionToAdd}
						placeholder="Collection Title"
						onChange={this.handleCollectionInputChange}
					/>
					<button className="confirm">Add Collection</button>
				</form>
				<div className="body">
					<Link className="selection active" to={`${this.props.match.url}/live`}>
						Live Display
					</Link>
					<Link className="selection edit" to={`${this.props.match.url}/display`}>
						Display Info
					</Link>
				</div>
				<div className="subheading">Collections</div>
				<div className="body">{collectionsToRender}</div>
			</div>
		);
	}
}

export default Wall;

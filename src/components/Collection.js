import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import base from '../base';

class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: {},
			boardToAdd: '',
			collectionTitle: '',
			location: ''
		};
	}

	componentDidMount() {
		const { collectionId, location } = this.props.match.params;
		this.ref = base.syncState(`/locations/${location}/collections/${collectionId}/boards`, {
			context: this,
			state: 'boards'
		});

		base.syncState(`/locations/${location}/collections/${collectionId}/name`, {
			context: this,
			state: 'collectionTitle'
		});

		base.syncState(`/locations/${location}/name`, {
			context: this,
			state: 'location'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		const { collectionId, location, wallId } = this.props.match.params;

		return (
			<div>
				<h2>
					{this.state.location} - "{this.state.collectionTitle}" Collection
				</h2>
				<Link to={`/${location}/${wallId}/${collectionId}/form`}>Add New Board</Link>
			</div>
		);
	}
}

export default Collection;

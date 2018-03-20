import React, { Component } from 'react';
import base from '../base';
import '../assets/css/app.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: null
		};
	}

	componentDidMount() {
		this.ref = base.syncState('/cities', {
			context: this,
			state: 'cities'
		});
	}
	render() {
		let cities = null;
		if (this.state.cities) {
			cities = Object.keys(this.state.cities).map((currentCity, index) => {
				return <p key={index}>{this.state.cities[currentCity]}</p>;
			});
		}
		console.log('landing page state: ', this.state);
		return (
			<div>
				<h2>BrainyActz Wallboard</h2>
				{cities}
			</div>
		);
	}
}

export default LandingPage;

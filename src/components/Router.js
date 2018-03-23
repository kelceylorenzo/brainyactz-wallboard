import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Location from './Location';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/:location" component={Location} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

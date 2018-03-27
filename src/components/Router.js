import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Location from './Location';
import Collection from './Collection';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/:location" component={Location} />
				<Route path="/:location/:wallId/:collectionId" component={Collection} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

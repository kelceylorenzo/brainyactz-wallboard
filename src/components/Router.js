import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import City from './City';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/:city" component={City} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

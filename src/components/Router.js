import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Location from './Location';
import Wall from './Wall';
import Collection from './Collection';
import NewBoardForm from './NewBoardForm';
import Board from './Board';
import Display from './Display';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/:location" component={Location} />
				<Route exact path="/:location/:wallId/" component={Wall} />
				<Route exact path="/:location/:wallId/display" component={Display} />
				<Route exact path="/:location/:wallId/:collectionId" component={Collection} />
				<Route exact path="/:location/:wallId/:collectionId/form" component={NewBoardForm} />
				<Route exact path="/:location/:wallId/:collectionId/:boardId" component={Board} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

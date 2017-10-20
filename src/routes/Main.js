import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './../containers/Home';
import Message from './../containers/Message';
import News from './../containers/News';
import Giving from './../containers/Giving';
import Groups from './../containers/Groups';
import Connect from './../containers/Connect';
import routes from './routes';

const Main = () => (
	<main>
		<Switch>
			<Route exact path={routes.home} component={Home}/>
			<Route path={routes.message} component={Message}/>
			<Route path={routes.news} component={News}/>
			<Route path={routes.giving} component={Giving}/>
			<Route path={routes.groups} component={Groups}/>
			<Route path={routes.connect} component={Connect}/>
		</Switch>
	</main>
);

export default Main
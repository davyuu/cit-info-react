import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home';
import Message from './Message';
import News from './News';
import Giving from './Giving';
import Groups from './Groups';
import Connect from './Connect';
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
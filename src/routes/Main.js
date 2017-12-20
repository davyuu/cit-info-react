import React from 'react'
import {AnimatedSwitch, spring} from 'react-router-transition'
import {Route} from 'react-router-dom'
import * as Transitions from './../utils/Transitions';
import Home from './../containers/Home';
import Message from './../containers/Message';
import News from './../containers/News';
import Giving from './../containers/Giving';
import Groups from './../containers/Groups';
import Connect from './../containers/Connect';
import Confirm from './../containers/Confirm';
import routes from './routes';
import './Main.css';

const Main = () => (
		<AnimatedSwitch
			{...Transitions.glideTransitions}
			mapStyles={Transitions.glideMapStyles}
	    className="switch-wrapper"
		>
			<Route exact path={routes.home} component={Home}/>
			<Route path={routes.message} component={Message}/>
			<Route path={routes.news} component={News}/>
			<Route path={routes.giving} component={Giving}/>
			<Route path={routes.groups} component={Groups}/>
			<Route path={routes.connect} component={Connect}/>
			<Route path={routes.confirm} component={Confirm}/>
		</AnimatedSwitch>
);

export default Main

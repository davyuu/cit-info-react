import React from 'react'
import {AnimatedSwitch} from 'react-router-transition'
import {Route} from 'react-router-dom'

import * as Transitions from '../utils/Transitions'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Giving from '../pages/Giving'
import Groups from '../pages/Groups'
import Connect from '../pages/Connect'
import Confirm from '../pages/Confirm'
import routes from './routes'
import './Main.css'

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

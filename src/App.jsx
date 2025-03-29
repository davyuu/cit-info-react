import React from 'react';
// import {AnimatedSwitch} from 'react-router-transition'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

// import * as Transitions from './utils/Transitions'
import Home from './pages/Home'
import Alpha from './pages/Alpha'
import Confirm from './pages/Confirm'
import Connect from './pages/Connect'
import Events from './pages/Events'
import Giving from './pages/Giving'
import Kids from './pages/Kids'
import Message from './pages/Message'
import Next from './pages/Next'
import Prayer from "./pages/Prayer";
import Volunteer from './pages/Volunteer'
import Youth from './pages/Youth'
// Stats
import Login from './pages/Login'
import Stats from './pages/Stats'
import routes from './constants/routes'
import './App.scss'
import {Redirect} from 'react-router-dom'

class App extends React.Component {

  isLoggedIn() {
    return localStorage.getItem('LoggedIn')
  }

  render() {
    return (
      <Router>
        {/*<AnimatedSwitch
          {...Transitions.glideTransitions}
          mapStyles={Transitions.glideMapStyles}
          className="switch-wrapper"
          >
        </AnimatedSwitch>*/}
        <Switch>
          <Route exact path={routes.home} component={Home}/>
          <Route path={routes.alpha} component={Alpha}/>
          <Route path={routes.confirm} component={Confirm}/>
          <Route path={routes.connect} component={Connect}/>
          <Route path={routes.events} component={Events}/>
          <Route path={routes.giving} component={Giving}/>
          <Route path={routes.kids} component={Kids}/>
          <Route path={routes.message} component={Message}/>
          <Route path={routes.next} component={Next}/>
          <Route path={routes.prayer} component={Prayer} />
          <Route path={routes.volunteer} component={Volunteer}/>
          <Route path={routes.youth} component={Youth}/>
          <Route path={routes.login} component={Login}/>
          <Route path={routes.stats} render={() => (
              this.isLoggedIn() ? (
                <Stats/>
              ) : (
                <Redirect to="../stats"/>
              )
          )}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

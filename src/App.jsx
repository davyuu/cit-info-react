import React from 'react';
// import {AnimatedSwitch} from 'react-router-transition'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

// import * as Transitions from './utils/Transitions'
import Home from './pages/Home'
import Message from './pages/Message'
import Kids from './pages/Kids'
import News from './pages/News'
import Connect from './pages/Connect'
import Prayer from "./pages/Prayer";
import Next from './pages/Next'
import Alpha from './pages/Alpha'
import Giving from './pages/Giving'
import Confirm from './pages/Confirm'
import Volunteer from './pages/Volunteer'
import routes from './constants/routes'
import './App.scss'

class App extends React.Component {
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
          <Route path={routes.message} component={Message}/>
          <Route path={routes.kids} component={Kids}/>
          <Route path={routes.news} component={News}/>
          <Route path={routes.connect} component={Connect}/>
          <Route path={routes.prayer} component={Prayer} />
          <Route path={routes.next} component={Next}/>
          <Route path={routes.alpha} component={Alpha}/>
          <Route path={routes.giving} component={Giving}/>
          <Route path={routes.confirm} component={Confirm}/>
          <Route path={routes.volunteer} component={Volunteer}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

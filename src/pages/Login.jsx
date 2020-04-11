import React from 'react';
import styles from './Login.scss';
import HeaderBar from '../components/HeaderBar'
import * as colors from '../constants/colors'
import strings from '../constants/strings'


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        login: ''
    };
    this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin() {

    const { history } = this.props;

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if ( username == "user" && password == "pass"){
      alert ("Login successful");
      localStorage.setItem('LoggedIn',true)
      history.push('/stats')
    }
    else {
      alert ("Unknown Login. Please try again");
    }
  }

  
  render() {
  
    let content;
    
    content = (
      <section className="form animated flipInX">
        <br></br>
        <h2>Login Form</h2>
        <br></br>

        <form className="form">
          <input type="text" placeholder="Username" name="username" id="username"/>
          <input type="password" placeholder="Password" name="password" id="password"/>
          <input type="button" value="Login" id="submit" onClick = {this.validateLogin}/>
        </form>
      </section>
    )

    return (

      <div>
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.loginHeader}
          color={colors.STATS_THEME}
        />
        {content}
      </div>
    );
  }
}

export default Login;
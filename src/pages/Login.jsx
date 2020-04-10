import React from 'react';
// import { Grid, Form, Header, Message } from 'semantic-ui-react';
// import { Helmet } from 'react-helmet';
// import store from 'store';
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

    // this.handleChange = this.handleChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

//   onSubmit(e) {
//     e.preventDefault();

//     const { username, password } = this.state;

//     this.setState({ error: false });

//     if (!(username === 'user' && password === 'pass')) {
//       return this.setState({ error: true });
//     }

//     console.log("you're logged in. yay!");
//     store.set('loggedIn', true);
//   }




  validateLogin() {

    const { history } = this.props;

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if ( username == "user" && password == "pass"){
    alert ("Login successfully");
    this.state.login = true
    console.log(this.state.login)
    history.push('/stats')
    }
    else {
    // alert ("Unknown Login. Please try again");
    this.state.login = false
    console.log(this.state.login)
    }
    
  }



//   handleChange(e, { name, value }) {
//     this.setState({ [name]: value });
//   }
  

  render() {
    // const { error } = this.state;

    let content;
    

    content = (

    <section className="form animated flipInX">
    <br></br>
    <h2>Login Form</h2>
    <br></br>
    <form className="form">
    {/* <label>User Name :</label> */}
    <input type="text" placeholder="Username" name="username" id="username"/>

    {/* <label>Password :</label> */}
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
        //   <title>CMS | Login</title>
        //   <Form className={styles.loginForm} error={error} onSubmit={this.onSubmit}>
            // <H1>Login</H1>
            // {error && <Message
            //   error={error}
            //   content="That username/password is incorrect. Try again!"
            // />}
        //   <form className="form">
            
        //     <input type="text" placeholder="Username" name="username" id="username"/>
          
        //     <input type="password" placeholder="Password" name="password" id="password"/>
        //     <input type="button" value="Login" id="submit" onClick = {this.handleChange}/>
        //     </form>


    );
  }
}

export default Login;
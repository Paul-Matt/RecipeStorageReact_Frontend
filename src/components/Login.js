import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Recipelist from './Recipelist';
import {SERVER_URL} from '../constants.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', 
        isAuthenticated: false, open: false};
    }

    // The login is done by calling the /login endpoint using the POST method and sending the user object
    // inside the body. If authentication succeeds, a token is gotten in a response Authorization header. 
    // The token will then be saved to session storage and the isAuthenticated state value is set to true. 
    // The session storage is similar to local storage but it is cleared when a page session ends. When the isAuthenticated
    // state value is changed, the user interface is re-rendered.
    login = () => {
        const user = {username: this.state.username, password: this.state.password};
        fetch(SERVER_URL + 'login', {
          method: 'POST',
          body: JSON.stringify(user)
        })
        .then(res => {
          const jwtToken = res.headers.get('Authorization');
          if (jwtToken !== null) {
            sessionStorage.setItem("jwt", jwtToken);
            this.setState({isAuthenticated: true});
          }
          else {
            this.setState({open: true});
          }
        })
        .catch(err => console.error(err)) 
      }
      
      // Saves typed values to the states
      handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
      }
    
      handleClose = (event) => {
        this.setState({ open: false });
      }
      
      // Conditional rendering renders the Login component if the isAuthenticated
      // state is false or the Recipelist component if the isAuthenticated is true.
      render() {
        if (this.state.isAuthenticated === true) {
          return (<Recipelist />)
        }
        else {
          return (
            <div>
              <br/>
              <TextField tpye="text" name="username" placeholder="Username" 
              onChange={this.handleChange} /><br/>  
              <TextField type="password" name="password" placeholder="Password" 
              onChange={this.handleChange} /><br /><br/>  
              <Button variant="contained" color="primary" onClick={this.login}>Login</Button>
              <Snackbar           
              open={this.state.open}  onClose={this.handleClose} 
              autoHideDuration={1500} message='Check your username and password' />
            </div>
          );
        }
      }
    }
    

export default Login;
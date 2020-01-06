
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, login, logout, getUsers } from '../../store/reducer';
import './Auth.css';
class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { username, password } = this.state
    const { register, logout, login, getUsers } = this.props
    return (e.target.name === 'register' ? register({
      username: username, password: password
    }).then((res)=>(alert(res.value.statusText))).catch(error => (alert(error.response.request.response)))
     : e.target.name === 'login' ?
        login({ username: username, password: password }).then(()=>getUsers())
          .catch(error => (console.log('auth login error:',error)))
        : e.target.name === 'logout' ? logout() : console.warn('issue with auth.JS handleSubmit'))
  }


  render() {
    const { handleChange, handleSubmit } = this
    const { loggedIn } = this.props
    // console.log('logged in OnChange trackers:', loggedIn)
    return (
      <div className='Auth'>
        <div className='auth_container'>
          <img src='https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png' alt='logo' />
          <h1 className='auth_title'>Helo</h1>
          <div className='auth_input_box'>
            <p>Username:</p>
            <input name="username"
              onChange={e => handleChange(e)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className='auth_input_box'>
            <p>Password:</p>
            <input type='password' name='password' onChange={e => handleChange(e)} placeholder="password" />
          </div>
          <div className='auth_button_container'>
            {(loggedIn.user_id ? <button name="logout" onClick={(e) => handleSubmit(e)}>Logout</button> : null)}
            <Link to="/dashboard">
              {(!loggedIn.user_id ? <button name="login" className='dark_button'
                onClick={(e) => handleSubmit(e)}> Login </button> : null)}
            </Link>
            <Link to="/dashboard">
              <button name="register" className='dark_button' onClick={(e) => handleSubmit(e)}>Register</button>
            </Link>
          </div>
          <hr />
          <h4>You are currently: {loggedIn.user_id ? 'Logged In' : 'Logged Out'}</h4>
          <p> {loggedIn.username ? JSON.stringify(loggedIn.username) : 'log in or sign up above'} </p>
          <br />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.R.loggedIn,
  }
}
export default connect(mapStateToProps, { register, login, logout, getUsers })(Auth);
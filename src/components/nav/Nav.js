import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../../store/reducer';
import './Nav.css';

const Nav = (props) => {
 const {logout, loggedIn} = props
//  const {requests} = loggedIn
if (!loggedIn.id) {
  return (<div className="logInNow">
      <Link to="/">
        <button className="toLogIn">Click here to log in to view this page</button>
      </Link>
    </div>
    )
  }
  console.log('navjs loggedin:',loggedIn)
  if (props.location.pathname !== '/') {
    return (
      <div className='Nav'>
        <div className='nav_profile_container'>
        <Link to='/profile'>
          <img className='nav_profile_pic' style={{ backgroundImage: `url('${loggedIn.profilePic}')` }}></img>
        </Link>
           {loggedIn.requests?<p className="notifications">{loggedIn.requests.length}</p>:null}
        </div>
        <div className='nav_links'>
          <Link to='/dashboard'><img className='nav_img' src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/home_logo.png" alt='home' /></Link>
          <Link to='/new'><img className='nav_img' src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/new_logo.png" alt='new post' /></Link>
        </div>
        <Link to='/'>
          <img className='nav_img logout' onClick={()=>logout()} src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/shut_down.png" alt='logout' />
          </Link>
      </div>
    )
  } else {
    return null
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn:state.R.loggedIn
  }
}
export default withRouter(connect(mapStateToProps, { logout })(Nav));
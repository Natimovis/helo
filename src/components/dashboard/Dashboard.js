import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Home from '../home/Home';
import './dashboard.css';

const Dashboard = (props) => {
  const { loggedIn, posts } = props

  
  if (!loggedIn.id) {
    return (<div className="logInNow">
      <Link to="/">
        <button className="toLogIn">Click here to log in to view this page</button>
      </Link>
    </div>
    )
  }
  return (
      <div className="dashComp">
        {posts.length>0?<><Home/></>:<h1>No posts currently available to view! Add some friends for more posts!</h1>}
      </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state.R.posts,
    loggedIn: state.R.loggedIn
  }
}
export default (connect(mapStateToProps)(Dashboard));
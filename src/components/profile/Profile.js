import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Wall from '../wall/Wall'
import Requests from '../requests/Requests';
import './profile.css';

const Profile = (props) => {
    const { loggedIn } = props
    if (!loggedIn.id) {
        return (<div className="logInNow">
            <Link to="/">
                <button className="toLogIn">Click here to log in to view this page</button>
            </Link>
        </div>
        )
    }

    return (<div className="profileComp">
       <div><Requests /></div>
        <div><Wall /></div>
    </div>
    )
}
const mapStateToProps = (state) => {
    return {
        loggedIn: state.R.loggedIn
    }
}
export default connect(mapStateToProps)(Profile);
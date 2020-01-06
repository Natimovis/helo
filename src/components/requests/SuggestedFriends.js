import React, { Component } from 'react';
import { getUsers, mountRequests } from '../../store/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matches: [],
            suggested: [],
            requests: false,
            showSuggested: false
        }
    }
    matches = []
    suggested = []
    componentDidMount() {
        const { matches, suggested } = this
        this.props.getUsers().then(this.props.mountRequests({ friendRequests: matches, suggestedFriends: suggested }))
    }
    render() {
        const { loggedIn } = this.props
        if (!loggedIn.id) {
            return (<div className="logInNow">
                <Link to="/">
                    <button className="toLogIn">Click here to log in to view this page</button>
                </Link>
            </div>
            )
        }
        
        const { matches, suggested } = this
        for (let i = 0; i < this.props.users.length; i++) {
            !loggedIn.requests?suggested.push(this.props.users[i])
            :loggedIn.requests.includes(this.props.users[i].user_id)?matches.push(this.props.users[i]):
            suggested.push(this.props.users[i])
        }

        const requestsMapped = matches.map((friend, index) => {
            return (
                <div key={index}>
                    <div>{friend.username} wants to be your friend</div>
                    <div>User id {friend.user_id}</div>
                    <button>Accept</button><button>Deny</button>
                    <div><img src={friend.profilepic} alt="no profile img yet" /></div>
                </div>
            )
        })
        const usersMapped = suggested.map((val, index) => {
            return (
                <div key={index}>
                    <div>Username: {val.username}</div>
                    <div>user id:{val.user_id}</div>
                    <button onClick={() => this.props.friendRequest(val.user_id)}>Send Friend Request</button><button>Remove</button>
                    <div><img src={val.profilepic} alt="no profile img yet" /></div>
                </div>
            )
        })
        console.log('this.props.requests:', this.props.requests)
        return (
            <div>
               {loggedIn.requests?<button onClick={() => this.setState({ requests: true })}>View Friend Requests</button>:<h1>No pending friend requests</h1>}
                {this.state.requests ? <span>{requestsMapped}</span> : null}
                <button onClick={()=>this.setState({showSuggested:true})}>View Suggested Friends</button>
                {this.state.showSuggested?<span>{usersMapped}</span>:null}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.R.users,
        loggedIn: state.R.loggedIn,
        requests: state.R.requests
    };
};

export default connect(mapStateToProps, { getUsers, mountRequests })(Requests);
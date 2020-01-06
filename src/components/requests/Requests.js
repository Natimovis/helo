import React, {useMemo, useState, useEffect} from 'react';
import { getUsers, mountRequests } from '../../store/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Requests = (props) => {
    const { loggedIn, mountRequests, users } = props
  
    const matches = []
    const suggested = []
    const [fReqs, showFreqs] = useState(false)
    const [friends, showFriends] = useState(false)

    useEffect(() => {
        mountRequests({ friendRequests: matches, suggestedFriends: suggested })
    }, [loggedIn.requests])

    // useMemo(() => getUsers().then(mountRequests({friendRequests: matches, suggestedFriends: suggested })), [loggedIn.requests])
        if (!loggedIn.id) {
            return (<div className="logInNow">
                <Link to="/">
                    <button className="toLogIn">Click here to log in to view this page</button>
                </Link>
            </div>
            )
        }
        
        for (let i = 0; i < users.length; i++) {
            !loggedIn.requests?suggested.push(users[i])
            :loggedIn.requests.includes(users[i].user_id)?matches.push(users[i]):
            suggested.push(users[i])
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
                    <button onClick={() => props.friendRequest(val.user_id)}>Send Friend Request</button><button>Remove</button>
                    <div><img src={val.profilepic} alt="no profile img yet" /></div>
                </div>
            )
        })
        console.log('props.requests:', props.requests)
        console.log('matches', matches)
        console.log('suggested', suggested)
   
        return (
            <div>
               {loggedIn.requests?<button onClick={() => showFreqs({ fReqs: true })}>View Friend Requests</button>:<h1>No pending friend requests</h1>}
                {fReqs ? <span>{requestsMapped}</span> : null}
                <button onClick={()=>showFriends({friends:true})}>View Suggested Friends</button>
                {friends?<span>{usersMapped}</span>:null}
            </div>
        )
    
}


const mapStateToProps = (state) => {
    return {
        users: state.R.users,
        loggedIn: state.R.loggedIn,
        requests: state.R.requests
    };
};

export default connect(mapStateToProps, { getUsers, mountRequests })(Requests);
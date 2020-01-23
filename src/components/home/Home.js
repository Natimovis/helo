import React from 'react';
import { handleDelete } from '../../store/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const { loggedIn, posts, users } = props

  if (!loggedIn.id) {
    return (<div className="logInNow">
      <Link to="/">
        <button className="toLogIn">Click here to log in to view this page</button>
      </Link>
    </div>
    )
  }
  const postsMapped = posts.map((post, index) => {
    return (
      <div className="postsMapped" key={index}>
        <div>
          {/* {post.title} */}
          {post.user_id === loggedIn.id ? <Link to={`/post/${post.post_id}`}>
            <div>user_id{post.user_id}</div>
            <button>edit</button></Link> : null}
          {post.user_id===loggedIn.id?<button onClick={() => props.handleDelete(post.post_id).then((res) => (alert(res.value.statusText)))
            .catch(error => (alert(error.response.request.response)))}>delete</button>:null}
        </div>
          <div>Post from: {post.hp_username}</div>
  <div>Title: {post.title}</div>
        <div>About: {post.content}</div>
        <div><img src={post.imgurl} alt="photo" /></div>
      </div>
    )
  })

  return (
    <div className="homeComp">
      <span className="postsMapped">{postsMapped}</span>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state.R.posts,
    users: state.R.users,
    loggedIn: state.R.loggedIn
  }
}
export default (connect(mapStateToProps, { handleDelete })(Home));
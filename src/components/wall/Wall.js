import React from 'react';
import { handleDelete } from '../../store/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Wall = (props) => {
  const { loggedIn, posts } = props

  if (!loggedIn.id) {
    return (<div className="logInNow">
      <Link to="/">
        <button className="toLogIn">Click here to log in to view this page</button>
      </Link>
    </div>
    )
  }
  
  const postsFiltered = posts.filter(post => post.user_id === loggedIn.id)
  const postsMapped = postsFiltered.map((post, index) => {
    return (
      <div key={index}>
        <div>{post.title}<Link to={`/post/${post.post_id}`}>
    <div>{post.user_id}</div>
          <button>edit</button></Link><button onClick={() => props.handleDelete(post.post_id)
            .then((res) => (alert(res.value.statusText))).catch(error => (alert(error.response.request.response)))
          }>delete</button></div>
        <div><img src={post.imgurl} alt="photo" /></div>
        <div>About: {post.content}</div>
      </div>
    )
  })
  // console.log('wall posts:', posts)
  return (
    <div>
      {posts.length>0?<h1>Your Postings</h1>:<h1>You haven't made any posts yet!</h1>}
      <span>{postsMapped}</span>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state.R.posts,
    loggedIn: state.R.loggedIn
  }
}
export default (connect(mapStateToProps, { handleDelete })(Wall));
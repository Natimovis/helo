import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleEdit, setProfilePic } from '../../store/reducer';
import { connect } from 'react-redux';
import './post.css';

const Post = (props) => {
  const { loggedIn, posts, handleEdit, setProfilePic } = props
  const { post_id } = props.match.params
  const [form, setForm] = useState([{ title: '', imgurl: '', content: '' }])

  if (!loggedIn.id) {
    return (<div className="logInNow">
      <Link to="/">
        <button className="toLogIn">Click here to log in to view this page</button>
      </Link>
    </div>
    )
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    handleEdit(post_id, loggedIn.id, {
      title: form.title || match[0].title,
      imgurl: form.imgurl || match[0].imgurl,
      content: form.content || match[0].content
    });
  }

  const setProfilePicture = () => {
  setProfilePic(loggedIn.id, {
      imgurl: match[0].imgurl
    }).then((res)=>(alert(res.value.statusText))).catch(error => (alert(error.response.request.response)))
  }

  let match = []
  let notMatch = []
  for (let i = 0; i < posts.length; i++) {
    (posts[i].post_id === +post_id ? match.push(posts[i]) : notMatch.push(posts[i]))
  }
  const { title, imgurl, content } = match[0]
  return (
    <div className="postComponent">
      Your currently selected posting<br />
      Title:{title}<br />
      <button type="submit" onClick={() => setProfilePicture()}>Make Profile Picture</button>
      <img src={imgurl} alt="photo" /><br />
      Content:{content}<br />
      Post Id#:{match[0].post_id}<br />
      <h1>Make changes below</h1>
      <form className='newPost'>
        Edit title below<br />
        <input id='editTitle' name='title' defaultValue={title} onChange={(e) => handleChange(e)} className="postTitle" type='text' />
        Edit image url below<br />
        <input id='editImgurl' name='imgurl' defaultValue={imgurl} onChange={(e) => handleChange(e)} className="postImage" type='text' />
        Edit content below <br />
        <input id='editContent' name='content' defaultValue={content} onChange={(e) => handleChange(e)} className="postContent" type='text' />
        <Link to="/dashboard">
          <button onClick={() => handleSubmit()} placeholder="Post" type="submit">Save changes</button><button>Cancel</button>
        </Link>
      </form>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    posts: state.R.posts,
    loggedIn: state.R.loggedIn
  };
};

export default connect(mapStateToProps, { handleEdit, setProfilePic })(Post);


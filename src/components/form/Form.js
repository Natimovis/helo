import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { submitPost } from '../../store/reducer';
import {connect} from 'react-redux';
import './form.css';

const Form = (props) => {
  const { loggedIn } = props
  const [form, setForm ] = useState({ title:'', imgUrl:'', content:''})
  
  if (!loggedIn.id) {
    return (<div className="logInNow">
      <Link to="/">
        <button className="toLogIn">Click here to log in to view this page</button>
      </Link>
    </div>
    )
  }

 const handleChange = e => {
    setForm({...form,[e.target.name]: e.target.value })}

  const handleSubmit = e => {
    props.submitPost({
        title:form.title,
        imgUrl:form.imgUrl,
        content:form.content
    }).then((res)=>(alert(res.value.statusText))).catch(error => (alert(error.response.request.response)));
}

  return (
    <div  className="newPost">
      <h1>Title:</h1>
      <div>
      <input name="title" onChange={(e)=>handleChange(e)} className="postTitle" type="text" placeholder="Title"/>
      </div>
      <h1>Image URL:</h1>
      <div>
        <input name="imgUrl" onChange={(e)=>handleChange(e)} className="postImage" type="text" placeholder="Image URL"/>
      </div>
      <h1>Content:</h1>
      <div>
        <input name="content" onChange={(e)=>handleChange(e)} placeholder="enter content" className="postContent" type="text"/>
      </div>
      <Link to="/dashboard">
      <button onClick={()=>handleSubmit()} placeholder="Post" type="submit">Post</button>
      </Link>
    </div>
  )
}
const mapStateToProps = (state) => {
	return {
    posts: state.R.posts,
    loggedIn:state.R.loggedIn
	};
};

export default connect(mapStateToProps, { submitPost })(Form);

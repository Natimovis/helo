import axios from 'axios';

const initialState = {
	loggedIn: {},
	requests:{},
	users: [],
	posts: []
};

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_USERS = 'GET_USERS';
const SUBMIT_POST = 'SUBMIT_POST';
const HANDLE_DELETE = 'HANDLE_DELETE';
const HANDLE_EDIT = 'HANDLE_EDIT';
const SET_PROFILE_PIC = 'SET_PROFILE_PIC';
const MOUNT_REQUESTS = 'MOUNT_REQUESTS';

export const register = (userInfo) => {
	return {
		type: REGISTER,
		payload: axios.post('/auth/register', userInfo)
	};
};
export const login = (userInfo) => {
	return {
		type: LOGIN,
		payload: axios.post('/auth/login', userInfo),
	};
};
export const logout = () => {
	return {
		type: LOGOUT,
		payload: axios.get('/auth/logout')
	};
};
export const getUsers = () => {
	return {
		type: GET_USERS,
		payload: axios.get('/api/users')
	};
};
export const submitPost = (info) => {
	console.log('reducer handlesubmit info:', info)
	return {
		type: SUBMIT_POST,
		payload: axios.post('/api/img/user', info)
	};
};
export const handleEdit = (post_id, user_id, form) => {
	console.log('post_id:', post_id, 'user_id:', user_id, 'form', form)
	return {
		type: HANDLE_EDIT,
		payload: axios.put(`image/${post_id}/${user_id}`, form)
	};
};
export const handleDelete = (post_id) => {
	return {
		type: HANDLE_DELETE,
		payload: axios.delete(`api/img/user/${post_id}`)
	};
};
export const setProfilePic = (user_id, newPic) => {
	return {
		type: SET_PROFILE_PIC,
		payload: axios.put(`/image/${user_id}`, newPic)
	};
};
export const mountRequests = (requests) => {
	return {
		type: MOUNT_REQUESTS,
		payload:requests
	};
};
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case MOUNT_REQUESTS:
			return {
				...state,
				requests: payload
			};
		case `${REGISTER}_FULFILLED`:
			return {
				...state,
				loggedIn: payload.data
			};
		case `${LOGIN}_FULFILLED`:
			return {
				...state,
				loggedIn: payload.data
			};
		case `${HANDLE_EDIT}_FULFILLED`:
			return {
				...state,
				posts: payload.data
			};
		case `${SET_PROFILE_PIC}_FULFILLED`:
			return {
				...state,
				loggedIn: payload.data
			};
		case `${HANDLE_DELETE}_FULFILLED`:
			return {
				...state,
				posts: payload.data
			};
		case `${SUBMIT_POST}_FULFILLED`:
			return {
				...state,
				posts: payload.data
			};
		case `${GET_USERS}_FULFILLED`:
			return {
				...state,
				users:payload.data.userImg,
				posts:payload.data.posts
			};
		case `${LOGOUT}_FULFILLED`:
			return initialState;
		default:
			return state;
	}
}

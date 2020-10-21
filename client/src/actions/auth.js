import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_PROFILE,
	CLEAR_TEACHER_PROFILE,
	CLEAR_STUDENT_PROFILE,
} from './types';
import { setAlert } from './alert';
import { loadTeacher } from './teacher';
import { loadStudent } from './student';

// Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register user
export const register = ({
	name,
	email,
	password,
	school,
	isTeacher,
}) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ name, email, password, school, isTeacher });

	try {
		const res = await axios.post('/api/user', body, config); // register user
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser()); // auth
		const profile = await axios.post('/api/profile'); // creates the profile
		if (profile.data.user.isTeacher) {
			dispatch(loadTeacher());
		} else {
			dispatch(loadStudent());
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		const profile = await axios.get('/api/auth');
		if (profile.data.isTeacher) {
			dispatch(loadTeacher());
		} else {
			dispatch(loadStudent());
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout user
export const logout = () => async (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
	dispatch({
		type: CLEAR_PROFILE,
	});
	dispatch({
		type: CLEAR_TEACHER_PROFILE,
	});
	dispatch({
		type: CLEAR_STUDENT_PROFILE,
	});
};

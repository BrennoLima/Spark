import {
	LOAD_TEACHER_PROFILE,
	LOAD_TEACHER_PROFILE_FAIL,
	ADD_STUDENT,
	ADD_STUDENT_FAIL,
	REMOVE_STUDENT_FAIL,
	REMOVE_STUDENT,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';
import { LoadTeacherActivities } from './activities';

// Load teacher
export const loadTeacher = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile');
		dispatch({
			type: LOAD_TEACHER_PROFILE,
			payload: res.data,
		});
		dispatch(LoadTeacherActivities(res.data.email));
	} catch (err) {
		dispatch({
			type: LOAD_TEACHER_PROFILE_FAIL,
		});
	}
};

// Add student by email
export const addStudent = (studentEmail) => async (dispatch) => {
	try {
		const res = await axios.put(`api/profile/add/${studentEmail}`);
		dispatch({
			type: ADD_STUDENT,
			payload: res.data,
		});
		dispatch(setAlert('Student added', 'success'));
	} catch (err) {
		dispatch(setAlert('Failed to add student', 'danger'));
		dispatch({
			type: ADD_STUDENT_FAIL,
		});
	}
};

// Remove student by email
export const removeStudent = (studentEmail) => async (dispatch) => {
	try {
		const res = await axios.put(`api/profile/remove/${studentEmail}`);
		dispatch({
			type: REMOVE_STUDENT,
			payload: res.data,
		});
		dispatch(setAlert('Student removed', 'success'));
	} catch (err) {
		dispatch(setAlert('Failed to remove student', 'danger'));
		dispatch({
			type: REMOVE_STUDENT_FAIL,
		});
	}
};

import {
	LOAD_STUDENT,
	LOAD_STUDENT_FAIL,
	LOAD_ACTIVITIES_FAIL,
	ADD_MARK,
	ADD_MARK_FAIL,
	LOAD_ACTIVITIES,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

// Load student profile
export const loadStudent = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: LOAD_STUDENT,
			payload: res.data,
		});
		dispatch(loadStudentExercises(res.data.email));
	} catch (error) {
		dispatch({
			type: LOAD_STUDENT_FAIL,
		});
		dispatch(setAlert('Failed to load student profile', 'danger'));
	}
};
// Load all students exercises
export const loadStudentExercises = (studentEmail) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/exercise/all/${studentEmail}`);
		dispatch({
			type: LOAD_ACTIVITIES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: LOAD_ACTIVITIES_FAIL,
		});
		dispatch(setAlert('Failed to load student profile', 'danger'));
	}
};

// mark exercise
export const markExercise = (studentEmai, exerciseId, mark) => async (
	dispatch
) => {
	try {
		const res = await axios.put(
			`/api/profile/students/${studentEmai}/${exerciseId}/${mark}`
		);
		dispatch({
			type: ADD_MARK,
			payload: res.data,
		});
		dispatch(loadStudent());
		dispatch(setAlert('Quiz marked'));
	} catch (error) {
		dispatch({
			type: ADD_MARK_FAIL,
		});
		dispatch(setAlert('Failed to add activities', 'danger'));
	}
};

import axios from 'axios';
import { setAlert } from './alert';
import {
	LOAD_ACTIVITIES,
	LOAD_ACTIVITIES_FAIL,
	ADD_ACTIVITY,
	ADD_ACTIVITY_FAIL,
	REMOVE_ACTIVITY,
	REMOVE_ACTIVITY_FAIL,
} from '../actions/types';

// Load activities by teacher
export const LoadTeacherActivities = (teacherEmail) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/exercise/${teacherEmail}`);
		console.log(res.data);
		dispatch({
			type: LOAD_ACTIVITIES,
			payload: res.data,
		});
	} catch (err) {
		dispatch(setAlert('Failed to get activities', 'danger'));
		dispatch({
			type: LOAD_ACTIVITIES_FAIL,
		});
	}
};

// Remove activitiy by id
export const RemoveActivity = (id) => async (dispatch) => {
	try {
		let students = await axios.get('/api/profile/students'); // get teacher's students
		students = students.data; // list of student objects contains studentEmail
		students.map(async (student) => {
			await axios.delete(`/api/exercise/${student.studentEmail}/${id}`);
			dispatch(
				setAlert(`Exercise deleted for ${student.studentEmail}`, 'info')
			);
		});

		const res = await axios.delete(`/api/exercise/delete/${id}`);
		dispatch({
			type: REMOVE_ACTIVITY,
			payload: res.data,
		});
		dispatch(setAlert('Activity deleted', 'success'));
	} catch (err) {
		dispatch(setAlert('Failed to remove activity', 'danger'));
		dispatch({
			type: REMOVE_ACTIVITY_FAIL,
		});
	}
};

// Add activitie
export const AddActivity = (
	title,
	subject,
	isQuizz,
	question1,
	answer1,
	question2,
	answer2,
	question3,
	answer3,
	question4,
	answer4,
	question5,
	answer5
) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const body = JSON.stringify(
			title,
			subject,
			isQuizz,
			question1,
			answer1,
			question2,
			answer2,
			question3,
			answer3,
			question4,
			answer4,
			question5,
			answer5
		);
		const res = await axios.post('/api/exercise', body, config);

		dispatch({
			type: ADD_ACTIVITY,
			payload: res.data,
		});
		dispatch(setAlert('Activity created', 'success'));
	} catch (error) {
		dispatch(setAlert('Failed to add activity', 'danger'));
		dispatch({
			type: ADD_ACTIVITY_FAIL,
		});
	}
};

// Send activite
export const SendActivitie = (studentEmail, activitieId) => async (
	dispatch
) => {
	try {
		let students = await axios.get('/api/profile/students'); // get teacher's students
		students = students.data;

		if (students.some((student) => student.studentEmail === studentEmail)) {
			await axios.post(`/api/exercise/${studentEmail}/${activitieId}`);
			dispatch(setAlert('Activity sent!', 'success'));
		} else {
			dispatch(setAlert(`${studentEmail} is not your student`, 'danger'));
		}
	} catch (error) {
		console.error(error.message);
		dispatch(setAlert('Failed to send activity', 'danger'));
	}
};

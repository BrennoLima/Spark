import {
	ADD_STUDENT,
	ADD_STUDENT_FAIL,
	LOAD_TEACHER_PROFILE,
	LOAD_TEACHER_PROFILE_FAIL,
	REMOVE_STUDENT_FAIL,
	REMOVE_STUDENT,
	CLEAR_TEACHER_PROFILE,
} from '../actions/types';

const initialState = {
	teacher: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOAD_TEACHER_PROFILE:
			return {
				loading: false,
				teacher: payload,
			};
		case LOAD_TEACHER_PROFILE_FAIL:
			return {
				loading: false,
				teacher: null,
			};
		case ADD_STUDENT:
		case REMOVE_STUDENT:
			return {
				...state,
				loading: false,
				teacher: payload,
			};
		case CLEAR_TEACHER_PROFILE:
			return {
				teacher: null,
				loading: true,
			};
		case ADD_STUDENT_FAIL:
		case REMOVE_STUDENT_FAIL:
		default:
			return state;
	}
}

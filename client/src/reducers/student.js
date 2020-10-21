import {
	LOAD_STUDENT,
	LOAD_STUDENT_FAIL,
	CLEAR_STUDENT_PROFILE,
	ADD_MARK,
	ADD_MARK_FAIL,
} from '../actions/types';

const initialState = {
	student: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOAD_STUDENT:
		case ADD_MARK:
			return {
				student: payload,
				loading: false,
			};
		case ADD_MARK_FAIL:
			return {
				...state,
				loading: false,
			};

		case CLEAR_STUDENT_PROFILE:
		case LOAD_STUDENT_FAIL:
			return {
				student: null,
				loading: true,
			};
		default:
			return state;
	}
}

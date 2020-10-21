import {
	LOAD_ACTIVITIES,
	LOAD_ACTIVITIES_FAIL,
	ADD_ACTIVITY,
	ADD_ACTIVITY_FAIL,
	REMOVE_ACTIVITY,
	REMOVE_ACTIVITY_FAIL,
	CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
	activities: [],
	loading: true,
};

export default function (state = initialState, action) {
	const { payload, type } = action;

	switch (type) {
		case LOAD_ACTIVITIES:
			return {
				activities: payload,
				loading: false,
			};
		case LOAD_ACTIVITIES_FAIL:
			return {
				activities: [],
				loading: false,
			};
		case ADD_ACTIVITY:
			return {
				activities: [...state.activities, payload],
				loading: false,
			};
		case REMOVE_ACTIVITY:
			return {
				activities: state.activities.filter(
					(activitie) => activitie._id !== payload._id
				),
				loading: false,
			};
		case CLEAR_PROFILE:
			return {
				activities: [],
				loading: true,
			};
		case ADD_ACTIVITY_FAIL:
		case REMOVE_ACTIVITY_FAIL:
		default:
			return state;
	}
}

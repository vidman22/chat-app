import * as actionTypes from './actionTypes';


const initialState = {
	user: null,
	lessonSet: []
}

const reducer = (state = initialState , action) => {
	if (action.type === actionTypes.AUTH_SUCCESS) {
		return {
			...state,
			user: {
				email: action.email,
				name: action.name,
				picture: action.picture,
				userID: action.userID,
				token: action.token,
			}
		}
	}
	if (action.type === actionTypes.AUTH_FAIL) {
		return {
			...state,
			auth: action.val
		}
	}
	if (action.type === actionTypes.LESSON_SET) {
		return {
			...state,
			lessonSet: action.lesson
		}
	}
	if (action.type === actionTypes.LOGOUT) {
		return {
			...state,
			user: null,
		}
	}
	return state;
}

export default reducer;
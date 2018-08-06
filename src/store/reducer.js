import * as actionTypes from './actionTypes';

const initialState = {
	auth: 'redux is working',
	lessonSet: []
}

const reducer = (state = initialState , action) => {
	if (action.type === actionTypes.AUTH_START) {
		return {
			auth: action.val
		}
	}
	if (action.type === actionTypes.AUTH_START) {
		return {
			auth: action.val
		}
	}
	if (action.type === actionTypes.LESSON_SET) {
		console.log(action.lesson);
		return {
			lessonSet: action.lesson
		}
	}
	return state;
}

export default reducer;
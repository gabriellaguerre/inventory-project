const GET_USERS = 'session/GET_USERS'


const getUsers = (users) => ({
	type: GET_USERS,
	payload: users
})


export const get_Users = () => async (dispatch) => {
	const response = await fetch("/api/users", {
		headers: {"Content-Type": "application/json"}
	})
	if (response.ok) {
		const data = await response.json()
		dispatch(getUsers(data))
	}
}

const initialState = {};

export default function reducer(state = initialState, action) {
	const newState = {...state}
	switch (action.type) {
		case GET_USERS:
			action.payload.users.forEach(user => newState[user.id] = user)
			return newState;
		default:
			return state;
	}
}

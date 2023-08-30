
const GET_REQUESTS = 'requests/GET_REQUESTS'



//------------------------------DISPATCH VARIABLES-----------------------------
const get_requests = (requests) => ({
    type: GET_REQUESTS,
    payload: requests
})

//-------------------------------THUNKS-----------------------------------------
export const getRequests = () => async(dispatch) => {
    const response = await fetch('/api/requests', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_requests(data))
    }
}


//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_REQUESTS:
            action.payload.requests.forEach(request => newState[request.id] = request);
            return newState;
        default:
            return state
    }
}

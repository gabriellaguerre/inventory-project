
const GET_REQUESTS = 'requests/GET_REQUESTS'
const CREATE_REQUEST = 'requests/CREATE_REQUESTS'



//------------------------------DISPATCH VARIABLES-----------------------------
const get_requests = (requests) => ({
    type: GET_REQUESTS,
    payload: requests
})

const create_request = (request) => ({
    type: CREATE_REQUEST,
    payload: request
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

export const createRequest = (info) =>  async (dispatch) => {

    const response = await fetch(`/api/requests`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    console.log(response, 'UUUUUUUUUUUUUUUUUUUU')
    if (response.ok) {
        const data = await response.json()
        dispatch(create_request(data))
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
        case CREATE_REQUEST:
            newState[action.payload] = action.payload;
            return newState;
        default:
            return state
    }
}

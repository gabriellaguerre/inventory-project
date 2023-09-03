
const GET_REQUESTS = 'requests/GET_REQUESTS'
const CREATE_REQUEST = 'requests/CREATE_REQUESTS'
const GET_ONE_REQUEST = 'requests/GET_ONE_REQUEST'
const EDIT_REQUEST = 'requests/EDIT_REQUEST'


//------------------------------DISPATCH VARIABLES-----------------------------
const get_requests = (requests) => ({
    type: GET_REQUESTS,
    payload: requests
})

const get_one_request = (request) => ({
    type: GET_ONE_REQUEST,
    payload: request
})

const create_request = (request) => ({
    type: CREATE_REQUEST,
    payload: request
})

const edit_request = (request) => ({
    type: EDIT_REQUEST,
    payload: request
})
//-------------------------------THUNKS-----------------------------------------
export const getRequests = () => async(dispatch) => {
    const response = await fetch('/api/requests/', {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_requests(data))
    }
}

export const getOneRequest = (requestId) => async(dispatch) => {
    const response = await fetch(`/api/requests/${requestId}`, {
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(get_one_request(data))
    }
}

export const createRequest = () =>  async (dispatch) => {
    const response = await fetch(`/api/requests`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(create_request(data))
    }
}

export const editRequest = (requestId) => async(dispatch) => {
    const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(edit_request(data))
    }
}

//------------------------------REDUCER FXN------------------------------------
const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = {...state}
    switch(action.type) {
        case GET_REQUESTS:
            // console.log(action.payload, 'GET REQUESTS IN REDUCER OOOOOOOOOOOO')
            action.payload.requests.forEach(request => newState[request.id] = request);
            return newState;
        case GET_ONE_REQUEST:
            newState[action.payload] = action.payload;
            return newState;
        case CREATE_REQUEST:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_REQUEST:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state
    }
}

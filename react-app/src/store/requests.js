
const GET_REQUESTS = 'requests/GET_REQUESTS'
const CREATE_REQUEST = 'requests/CREATE_REQUESTS'
const GET_ONE_REQUEST = 'requests/GET_ONE_REQUEST'
const EDIT_REQUEST = 'requests/EDIT_REQUEST'
const RESET_STATE = 'requests/RESET_STATE'
const GET_REQUESTS_BY_PAGE = 'requests/GET_REQUESTS_BY_PAGE'


//------------------------------DISPATCH VARIABLES-----------------------------
const resettingState = () => ({
    type: RESET_STATE
})

const get_requests_by_page = (requests) => ({
    type: GET_REQUESTS_BY_PAGE,
    payload: requests
})

const get_requests = (requests) => ({
    type: GET_REQUESTS,
    payload: requests
})

const get_one_request = (request) => ({
    type: GET_ONE_REQUEST,
    payload: request
})

// const create_request = (request) => ({
//     type: CREATE_REQUEST,
//     payload: request
// })

const edit_request = (request) => ({
    type: EDIT_REQUEST,
    payload: request
})
//-------------------------------THUNKS-----------------------------------------
export const resetState = () => async (dispatch) => {
    const response = true
    if (response) {
        dispatch(resettingState())
  }
}

export const getRequestsByPage = (page) => async(dispatch) => {
    const response = await fetch(`/api/requests/${page}`, {
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(get_requests_by_page(data))
    }
}

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

export const createRequest = (formData) =>  async (dispatch) => {
    const response = await fetch(`/api/requests`, {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: formData
    })

    if (response.ok) {
        // const data = await response.json()
        // dispatch(create_request(data))
        return true
    } else {
        return false
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
            action.payload.requests.forEach(request => newState[request.id] = request);
            return newState;
        case GET_REQUESTS_BY_PAGE:
            action.payload.requests.forEach(request => newState[request.id] = request);
            newState['total_pages'] = action.payload.total_pages
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
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}
